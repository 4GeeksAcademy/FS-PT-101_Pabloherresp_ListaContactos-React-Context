import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect,useState } from "react";

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer()

	const [agenda,setAgenda] = useState("")

	const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await fetch(store.API_AGENDAS + "/" + agenda,{method: "POST"})
            if(!resp.ok) throw new Error("Error creating agenda " + resp.status)
            const data = await resp.json()
            loadAgendas()
            selectAgenda(data.id,data.slug)
            setAgenda("")
        } catch (error) {
            console.log(error)   
        }
    }

    const loadAgendas = async () => {
		try {
			const resp = await fetch(store.API_AGENDAS + "?offset=0&limit=100")
			const data = await resp.json()
			dispatch({type: "LOAD_AGENDAS", payload: data.agendas})
		} catch (error) {
			console.log(error)
		}
	}

    const selectAgenda = async (id,slug) => {
        try {
            const resp = await fetch(store.API_AGENDAS + "/" + slug + "/contacts")
            if(!resp.ok) throw new Error("Error loading agenda " + resp)
            const data = await resp.json()
            dispatch({type: "SELECT_AGENDA", payload: {id: id, slug: slug, contacts: data.contacts}})
            navigate("/")
            
        } catch (error) {
            console.log(error)
        }
    }

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

	useEffect(()=>{
		loadAgendas()
	},[])

	return (
		<nav className="navbar navbar-light bg-dark-subtle">
			<div className="container my-3 d-flex justify-content-start">
				<Link to="/" className="me-auto">
					<span className="navbar-brand mb-0 h1">Contactos</span>
				</Link>
				<div className="dropdown">
					<button className="btn btn-primary my-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						{(store.currentAgenda.id ? store.currentAgenda.slug : "Load agenda")}
					</button>
					<ul className="dropdown-menu">
						<li className="dropdown-item">
						<form onSubmit={handleSubmit}>
							<label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Create agenda</label>
							<input type="text" className="form-control form-text form-control-sm" value={agenda} placeholder="Enter name" onChange={(e)=>setAgenda(e.target.value)} required/>
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