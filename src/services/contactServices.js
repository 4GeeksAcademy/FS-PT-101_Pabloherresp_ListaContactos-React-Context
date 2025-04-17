const contactServices = {}

contactServices.getAgendas = async () => {
    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas")
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

contactServices.getContactsForAgenda = async (slug) => {
    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + slug + "/contacts")
        if(!resp.ok) throw new Error("Error loading agenda " + resp)
        const data = await resp.json()
        return data
        
    } catch (error) {
        console.log(error)
    }
}

contactServices.deleteContact = async (id,slug) => {
    
    console.log("Borrando id " + id)
    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + slug + "/contacts/" + id,{
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        })
        if(!resp.ok) throw new Error("Error deleting contact " + resp)
        return contactServices.getContactsForAgenda(slug)
    } catch (error) {
        console.log(error)
    }

}

contactServices.addContact = async (slug, contactData) => {
    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + slug + "/contacts",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(contactData)
        })
        if(!resp.ok) throw new Error("Error creating contact " + resp.status)
        return contactServices.getContactsForAgenda(slug)
    } catch (error) {
        console.log(error)
    }

}

contactServices.editContact = async (slug, contactId, contactData) => {
    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + slug + "/contacts/" + contactId,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(contactData)
        })
        if(!resp.ok) throw new Error("Error editing contact " + resp.status)
            return contactServices.getContactsForAgenda(slug)
    } catch (error) {
        console.log(error)
    }

}

contactServices.createAgenda = async (slug) => {
    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + slug,{method: "POST"})
        if(!resp.ok) throw new Error("Error creating agenda " + resp.status)
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)   
    }
}

contactServices.deleteAgenda = async (slug) => {
    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/" + slug,{
            method: "DELETE"
        })
        if(!resp.ok) throw new Error("Error deleting account " + resp.status)
        return contactServices.getAgendas()
    } catch (error) {
        console.log(error)
    }
}

export default contactServices