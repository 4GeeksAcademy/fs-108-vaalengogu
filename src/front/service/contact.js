export const getContact = async () => {
  try {
    const user = "valentina";
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/${user}`
    );
    if (response.status === 404) {
    }
    const data = await response.json();
    console.log(data);

    return data.contacts;
  } catch {
    console.log("error");
  }
};

export const postNewContact = async (dataToSend) => {
  try {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/valentina/contacts",
      
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(dataToSend),
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los contactos");
    }

    const contactos = await response.json();
    console.log("Contactos autorizados:", contactos);
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
  }
};

// fecht con metodo POST, enviandole la infomacion del body para crear el contacto en la API

// si todo va bien tengo que ejecutar el getContact para que me traiga de vuelta todos los contactos autoriados
