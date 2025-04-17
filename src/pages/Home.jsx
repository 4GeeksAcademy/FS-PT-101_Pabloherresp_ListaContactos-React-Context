import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import contactServices from "../services/contactServices.js"
import {useEffect} from "react"
import {ContactCard} from "../components/ContactCard.jsx"
import { useParams } from "react-router-dom";


export const Home = () => {
	const {store, dispatch} = useGlobalReducer()

	const loadCurrentContacts = async () => {
		const data = await contactServices.getContactsForAgenda(store.currentAgenda.slug)
		dispatch({type: "LOAD_CONTACTS", payload: data.contacts})
	}

	useEffect(()=>{
	},[])

	return (
		<div className="container">
			<div className="my-4">
				{(store.currentAgenda?.id ? 
				(store.contacts?.length > 0 && store.contacts[0]?.id ? 
				<ul className="list-group">
					{store.contacts?.map((el)=>
						<ContactCard key={el.id} id={el.id} name={el.name} address={el.address} phone={el.phone} email={el.email} />
					)}
				</ul> :	<div className="text-center">
							<h4>Haven't found any contacts</h4>
							<p>Please load another agenda or add contacts</p>
						</div>) : <div className="text-center">
									<h4>You haven't choosen any agenda</h4>
								</div>
						)}
			</div>
		</div>
	);
}; 