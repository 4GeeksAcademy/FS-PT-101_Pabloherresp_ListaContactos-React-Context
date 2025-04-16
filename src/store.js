export const initialStore=()=>{
  return{
    API_AGENDAS: "https://playground.4geeks.com/contact/agendas",
    agendas: [
    ],
    currentAgenda: {
      id: null,
      name: ""
    },
    contacts: [
      {
        id: null,
        name: "",
        phone: "",
        address: "",
        email: ""
      }
    ]
  }
}


export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "LOAD_AGENDAS":
      return {
        ...store, agendas: action.payload
      };
    case "SELECT_AGENDA":
      return {
        ...store, currentAgenda: {id: action.payload.id, slug: action.payload.slug}, contacts: action.payload.contacts
      }
    default:
      throw Error('Unknown action.');
  }    
}
