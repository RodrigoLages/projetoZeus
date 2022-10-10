const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailer = require("../utils/mailer");
const middleware = require("../middlewares/auth")
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
        res.status(500).json({msg: "Erro ao cadstrar"});
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
    if (!user) return res.status(404).json({ msg: "Usuário não existe"});

    //check if password matches
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(422).json({msg: "Senha incorreta"});

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign({
        id: user._id,
        }, secret, {
            expiresIn:'8h'
        });

        res.status(200).json({ msg: "Login efetuado com sucesso", token});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Erro no login"});
    }
});

// Recover password
router.post("/forgot_password", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(422).json({ msg: "Envie um email válido" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "Email não cadastrado" });

        const secret = process.env.SECRET;

        const token = jwt.sign({
            id: user._id,
            }, secret, {
                expiresIn:'1h'
            });

        await mailer.transport.sendMail({
            from: mailer.address,
            to: user.email,
            subject: 'Zeus - recuperação de senha',
            html: `<a href="http://localhost:3000/update_password/${token}">Clique aqui para mudar sua senha</a>`
        })

        res.status(200).json({ msg: "Email enviado"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro no ao enviar email" });
    }
})

router.patch("/update_password", middleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const _id = jwt.decode(token).id;

    const {password, confirmPassword} = req.body;
    if (!password) return res.status(422).json({ msg: "Senha não enviada" });
    if (password !== confirmPassword) return res.status(422).json({ msg: "As senhas não conferem" });
    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.findOne({ _id });
        if (!user) return res.status(422).json({ msg: "Usuário não encontrado" });
        
        await User.updateOne({ _id }, { password: passwordHash });
    
        res.status(200).json({ msg: "Senha alterada" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Erro ao atualizar senha" });
    }
})

module.exports = router;