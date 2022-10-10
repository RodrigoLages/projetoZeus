import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const API = "http://localhost:4000";

function UpdatePass() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = useParams().token;
    const navigate = useNavigate();
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const newPass = { password, confirmPassword }

        const res = await fetch(API + "/auth/update_password", {
            method: "PATCH",
            body: JSON.stringify(newPass),
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          })
            .then((res) => res.json().then(data => ({status: res.status, msg: data.msg})))
            .catch((err) => console.log(err));

        setPassword('');
        setConfirmPassword('');
        window.alert(res.msg);
        if (res.status !== 200) return

        navigate("/login");
    }

    return (
        <div className="auth-container">
            <div className="form-auth">
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label htmlFor="pass">Digite a nova senha</label>
                        <input
                        type="password"
                        name="pass"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirmPass">Confirme a senha</label>
                        <input
                        type="password"
                        name="confirmPass"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        />
                    </div>
                    <input type="submit" value="Atualizar" />
                </form>
            </div>
        </div>
    );
}

export default UpdatePass;