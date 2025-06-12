export const getContact = async () => {
    try {

        const user = "valentina"
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}`)
        if (response.status === 404) {

        }
        const data = await response.json()
        console.log(data)

        return data.contacts
    } catch {
        console.log("error")
    }

}