const ipAdress = "192.168.0.148"; // 192.168.0.148 - home, 172.16.15.186 - school

async function history() {
  let response;
  try {
    response = await fetch(`http://${ipAdress}:5678/webhook/historia`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "cNldNCvkHaUU6LW6cMTcbYIR-JeY9sBhi5eld--V",
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Otrzymane dane:", data);

  } catch (error) {
    console.error("Error fetching history:", error);
    }
}

history();