import {Pagination, Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import type {PageResponse} from "../utils/PageResponse.ts";
import {BusApiService} from "../services/BusApiService.ts";
import type {BusResponse} from "../utils/BusResponse.ts";
import type {PageRequest} from "../utils/PageRequest.ts";
import {CustomPagination} from "./CustomPagination.tsx";
import {BusModal} from "./BusModal.tsx";

const busApiService = new BusApiService();

export function BusesTable(){
    const [busesPage, setPage] = useState<PageResponse<BusResponse>>();
    const [loading, setLoading] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedBus, setSelectedBus] = useState<BusResponse | null>(null);

    const fetchBuses = async()=> {
        const pageRequest:PageRequest = {
            page: pageNumber,
            size: 10,
            sortBy: "id",
            direction: "asc"
        };
        try {
            setLoading(true);
            const page = await busApiService.getAllBuses(pageRequest);
            setPage(page);
        } catch (error) {
            console.error("Error fetching buses:", error);
        } finally {
            setLoading(false);
        }
    }

    const onPageChange = (newPage:number) => {
        setPageNumber(newPage);
    }
    const onBusSelect = (bus:BusResponse) => {
        setShowModal(true);
        setSelectedBus(bus);
    }
    const closeModal = () => {
        setShowModal(false);
        setSelectedBus(null);
    }

    useEffect(()=>{
        fetchBuses().then(r => r);
    },[pageNumber]);

    return (
        <>
        <Table striped="columns" className="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Número de bus</th>
                    <th>Placa</th>
                    <th>Marca</th>
                    <th>Características</th>
                    <th>Estado</th>
                    <th>Fecha de creación</th>
                </tr>
            </thead>
            {loading ? (
                <tbody>
                <tr>
                    <td colSpan={7} className="text-center">
                        <Spinner animation="border" />
                    </td>
                </tr>
                </tbody>
            ) : (
                <tbody>
                {busesPage?.content.map((bus) => (
                    <tr onClick={() => onBusSelect(bus)} key={bus.id}>
                        <td>{bus.id}</td>
                        <td>{bus.numeroBus}</td>
                        <td>{bus.placa}</td>
                        <td>{bus.marca}</td>
                        <td>
                            <ul>
                                {bus.caracteristicas.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </td>
                        <td>{bus.estado ? "Activo" : "Inactivo"}</td>
                        <td>{new Date(bus.fechaCreacion).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            )}
        </Table>
        <CustomPagination
            totalPages={busesPage?.totalPages}
            currentPage={pageNumber}
            onPageChange={onPageChange}
        />
            <BusModal bus={selectedBus} show={showModal} handleClose={closeModal}/>
    </>
    );
}