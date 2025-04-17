import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import contactServices from "../services/contactServices";

export const Form = () => {
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate();
    const {contactId} = useParams()

    const [formData, setFormdata] = useState({
        "name": "",
        "phone": "",
        "email": "",
        "address": ""
      })

    const handleChange = (e) => {
        setFormdata({
            ...formData, [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if(contactId)
            editContact()
        else
            addContact()
    }
    
    const addContact = async () => {
        const data = await contactServices.addContact(store.currentAgenda.slug, formData)
		dispatch({type: "LOAD_CONTACTS", payload: data.contacts})
        navigate("/")
    }

    const editContact = async () => {
        const data = await contactServices.editContact(store.currentAgenda.slug, contactId, formData)
		dispatch({type: "LOAD_CONTACTS", payload: data.contacts})
        navigate("/")
    }

    useEffect(()=>{
        if(contactId){
            const item = store.contacts.find(el => el.id == contactId)
            setFormdata({
                name: item.name,
                email: item.email,
                phone: item.phone,
                address: item.address
            })
        }
    },[])

    return (
        <div className="container px-5 mt-3">
            <h3 className="text-center">{contactId ?"Edit contact":"Add a new contact"}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                    <input type="text" className="form-control form-text " name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control form-text " name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                    <input type="text" className="form-control form-text " name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                    <input type="text" className="form-control form-text " name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required/>
                </div>
                <input type="submit" value="Save" className="btn btn-primary w-100"/>
            </form>
            <Link to="/" className="ms-auto">or get back to contacts</Link>
        </div>
    )
}