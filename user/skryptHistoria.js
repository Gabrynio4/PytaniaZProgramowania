const ipAdress = "192.168.0.148"; // 192.168.0.148 - home, 172.16.15.186 - school

async function history() {
  let response;
  try {
    response = await fetch(`http://${ipAdress}:5678/webhook/historia`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "cNldNCvkHaUU6LW6cMTcbYIR-JeY9sBhi5eld--V",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Otrzymane dane:", data);
    displayHistory(data);
  } catch (error) {
    console.error("Error fetching history:", error);
  }
}

function displayHistory(data) {
  const tableBody = document.querySelector("#historyTable tbody");
  tableBody.innerHTML = "";

  data.forEach((entry) => {
    const row = document.createElement("tr");

    const cells = [
      entry.id_wpisu,
      entry.dziedzina_programowania,
      entry.pytanie,
      entry.odpowiedz_uzytkownika,
      entry.poprawna_odpowiedz,
    ];

    cells.forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

history();
