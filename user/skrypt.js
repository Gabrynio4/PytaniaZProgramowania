document.getElementById("start").addEventListener("click", () => {
  fetchQuestion();
});

const ipAdress = "192.168.0.148"; // 192.168.0.148 - home, 172.16.15.186 - school
const indicator = document.getElementById("indicator");
const pytanie = document.getElementById("pytanie");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");
const answerD = document.getElementById("answerD");
const przyciski = { A: answerA, B: answerB, C: answerC, D: answerD };

async function fetchQuestion() {
  const temat = document.getElementById("kat").value;
  try {
    indicator.style.visibility = "visible";
    const response = await fetch(
      `http://${ipAdress}:5678/webhook/wygeneruj-pytanie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "cNldNCvkHaUU6LW6cMTcbYIR-JeY9sBhi5eld--V",
        },
        body: JSON.stringify({ chatInput: temat }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    odpowiedzWybrana = false;
    resetKolory();
    indicator.style.visibility = "hidden";
    const q = data.output;

    pytanie.textContent = q.pytanie;
    answerA.textContent = "A: " + q.A;
    answerB.textContent = "B: " + q.B;
    answerC.textContent = "C: " + q.C;
    answerD.textContent = "D: " + q.D;

    window.poprawnaOdpowiedz = q.poprawna;
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
    pytanie.textContent = "Błąd podczas pobierania pytania!";
  }
}

function sprawdzOdpowiedz(wybrana) {
  if (odpowiedzWybrana) return;
  odpowiedzWybrana = true;

  if (wybrana === poprawnaOdpowiedz) {
    przyciski[wybrana].style.backgroundColor = "lightgreen";
  } else {
    przyciski[wybrana].style.backgroundColor = "salmon";
    przyciski[poprawnaOdpowiedz].style.backgroundColor = "lightgreen";
  }

  sendResponse(wybrana, poprawnaOdpowiedz);
  fetchQuestion();
}

async function sendResponse(wybrana, poprawnaOdpowiedz) {
  const temat = document.getElementById("kat").value;
  try {
    await fetch(`http://${ipAdress}:5678/webhook/zapis-do-historii`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "cNldNCvkHaUU6LW6cMTcbYIR-JeY9sBhi5eld--V",
      },
      body: JSON.stringify({
        dziedzina: temat,
        pytanie: pytanie.textContent,
        "odpowiedz-uzytkownika": przyciski[wybrana].textContent,
        "odpowiedz-poprawna": przyciski[poprawnaOdpowiedz].textContent,
      }),
    });
  } catch (error) {
    console.error("Error sending response:", error);
  }
}

function resetKolory() {
  [answerA, answerB, answerC, answerD].forEach((btn) => {
    btn.style.backgroundColor = "";
  });
}

answerA.addEventListener("click", () => sprawdzOdpowiedz("A"));
answerB.addEventListener("click", () => sprawdzOdpowiedz("B"));
answerC.addEventListener("click", () => sprawdzOdpowiedz("C"));
answerD.addEventListener("click", () => sprawdzOdpowiedz("D"));
