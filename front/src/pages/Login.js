import { useState } from "react";

const API = "http://localhost:4000";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = { email, password }

        const token = await fetch(API + "/auth/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err));
    }

    return (
        <div className="login-container">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="email">Usuário</label>
                        <input
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="pass">Senha</label>
                        <input
                        type="password"
                        name="pass"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}

export default Login;