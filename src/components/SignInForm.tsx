import {Button, Form, Spinner} from "react-bootstrap";
import {AuthApiService} from "../services/AuthApiService.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const authApiService = new AuthApiService();

export function SignInForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await authApiService
            .signIn({username: username, password: password})
            .then((response) => {
                alert("Sign-in successful!");
                localStorage.setItem("user", JSON.stringify(response));
                navigate("/buses");
            })
            .catch((error) => {
                console.error("Error during sign-in:", error);
                alert("Error during sign-in. Please check your credentials and try again.");
            }).finally(()=>setLoading(false));
    };

    return (
        <div className="sign-in-container">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {loading? (<Spinner animation="border"></Spinner>) :"Ingresar"  }
                </Button>
            </Form>
        </div>
    )
}