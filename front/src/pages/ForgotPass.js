import {  useState } from "react";

const API = "http://localhost:4000";

function ForgotPass() {
    const [email, setEmail] = useState('');


    const handleForgot = async (e) => {
        e.preventDefault();
        
        const user = { email }

        const res = await fetch(API + "/auth/forgot_password", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .catch((err) => console.log(err));

        setEmail('');
        return window.alert(res.msg);
    }

    return (
        <div className="auth-container">
            <div className="form-auth">
                <form onSubmit={handleForgot}>
                    <div className="form-control">
                        <label htmlFor="email">E-mail</label>
                        <input
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        />
                    </div>
                    <input type="submit" value="Enviar e-mail de recuperação" />
                </form>
            </div>
        </div>
    );
}

export default ForgotPass;