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
