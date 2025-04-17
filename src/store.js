export const initialStore=()=>{
  return{
    API_AGENDAS: "https://playground.4geeks.com/contact/agendas",
    agendas: [
    ],
    currentAgenda: {
      id: null,
      slug: ""
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
      }
    case "SELECT_AGENDA":
      return {
        ...store, currentAgenda: action.payload
      }
    case "LOAD_CONTACTS":
      return {
        ...store, contacts: action.payload
      }
    case "RESET_AGENDA":
      return {
        ...store, currentAgenda: {id: null, slug: ""}
      }
    default:
      throw Error('Unknown action.');
  }    
}
