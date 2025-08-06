import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, validationEmail, verifyUser, generatePassword } from '../api';
import { useState } from 'react';
import LineSvg from "../components/LineSvg";



export function SignIn() {
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const [validationemail, setValidationemail] =useState(null);
    const [flagverifyemail,setFlagverifyemail]=useState(false);
    const [longueur, setlongueur] = useState(12); //

    const navigate = useNavigate();

    //handlers
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("userCredentials avant submit :", userCredentials);
        console.log("Email validé ? ", validationemail);


        if (validationemail !== true) {
            console.warn("Email non validé");
            return;
        }

        const token = await signup(userCredentials);

        if (token) {

            const tokenLogin = await verifyUser({
                email: userCredentials.email,
                password: userCredentials.password
            });

            if (tokenLogin) {
                localStorage.setItem("jwt-token", tokenLogin);
                navigate("/home");
            } else {
                alert("Erreur lors de la connexion automatique");
            }
        }

    }




async function handleEmailChange(e) {
    const email = e.target.value;
    setUserCredentials({ ...userCredentials, email });
    setFlagverifyemail(true);

    const isValid = await validationEmail(email);

    setValidationemail(isValid); //merde wow
    setFlagverifyemail(false);
}

async function handleGeneratePassword() {
    const motDePasse = await generatePassword(longueur);
    if (motDePasse) {
        setUserCredentials({ ...userCredentials, password: motDePasse });
    }
}



let emailMessage = null; //Cest un p mais retardee
    if (flagverifyemail) {
    emailMessage = <p className="neutre">Vérification en cours...</p>;
    }
    else if (validationemail == true) {
    emailMessage = <p className="sucess">Email valide</p>;
    }
    else if (validationemail == false) {
    emailMessage = <p className="fail">Email invalide</p>;
    }

    return(
        <>
        <LineSvg/>
        <div className="center-div">
            <form className="formmodal" onSubmit={handleSubmit}>
                <div>
                    <h2>Sign in</h2>
                    <div className="formelements">
                        <label>Email</label>
                        <input type="email" value={userCredentials.email} onChange={handleEmailChange}/>

                        {/*ON METS SCRIPT PR AFFICHE CONDITIONNELLEMENT mesage*/}
                        {emailMessage}
                        {console.log(validationemail)}

                        <label>Name</label>
                        <input type="text" value={userCredentials.name}onChange={(e) => setUserCredentials({ ...userCredentials, name: e.target.value })}/>

                        <label>Mot de passe</label>
                        <input
                            type="text"
                            placeholder="Genere password ou ecrit le"
                            value={userCredentials.password || ''}
                            onChange={(e) =>
                                setUserCredentials({ ...userCredentials, password: e.target.value })
                            }
                        />

                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                            <label>Longueur :</label>
                            <input
                                type="number"
                                min="4"
                                max="30"
                                value={longueur}
                                onChange={(e) => setlongueur(e.target.value)}
                                style={{ width: "60px" }}
                            /> <br></br>
                        </div>
                        <button type="button" onClick={handleGeneratePassword}>
                                Générer mot de passe
                            </button>
                        <button type="submit">Sign In</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}