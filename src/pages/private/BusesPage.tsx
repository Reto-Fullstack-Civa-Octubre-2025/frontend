import {BusesTable} from "../../components/BusesTable.tsx";
import {Button, Container, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function BusesPage(){
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("user");
        navigate("/auth");
    }
    return(<>
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
                <Navbar.Brand>Reto Fullstack Civa</Navbar.Brand>
                    <Button onClick={handleLogout}>Cerrar sesión</Button>
            </Container>
        </Navbar>
        <h1 className="text-center">Buses</h1>
        <BusesTable></BusesTable>
    </>);
}