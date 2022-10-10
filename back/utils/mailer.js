const nodemailer = require('nodemailer');

module.exports = {
    address: process.env.NM_USER,
    transport: nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: '32a7f5c0602527',
            pass: "3c568928c2dfaf"
        },
    })
}
