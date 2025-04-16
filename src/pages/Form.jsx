import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Form = () => {
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const {theId} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(theId)
            editContact()
        else
            addContact()
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
    
    const addContact = async () => {
        try {
            const resp = await fetch(store.API_AGENDAS + "/" + store.currentAgenda.slug + "/contacts",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "address": address
                  })
            })
            if(!resp.ok) throw new Error("Error creating contact " + resp)
            const data = await resp.json()
            loadAgendas()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const editContact = async () => {
        try {
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + store.currentAgenda.slug + "/contacts/" + theId,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "address": address
                  })
            })
            if(!resp.ok) throw new Error("Error creating contact " + resp)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(theId){
            const item = store.contacts.find(el => el.id == theId)
            setName(item.name)
            setEmail(item.email)
            setPhone(item.phone)
            setAddress(item.address)
        }
    },[])

    return (
        <div className="container px-5 mt-3">
            <h3 className="text-center">{theId ?"Edit contact":"Add a new contact"}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                    <input type="text" className="form-control form-text " value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control form-text " value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                    <input type="text" className="form-control form-text " value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter phone" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                    <input type="text" className="form-control form-text " value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter address" required/>
                </div>
                <input type="submit" value="Save" className="btn btn-primary w-100"/>
            </form>
            <Link to="/" className="ms-auto">or get back to contacts</Link>
        </div>
    )
}