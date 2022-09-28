const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Register User
router.post('/register', async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;

    if (!name) return res.status(422).json({msg: "O nome é obrigatório"});

    if (!email) return res.status(422).json({msg: "O email é obrigatório"});

    if (!password) return res.status(422).json({msg: "A senha é obrigatória"});

    if (password !== confirmPassword) return res.status(422).json({msg: "As senhas não conferem"});

    //check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) return res.status(422).json({ msg: "E-mail já cadastrado"});

    //Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //Create user
    const user = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await user.save();

        res.status(201).json({msg: "Usuário cadastrado no sistema"})
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: "Erro no servidor"});
    }
});

// User login
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    // validations
    if (!email) return res.status(422).json({msg: "O email é obrigatório"});

    if (!password) return res.status(422).json({msg: "A senha é obrigatória"});

    //check if user exists
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "E-mail e/ou senha incorretos"});

    //check if password matches
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(422).json({msg: "E-mail e/ou senha incorretos"});

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign({
        id: user._id,
        }, secret);

        res.status(200).json({ msg: "Login efetuado com sucesso", token});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Erro no servidor"});
    }
});

module.exports = router