import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { useEffect, useState } from "react"


export const LoadAgendaDropdown = () => {
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

	useEffect(()=>{
		loadAgendas()
	},[])

    return (
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
    )
}