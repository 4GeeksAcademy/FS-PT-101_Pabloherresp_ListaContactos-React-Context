import useGlobalReducer from "../hooks/useGlobalReducer";

const initAgenda = async () => {
    const {store, dispatch} = useGlobalReducer()
    try {
        const resp = await fetch(store.API_AGENDAS + "/" + store.currentAgenda.slug + "/contacts")
        if(!resp.ok) throw new Error("Error cargando agenda " + resp)
        const data = await resp.json()
        console.log(data)
        dispatch({type: "SELECT_AGENDA", payload: {id: store.currentAgenda.id, slug: store.currentAgenda.slug, contacts: data.contacts}})
    } catch (error) {
        console.log(error)
    }
}

const loadAgendas = async () => {
    console.log("UWU")
    const {store, dispatch} = useGlobalReducer()
    try {
        const resp = await fetch(store.API_AGENDAS + "?offset=0&limit=100")
        const data = await resp.json()
        dispatch({type: "LOAD_AGENDAS", payload: data.agendas})
    } catch (error) {
        console.log(error)
    }
}

const selectAgenda = async (id,slug) => {
    const {store, dispatch} = useGlobalReducer()
    
    const resp = await fetch(store.API_AGENDAS + "/" + slug + "/contacts")
    const data = await resp.json()
    dispatch({type: "SELECT_AGENDA", payload: {id: id, slug: slug, contacts: data.contacts}})
    navigate("/")
}