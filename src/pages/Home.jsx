import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {useEffect} from "react"
import {ContactCard} from "../components/ContactCard.jsx"


export const Home = () => {
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

	const loadAgendas = async () => {
		try {
			const resp = await fetch(store.API_AGENDAS + "?offset=0&limit=100")
			const data = await resp.json()
			dispatch({type: "LOAD_AGENDAS", payload: data.agendas})
		} catch (error) {
			console.log(error)
		}
	}


	useEffect(()=>{
		if(store.agendas.length >0 )
			loadAgendas()
		if(store.currentAgenda.id){
			initAgenda()
		}
	},[])

	return (
		<div className="container">
			<div className="my-4">
				{(store.currentAgenda.id ? 
				(store.contacts?.length > 0 && store.contacts[0].id ? 
				<ul className="list-group">
					{store.contacts.map((el)=>
						<ContactCard key={el.id} id={el.id} name={el.name} address={el.address} phone={el.phone} email={el.email} />
					)}
				</ul> :	<div className="text-center">
							<h4>No se han encontrado contactos</h4>
							<p>Pruebe a cargar otra agenda o cree un contacto</p>
						</div>) : <div className="text-center">
									<h4>No se ha elegido una agenda</h4>
									<p>Use el botón superior</p>
								</div>
						)}
			</div>
		</div>
	);
}; 