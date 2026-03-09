const { signup ,login ,forgotPassword,resetPassword} = require('../Controllers/AuthController');
const { signupValidation,loginValidation ,emailValidation,resetValidation} = require('../Middlewares/AuthValidation');

const { ensureAuthenticated } = require('../Middlewares/Auth');
const router=require('express').Router();

router.post('/signup',signupValidation,signup)
router.post('/login',loginValidation,login)
router.post('/forgot-password',emailValidation,forgotPassword);
router.post('/reset-password/:token',resetValidation,resetPassword);



module.exports=router;