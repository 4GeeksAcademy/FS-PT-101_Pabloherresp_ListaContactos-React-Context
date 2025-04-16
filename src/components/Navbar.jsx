import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import {LoadAgendaDropdown} from "./LoadAgendaDropdown.jsx"

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer()
	const navigate = useNavigate()


	const handleDelete = async () => {
		try {
			const resp = await fetch(store.API_AGENDAS + "/" + store.currentAgenda.slug,{
				method: "DELETE"
			})
			if(!resp.ok) throw new Error("Error deleting account " + resp.status)
			navigate(0)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<nav className="navbar navbar-light bg-dark-subtle">
			<div className="container my-3 d-flex justify-content-start">
				<Link to="/" className="me-5">
					<span className="navbar-brand mb-0 h1">Lista de Contactos</span>
				</Link>
				<LoadAgendaDropdown />
				{(store.currentAgenda.id ? 
				<>
					<button type="button" className="btn btn-danger ms-4" data-bs-toggle="modal" data-bs-target="#deleteContactModal">Eliminar agenda</button> {/* modal se encuentra en home */}
					<Link to="/contact" className="ms-auto"><button type="button" className="btn btn-success">Add new contact</button></Link>

				</> : "")}
			</div>
							
			{/* modal eliminar cuenta */}
			<div className="modal fade" id="deleteContactModal" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="deleteContactModal">Aviso</h1>
						</div>
						<div className="modal-body">
							¿Desea eliminar la cuenta?
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
							<button type="button" className="btn btn-primary" onClick={handleDelete} data-bs-toggle="modal" data-bs-target="#deleteContactModal">Sí</button>
						</div>
					</div>
				</div>
			</div>

		</nav>
	);
};