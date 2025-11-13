const ipAdress = "172.16.15.186"; // 192.168.0.148 - home, 172.16.15.186 - school

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

function displayHistory(data) {
  const tableBody = document.querySelector("#historyTable tbody");
  tableBody.innerHTML = "";

  data.forEach((entry) => {
    const row = document.createElement("tr");

    const lpCell = document.createElement("td");
    lpCell.textContent = entry.id_wpisu;

    const kategoriaCell = document.createElement("td");
    kategoriaCell.textContent = entry.dziedzina_programowania;

    const pytanieCell = document.createElement("td");
    pytanieCell.textContent = entry.pytanie;

    const odpowiedzCell = document.createElement("td");
    odpowiedzCell.textContent = entry.odpowiedz_uzytkownika;

    const poprawnaCell = document.createElement("td");
    poprawnaCell.textContent = entry.poprawna_odpowiedz;

    // --- porównanie odpowiedzi ---
    const userAns = entry.odpowiedz_uzytkownika?.trim().toLowerCase();
    const correctAns = entry.poprawna_odpowiedz?.trim().toLowerCase();

    if (userAns && correctAns && userAns[0] === correctAns[0]) {
      odpowiedzCell.classList.add("correct-answer");
    } else {
      odpowiedzCell.classList.add("wrong-answer");
    }

    row.appendChild(lpCell);
    row.appendChild(kategoriaCell);
    row.appendChild(pytanieCell);
    row.appendChild(odpowiedzCell);
    row.appendChild(poprawnaCell);

    tableBody.appendChild(row);
  });
}

history();
