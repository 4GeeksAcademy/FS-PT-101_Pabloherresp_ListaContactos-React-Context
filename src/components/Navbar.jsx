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
				<Link to="/" className="me-auto">
					<span className="navbar-brand mb-0 h1">Contactos</span>
				</Link>
				<LoadAgendaDropdown />
				{(store.currentAgenda?.id ? 
				<>
					<button type="button" className="btn btn-danger mx-3" data-bs-toggle="modal" data-bs-target="#deleteAgendaModal">Delete agenda</button> {/* modal se encuentra en home */}
					<Link to="/contact" className=""><button type="button" className="btn btn-success">Add new contact</button></Link>

				</> : "")}
			</div>
							
			{/* modal eliminar cuenta */}
			<div className="modal fade" id="deleteAgendaModal" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5">Do you wish to delete the agenda?</h1>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
							<button type="button" className="btn btn-primary" onClick={handleDelete} data-bs-toggle="modal" data-bs-target="#deleteContactModal">Yes</button>
						</div>
					</div>
				</div>
			</div>

		</nav>
	);
};