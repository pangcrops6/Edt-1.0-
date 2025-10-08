// --- Données d'exemple extraites de ton EDT ---
const edtData = [
  { date: "Lundi 20 oct", cours: ["CM Méca", "CM Maths 3"], controle: "" },
  { date: "Mardi 21 oct", cours: ["CM Bio Cellulaire"], controle: "" },
  { date: "Mercredi 22 oct", cours: ["TD Maths", "TD Structure Matière"], controle: "" },
  { date: "Jeudi 23 oct", cours: ["TP Info", "CM Physique"], controle: "" },
  { date: "Vendredi 24 oct", cours: ["CM SI", "TP Chimie"], controle: "Contrôle SI - 28 oct" },
  { date: "Samedi 25 oct", cours: [], controle: "" },
  { date: "Dimanche 26 oct", cours: [], controle: "" },
];

// --- Répartition auto des fiches CM ---
let cmList = edtData
  .flatMap(d => d.cours.filter(c => c.startsWith("CM")))
  .map(cm => cm.replace("CM ", "Fiche "));

let fichePlan = [];
let dayIndex = 0;

cmList.forEach((fiche, i) => {
  let isWeekend = edtData[dayIndex].date.startsWith("Samedi") || edtData[dayIndex].date.startsWith("Dimanche");
  fichePlan.push({ jour: edtData[dayIndex].date, fiche: fiche });
  dayIndex++;
  if (isWeekend) {
    if (i % 2 === 1) dayIndex++;
  }
});

// --- Construction du tableau ---
const tbody = document.getElementById("tableBody");

edtData.forEach((day, index) => {
  const row = document.createElement("tr");
  const fiche = fichePlan.find(f => f.jour === day.date)?.fiche || "—";

  row.innerHTML = `
    <td>${day.date}</td>
    <td>${day.cours.join(", ") || "—"}</td>
    <td>${fiche}</td>
    <td>${day.controle || "—"}</td>
    <td></td>
  `;
  tbody.appendChild(row);
});

// --- Synthèse du jour ---
const todaySummary = document.getElementById("todaySummary");
const today = edtData[0];
todaySummary.textContent = `Aujourd'hui : ${today.cours.join(", ")} | Fiche à faire : ${
  fichePlan[0]?.fiche || "Aucune"
}`;
