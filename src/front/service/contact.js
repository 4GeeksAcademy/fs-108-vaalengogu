export const getContact = async () => {
  try {
    const user = "valentina";
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/${user}`
    );
    if (response.status === 404) {
      //crear agenda
    }
    const data = await response.json();
    console.log(data);

    return data.contacts;
  } catch {
    console.log("error");
  }
};


export const addContact = async (dataToSend) => {
  try {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/valentina/contacts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear contacto");
    }

    return;
  } catch (error) {
    console.error("Error al crear contacto:", error);
  }
};

export const deleteContact = async (id) => {
    try {
        
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/valentina/contacts/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al eliminar contacto");
        }
        return true;
    } catch (error) {
        console.error("Error eliminando contacto:", error);
        return false;
    }
};




export const editContact = async (id, updatedData) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/valentina/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error("Error al editar el contacto");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error en editContact:", error);
    return null;
  }
};
