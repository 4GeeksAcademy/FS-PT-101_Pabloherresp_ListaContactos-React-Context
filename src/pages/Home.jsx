import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import {ContactCard} from "../components/ContactCard.jsx"


export const Home = () => {
	const {store, dispatch} = useGlobalReducer()

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