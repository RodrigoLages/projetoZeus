import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../Context/AuthContext";

const API = "http://localhost:4000";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useContext(Context);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        
        const user = { email, password }

        const res = await fetch(API + "/auth/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .catch((err) => console.log(err));

        setPassword('');
        if (!res.token) return window.alert(res.msg);
        
        setToken(res.token)
        navigate("/");
    }

    return (
        <div className="auth-container">
            <div className="form-auth">
                <form onSubmit={handleLogin}>
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
                <div className="link">
                    <Link to={"/register"}>Cadastre-se</Link>
                    <Link to={"/forgot_password"}>Esqueceu a senha?</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;