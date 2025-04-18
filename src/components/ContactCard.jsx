import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom"
import contactServices from "../services/contactServices.js";

export const ContactCard = (props) => {
    const {store, dispatch} = useGlobalReducer()
    
	const handleDelete = async () => {
        const data = await contactServices.deleteContact(props.id,store.currentAgenda.slug)
		dispatch({type: "LOAD_CONTACTS", payload: data.contacts})
	}

    return (
        <li className="list-group-item d-flex">
            <img className="profile-pic mx-md-4 mt-2 rounded-circle" src={"https://picsum.photos/id/" + Math.floor(Math.random()*50) +"/200"} alt="Random image"/>
            <div className="ms-3 align-self-center">
                <h5 className="">{props.name}</h5>
                <p className="text-secondary"><span><i className="me-2 fa-solid fa-location-dot"></i></span> {props.address}</p>
                <p className="text-secondary"><span><i className="me-2 fa-solid fa-phone-flip"></i></span> {props.phone}</p>
                <p className="text-secondary"><span><i className="me-2 fa-solid fa-envelope"></i></span> {props.email}</p>
            </div>
            <div className="ms-auto me-2 my-3">
                <Link className="btn text-primary" to={"/contact/" + props.id}><i className="fa-solid fa-pencil"></i></Link>
                <button className="btn text-danger" data-bs-toggle="modal" data-bs-target={"#deleteContactModal" + props.id}><i className="fa-solid fa-trash"></i></button>
            </div>

            {/* modal para confirmar la eliminación del contacto */}
            <div className="modal fade" id={"deleteContactModal" + props.id} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Do you wish to delete this contact?</h1>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" onClick={handleDelete} data-bs-toggle="modal" data-bs-target={"#deleteContactModal"+props.id}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}