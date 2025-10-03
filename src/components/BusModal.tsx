import {Button, Modal} from "react-bootstrap";

interface BusModalProps{
    bus:BusResponse;
    show:boolean;
    handleClose:()=>void;
}

export function BusModal(props:BusModalProps){
    if (!props.bus) return null; // o un loader/spinner

    return(
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Bus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>ID:</strong> {props.bus.id}</p>
                <p><strong>Número de bus:</strong> {props.bus.numeroBus}</p>
                <p><strong>Placa:</strong> {props.bus.placa}</p>
                <p><strong>Marca:</strong> {props.bus.marca}</p>
                <p><strong>Características:</strong></p>
                <ul>
                    {props.bus.caracteristicas.map((caracteristica, index) =>
                        (<li key={index}>{caracteristica}</li>))}
                </ul>
                <p><strong>Estado:</strong> {props.bus.estado}</p>
                <p><strong>Fecha de creación:</strong> {new Date(props.bus.fechaCreacion).toLocaleDateString()}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );

}