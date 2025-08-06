
const express= require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth= require("../middlewares/auth");
const admin =require("../middlewares/admin");


//router.get("/", auth, userController.getConnectedUser);
// ROUTE SI PAS TOKEN
//thing with email
router.get("/generate-password/:length", userController.genererMDP);
router.post("/verify-email", userController.verifyEmail);
router.post("/signup", userController.signup);

router.post("/login", userController.login);
router.post("/signin", userController.signin);
router.get("/me", auth, userController.getConnectedUser);
router.delete("/me", auth, userController.deleteConnectedUser);
//ROUTES APRES LOGIN
router.put("/:id", auth, userController.updateUser);
router.post("/",auth,admin, userController.createUser); ////
router.delete("/:id", auth, userController.deleteUser);

//ADMIN ONLY
router.get("/", auth, admin, userController.getAllUsers);



module.exports = router;