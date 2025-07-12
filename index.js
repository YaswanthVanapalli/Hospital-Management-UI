// Section Toggle Function
function showSection(id) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach((section) => {
      section.classList.add("hidden");
      section.classList.remove("visible");
    });
    document.getElementById(id).classList.remove("hidden");
    document.getElementById(id).classList.add("visible");
  }
  
  const users = [];

function showLogin() {
  document.getElementById("formTitle").textContent = "Login";
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
}

function showRegister() {
  document.getElementById("formTitle").textContent = "Register";
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
}

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const loginStatus = document.getElementById("loginStatus");

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    loginStatus.textContent = "✅ Login successful!";
    loginStatus.style.color = "green";
  } else {
    loginStatus.textContent = "❌ Invalid credentials!";
    loginStatus.style.color = "red";
  }
});

// Handle Register
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirm = document.getElementById("confirmPassword").value;
  const registerStatus = document.getElementById("registerStatus");

  if (password !== confirm) {
    registerStatus.textContent = "❌ Passwords do not match!";
    registerStatus.style.color = "red";
    return;
  }

  if (users.some(u => u.username === username)) {
    registerStatus.textContent = "❌ Username already exists!";
    registerStatus.style.color = "red";
    return;
  }

  users.push({ username, password });
  registerStatus.textContent = "✅ Registered successfully!";
  registerStatus.style.color = "green";
  document.getElementById("registerForm").reset();
});



  // Wait for DOM to load
  document.addEventListener("DOMContentLoaded", () => {
    // Admin stats
    let totalConsultations = 0;
    let totalRevenue = 0;
    let doctorCount = 0;
  
    // Get forms
    const doctorForm = document.getElementById("doctorForm");
    const patientForm = document.getElementById("patientForm");
  
    // Doctor Registration Handler
    if (doctorForm) {
      doctorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        doctorCount++;
        updateDashboard();
        alert("Doctor registered successfully!");
        doctorForm.reset();
      });
    }


    // Patient Booking Handler
    if (patientForm) {
      patientForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Extract fee from the last input field
        const feeInput = patientForm.querySelectorAll('input[type="number"]');
        const fee = feeInput[feeInput.length - 1].value || 0;
  
        totalConsultations++;
        totalRevenue += parseFloat(fee);
        updateDashboard();
        alert("Appointment booked successfully!");
        patientForm.reset();
      });
    }
  
    // Update Dashboard Text
    function updateDashboard() {
      document.getElementById("totalConsultations").innerText = totalConsultations;
      document.getElementById("totalRevenue").innerText = totalRevenue.toFixed(2);
      document.getElementById("doctorCount").innerText = doctorCount;
    }
  });
  