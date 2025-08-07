
const express= require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require('jsonwebtoken'); ///IMPORTANT SINON FUCK UPS
require("dotenv").config();

//on va décrire toutes les actions quon peut faire a un user


//le truc de email zbi

exports.verifyEmail = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email requis" });
    }

    const url = `https://api.zeruh.com/v1/verify?api_key=${process.env.API_KEY}&email_address=${email}`;

    require("https").get(url, (response) => {
        let data = "";
        response.on("data", chunk => data += chunk);
        response.on("end", () => {
            try {
                res.json(JSON.parse(data));
            } catch (error) {
                res.status(500).json({ message: "Erreur" });
            }
        });
    }).on("error", (err) => {
        res.status(500).json({ message: "Erreur" });
    });
};
//////////////// tfou



///Allah ybarek

exports.genererMDP = (req, res) => {
    const longueur = Number(req.params.length);

    if (!longueur || longueur < 1) {
        return res.status(400).json({ message: "Longueur invalide" });
    }

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const taille = characters.length;
    let motDePasse = '';

    for (let i = 0; i < longueur; i++) {
        const indexAleatoire = Math.floor(Math.random() * taille);
        motDePasse += characters[indexAleatoire];
    }

    res.json({ password: motDePasse });
};



exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: "user" }); //

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
                'PHRASE_ALEATOIRE_TRES_LONGUE',
                { expiresIn: '24h' }
            );

        res.status(201).json({ success: true, token, userId: newUser._id });
    } catch (err) {
        console.error("Erreur dans signup :", err);
        res.status(500).json({ success: false, message: "Erreur servur" });
    }
};

//VERIFIER SI DEJA CONNECTÉ
exports.getConnectedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Erreur servur" });
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "incomplete" })
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ message: "incorrect" })
    } else {
        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        }
        return res.status(200).json({
            success: true,
            userId: user._id,
            token: jwt.sign(
                { userId: user._id, role: user.role },
                'PHRASE_ALEATOIRE_TRES_LONGUE',
                { expiresIn: '24h' }
            )
        });
    }
}
exports.signin = async (req,res,next)=>{
    const {name,email,password} = req.body;
    if (!name || !email || !password){
        return res.status(400).json({message: "no data"});
    }


    //verif si deja inscrit
    const registered = await User.findOne({email: email})
        if (registered){
            return res.status(409).json({message: "user already cree"});
        }
    //si T pas inscrit

    const hashedPassword = await bcrypt.hash(password,12);
    await new User({name, email, password:hashedPassword}).save();
    res.status(201).json({message: "user créé"});

}

//PUT info IN USER
/* exports.updateUser = async (req, res) => {
    const requester = req.user;
    const targetId = req.params.id;

    if (requester.role !== 'admin' && requester.userId !== targetId) {
        return res.status(403).json({ message: "Accès refusé" });
    }

    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        return res.status(400).json({ message: "Aucune information fournie" });
    }

    const modifications = {};
    if (name) modifications.name = name;
    if (email) modifications.email = email;
    if (password) modifications.password = await bcrypt.hash(password, 12);

    const user = await User.findByIdAndUpdate(targetId, modifications, { new: true }).select("-password");
    if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvE" });
    }

    res.json(user);
}; */
 //prendre lui en bas sinon erreur d envoi modif de role


exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    const allowedUpdates = ["name", "email", "password", "role"];
    const filteredUpdates = {};

    for (const field of allowedUpdates) {
        if (updates[field] !== undefined) {
            // Si c'est le champ password, on le hash
            if (field === "password") {
                try {
                    const hashedPassword = await bcrypt.hash(updates.password, 10);
                    filteredUpdates.password = hashedPassword;
                } catch (hashError) {
                    console.error("Erreur de hash du mot de passe :", hashError);
                    return res.status(500).json({ message: "Erreur de hash du mot de passe" });
                }
            } else {
                filteredUpdates[field] = updates[field];
            }
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdates, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error("Erreur de mise à jour :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
    }
};




exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!["admin", "user"].includes(role)) {
        return res.status(400).json({ message: "Role invalide" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "Utilisateur déjà la" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        });

        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec success", user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};


////////////// ADMIN ONLY //////////////
exports.deleteUser = async (req, res) => {
    try {
        const requester = req.user;
        const targetId = req.params.id;

        if (requester.role !== 'admin' && requester.userId !== targetId) {
        return res.status(403).json({ message: "Accès refusé" });
        }

        const deleted = await User.findByIdAndDelete(targetId);
        if (!deleted) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.json({ message: "Utilisateur supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};


//GET TT LES USERS
exports.getAllUsers = async(req,res)=>{
    const users= await User.find();
    res.json(users);
}

//GET UN USER
exports.getUser = async (req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    //on cherche un user par id,
    //  recupere dans la constante toutes ses infon MOINS le password
    if (!user){ //sil n'existe pas
        return res.status(404).json({message: "usernon trouvé"}); //erreur
    }
    res.json(user);

}

exports.deleteConnectedUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.user.userId);
        if (!deleted) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json({ message: "A bientot, quitté avec success" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};