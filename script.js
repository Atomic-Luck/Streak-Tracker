const COURSES = [
  "Quantum Mechanics",
  "Classical Mechanics",
  "Electronics",
  "Mathematical Methods",
  "Statistics",
  "Lab"
];

const STORAGE_KEY = "study_last_dates";

let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

COURSES.forEach(course => {
  if (!(course in data)) {
    data[course] = null;
  }
});

function daysSince(dateStr) {
  if (!dateStr) return "∞";
  const last = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  COURSES.forEach(course => {
    const days = daysSince(data[course]);

    app.innerHTML += `
      <strong>${course}</strong><br>
      Days since study: ${days}<br>
      <button onclick="mark('${course}')">Studied today</button>
      <hr>
    `;
  });
}

function mark(course) {
  data[course] = new Date().toISOString().split("T")[0];
  save();
  render();
}

render();
