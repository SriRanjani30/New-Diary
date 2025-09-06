
function signup() {
  const username = (document.getElementById("signup-username") as HTMLInputElement)?.value;
  const password = (document.getElementById("signup-password") as HTMLInputElement)?.value;
  if (!username || !password) return alert("Please fill all fields");

  localStorage.setItem("diaryUser", JSON.stringify({ username, password }));
  alert("Signup successful! Please login.");
}

function login() {
  const username = (document.getElementById("login-username") as HTMLInputElement)?.value;
  const password = (document.getElementById("login-password") as HTMLInputElement)?.value;
  const saved = JSON.parse(localStorage.getItem("diaryUser") || "{}");

  if (saved.username === username && saved.password === password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";
  } else {
    (document.getElementById("login-msg") as HTMLElement).innerText = "Invalid login!";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}


function showPage(page: string) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + page)?.classList.add("active");
}

function saveEntry() {
  const text = (document.getElementById("diary-text") as HTMLTextAreaElement).value;
  if (!text) return;
  const today = new Date().toDateString();
  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  entries.push({ date: today, text });
  localStorage.setItem("entries", JSON.stringify(entries));
  loadEntries();
  (document.getElementById("diary-text") as HTMLTextAreaElement).value = "";
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("entries") || "[]");
  const container = document.getElementById("entries");
  if (!container) return;
  container.innerHTML = "";
  entries.forEach((e: { date: string; text: string }) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<b>${e.date}</b><p>${e.text}</p>`;
    container.appendChild(div);
  });
}
if (document.getElementById("today-date")) {
  (document.getElementById("today-date") as HTMLElement).innerText = new Date().toDateString();
  loadEntries();
}

function addEvent() {
  const date = (document.getElementById("event-date") as HTMLInputElement)?.value;
  const text = (document.getElementById("event-text") as HTMLInputElement)?.value;
  if (!date || !text) return;
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  events.push({ date, text });
  localStorage.setItem("events", JSON.stringify(events));
  loadEvents();
  (document.getElementById("event-text") as HTMLInputElement).value = "";
}

function loadEvents() {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const container = document.getElementById("events");
  if (!container) return;
  container.innerHTML = "";
  events.forEach((e: { date: string; text: string }, i: number) => {
    const div = document.createElement("div");
    div.className = "event";
    div.innerHTML = `<b>${e.date}</b><p>${e.text}</p>
      <button onclick="deleteEvent(${i})">Delete</button>`;
    container.appendChild(div);
  });
}
function deleteEvent(i: number) {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  events.splice(i, 1);
  localStorage.setItem("events", JSON.stringify(events));
  loadEvents();
}
if (document.getElementById("events")) loadEvents();


function toggleTheme() {
  document.body.classList.toggle("dark");
}

function changePassword() {
  const newPass = (document.getElementById("new-password") as HTMLInputElement)?.value;
  if (!newPass) return alert("Enter a new password");
  const user = JSON.parse(localStorage.getItem("diaryUser") || "{}");
  user.password = newPass;
  localStorage.setItem("diaryUser", JSON.stringify(user));
  alert("Password updated!");
}

function clearAllData() {
  if (confirm("Are you sure you want to clear all diary entries and events?")) {
    localStorage.removeItem("entries");
    localStorage.removeItem("events");
    loadEntries();
    loadEvents();
    alert("All data cleared.");
  }
}
function showSignup() {
  document.getElementById("login-form")!.classList.remove("active");
  document.getElementById("signup-form")!.classList.add("active");
}

function showLogin() {
  document.getElementById("signup-form")!.classList.remove("active");
  document.getElementById("login-form")!.classList.add("active");
}

(window as any).showSignup = showSignup;
(window as any).showLogin = showLogin;

function signup() {
  const username = (document.getElementById("signup-username") as HTMLInputElement)?.value;
  const password = (document.getElementById("signup-password") as HTMLInputElement)?.value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  localStorage.setItem("diaryUser", JSON.stringify({ username, password }));
  alert("Signup successful! Please login.");
  window.location.href = "index.html"; // back to login
}


function login() {
  const username = (document.getElementById("login-username") as HTMLInputElement)?.value;
  const password = (document.getElementById("login-password") as HTMLInputElement)?.value;

  const saved = JSON.parse(localStorage.getItem("diaryUser") || "{}");

  if (saved.username === username && saved.password === password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html"; // go to app
  } else {
    alert("Invalid login!");
  }
}


function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// Expose to HTML
(window as any).signup = signup;
(window as any).login = login;
(window as any).logout = logout;
