import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom"

export const ContactCard = (props) => {
    const {store, dispatch} = useGlobalReducer()

    const initAgenda = async () => {
		try {
			const resp = await fetch(store.API_AGENDAS + "/" + store.currentAgenda.slug + "/contacts")
			if(!resp.ok) throw new Error("Error cargando agenda " + resp)
			const data = await resp.json()
			dispatch({type: "SELECT_AGENDA", payload: {id: store.currentAgenda.id, slug: store.currentAgenda.slug, contacts: data.contacts}})
		} catch (error) {
			console.log(error)
		}
    }
    
	const removeContact = async (id) => {
		try {
			const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + store.currentAgenda.slug + "/contacts/" + id,{
                method: "DELETE",
                headers: {"Content-Type":"application/json"}
            })
			if(!resp.ok) throw new Error("Error deleting contact " + resp)
			initAgenda()
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <li className="list-group-item d-flex">
            <img className="profile-pic mx-md-4 mt-2 rounded-circle" src={"https://picsum.photos/id/"+ Math.floor(Math.random()*100) +"/200"} alt="Random image"/>
            <div className="ms-3 align-self-center">
                <h5 className="">{props.name}</h5>
                <p className="text-secondary"><span><i className="me-2 fa-solid fa-location-dot"></i></span> {props.address}</p>
                <p className="text-secondary"><span><i className="me-2 fa-solid fa-phone-flip"></i></span> {props.phone}</p>
                <p className="text-secondary"><span><i className="me-2 fa-solid fa-envelope"></i></span> {props.email}</p>
            </div>
            <div className="ms-auto my-3">
                <Link className="mx-3 text-dark" to={"/contact/" + props.id}><i className="fa-solid fa-pencil"></i></Link>
                <button className="btn mx-3" data-bs-toggle="modal" data-bs-target="#deleteContactModal"><i className="fa-solid fa-trash"></i></button>
            </div>

            <div className="modal fade" id="deleteContactModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Do you wish to delete this contact?</h1>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-primary" onClick={()=>removeContact(props.id)} data-bs-toggle="modal" data-bs-target="#deleteContactModal">Yes</button>
                    </div>
                    </div>
                </div>
            </div>
        </li>
    )
}