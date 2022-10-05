import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../Context/AuthContext";

const API = "http://localhost:4000";

function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setToken } = useContext(Context);
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        
        const newUser = { email, name, password, confirmPassword }

        const res = await fetch(API + "/auth/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json().then(data => ({status: res.status, msg: data.msg})))
            .catch((err) => console.log(err));

        
        setPassword('');
        setConfirmPassword('');
        if (res.status !== 201) return window.alert(res.msg);
        
        const user = { email, password }

        const login = await fetch(API + "/auth/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .catch((err) => console.log(err));

        if (!login.token) return window.alert(login.msg);
        
        setToken(login.token)
        navigate("/");
    }

    return (
        <div className="auth-container">
            <div className="form" id="form-register">
                <form onSubmit={handleRegister}>
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
                        <label htmlFor="name">Nome</label>
                        <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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
                    <div className="form-control">
                        <label htmlFor="passConfirm">Confirme sua senha</label>
                        <input
                        type='password'
                        name='passConfirm'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        />
                    </div>
                    <input type="submit" value="Cadastrar" />
                </form>
                <div className="link">
                    <Link to={"/login"}>Já possui cadastro?</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;