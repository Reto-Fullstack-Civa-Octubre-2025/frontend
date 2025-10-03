import {Button, Form, Spinner} from "react-bootstrap";
import {useState} from "react";
import {AuthApiService} from "../services/AuthApiService.ts";
import {useNavigate} from "react-router-dom";

const authApiService = new AuthApiService();

export function SignUpForm(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await authApiService
            .signUp({username: username, password: password, email: email,roles: ["USER"]})
            .then((response) => {
                alert("Sign-up successful!");
                localStorage.setItem("user", JSON.stringify(response));
                navigate("/buses");
            })
            .catch((error) => {
                console.error("Error during sign-up", error);
                alert("Error during sign-up. Please check your data and try again.");
            })
            .finally(() => setLoading(false));
    };

    return(
        <div className="sign-up-container">
            <h2>Registro</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Ingresa tu email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Ingresa tu nombre de usuario" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="contraseña" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {loading? (<Spinner animation="border"></Spinner>) :"Registrarme"  }

                </Button>
            </Form>
        </div>
    )
}