"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Signup
function signup() {
    const username = document.getElementById("signup-username")?.value;
    const password = document.getElementById("signup-password")?.value;
    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }
    localStorage.setItem("diaryUser", JSON.stringify({ username, password }));
    alert("Signup successful! Please login.");
    window.location.href = "index.html"; // back to login
}
// Login
function login() {
    const username = document.getElementById("login-username")?.value;
    const password = document.getElementById("login-password")?.value;
    const saved = JSON.parse(localStorage.getItem("diaryUser") || "{}");
    if (saved.username === username && saved.password === password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html"; // go to app
    }
    else {
        alert("Invalid login!");
    }
}
// Logout
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}
// Expose to HTML
window.signup = signup;
window.login = login;
window.logout = logout;
// Navigation
function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page-" + page)?.classList.add("active");
}
// Diary
function saveEntry() {
    const text = document.getElementById("diary-text").value;
    if (!text)
        return;
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.push({ text, date: new Date().toLocaleString() });
    localStorage.setItem("entries", JSON.stringify(entries));
    document.getElementById("diary-text").value = "";
    loadEntries();
}
function loadEntries() {
    const container = document.getElementById("entries");
    container.innerHTML = "";
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.forEach((e, i) => {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `<strong>${e.date}</strong><p>${e.text}</p>
      <button onclick="deleteEntry(${i})">Delete</button>`;
        container.appendChild(div);
    });
}
function deleteEntry(i) {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.splice(i, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    loadEntries();
}
// Calendar
function addEvent() {
    const date = document.getElementById("event-date").value;
    const text = document.getElementById("event-text").value;
    if (!date || !text)
        return;
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    events.push({ date, text });
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
}
function loadEvents() {
    const container = document.getElementById("events");
    container.innerHTML = "";
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    events.forEach((e) => {
        const div = document.createElement("div");
        div.className = "event";
        div.innerHTML = `<strong>${e.date}</strong><p>${e.text}</p>`;
        container.appendChild(div);
    });
}
// Settings
function toggleTheme() {
    document.body.classList.toggle("dark");
}
function changePassword() {
    const newPass = document.getElementById("new-password").value;
    if (!newPass)
        return alert("Enter a new password!");
    const user = JSON.parse(localStorage.getItem("diaryUser") || "{}");
    user.password = newPass;
    localStorage.setItem("diaryUser", JSON.stringify(user));
    alert("Password changed!");
}
// Init
window.showPage = showPage;
window.saveEntry = saveEntry;
window.deleteEntry = deleteEntry;
window.addEvent = addEvent;
window.toggleTheme = toggleTheme;
window.changePassword = changePassword;
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("entries"))
        loadEntries();
    if (document.getElementById("events"))
        loadEvents();
    // show current date in diary
    const dateEl = document.getElementById("current-date");
    if (dateEl)
        dateEl.textContent = new Date().toDateString();
});
//# sourceMappingURL=app.js.map