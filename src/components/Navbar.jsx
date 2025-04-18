import { useEffect,useRef,useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactServices from "../services/contactServices.js";

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer()
	const [agenda,setAgenda] = useState("")
	const navigate = useNavigate()
	
	// useRef para esconder el dropdown cuando se crea una agenda
	const refDropdown = useRef(null)

	const loadAgendas = async () => {
		const data = await contactServices.getAgendas()
		dispatch({type: "LOAD_AGENDAS", payload: data.agendas})
	}

	const selectAgenda = async (id,slug) => {
		const data = await contactServices.getContactsForAgenda(slug)
		dispatch({type: "SELECT_AGENDA", payload: {id: id, slug: slug}})
		dispatch({type: "LOAD_CONTACTS", payload: data.contacts})
		navigate("/")
	}

	const handleDelete = async () => {
		const data = await contactServices.deleteAgenda(store.currentAgenda.slug)
		dispatch({type: "LOAD_AGENDAS", payload: data.agendas})
		dispatch({type: "RESET_AGENDA"})
		navigate("/")
	}

    const handleSubmit = async (e) => {
        e.preventDefault()
		const data = await contactServices.createAgenda(agenda)
		loadAgendas()
		selectAgenda(data.id,data.slug)
		setAgenda("")
		navigate("/")
		refDropdown.current.classList.remove('show');
    }

	useEffect(()=>{
		loadAgendas()
	},[])
 
	return (
		<nav className="navbar navbar-light bg-dark-subtle">
			<div className="container my-3 d-flex justify-content-end">
				<Link to="/" className="me-auto">
					<span className="navbar-brand ms-3 mb-0 h1">Contactos</span>
				</Link>
				{/* dropdown para crear o cargar una agenda */}
				<div className="dropdown ms-3">
					<button className="btn btn-primary my-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						{(store.currentAgenda.id ? store.currentAgenda.slug : "Load agenda")}
					</button>
					<ul className="dropdown-menu dropdown-menu-end" ref={refDropdown}>
						<li className="dropdown-item">
						<form onSubmit={handleSubmit}>
							<label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Create agenda</label>
							<input type="text" className="form-control form-text form-control-sm" value={agenda} placeholder="Enter name"onChange={(e)=>setAgenda(e.target.value)} required/>
							<input type="submit" value="Save" className="btn btn-primary w-100" hidden/>
						</form>
						</li>
						<li><hr className="dropdown-divider"/></li>
						<div className="dropdownAgendas">
						{store.agendas.map((el)=>
							<li key={el.id}><a className={"dropdown-item" + (el.slug==store.currentAgenda.slug ? " active": "")} onClick={()=>{
								selectAgenda(el.id,el.slug)
							}}>{el.slug}</a></li>
						)}
						</div>
					</ul>
				</div>
				{/* Ternaria para mostrar los botones de borrar agenda y añadir contacto si hay una agenda cargada */}
				{store.currentAgenda?.id ? 
				<>
					<button type="button" className="btn btn-danger ms-3" data-bs-toggle="modal" data-bs-target="#deleteAgendaModal">Delete agenda</button> {/* modal se encuentra en home */}
					<Link to="/contact" className="ms-3"><button type="button" className="btn btn-success">Add new contact</button></Link>
				</> : ""}
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
							<button type="button" className="btn btn-primary" onClick={handleDelete} data-bs-toggle="modal" data-bs-target="#deleteAgendaModal">Yes</button>
						</div>
					</div>
				</div>
			</div>

		</nav>
	);
};