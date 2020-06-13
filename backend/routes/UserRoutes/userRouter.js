const express = require("express");
const userRouter = express.Router();
const UserController = require('../../controllers/UserController/UserController');

userRouter.post("/sign-up", UserController.user_signup);
userRouter.post('/sign-in', UserController.userSignin);
userRouter.post('/sign-out', UserController.user_signout);
userRouter.post('/validate', UserController.user_validate);


module.exports = userRouter;