console.log("uuuu");
// ===== SIGN UP: Save patient/doctor data to localStorage =====

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values from the form (adjust IDs to match your actual form inputs)
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const password = document.getElementById("userPass").value.trim();
  const role1=document.getElementById("roleDoctor");
  const role2=document.getElementById("rolePatient");
  // Basic validation
  if (!name ||  !email ||  !password || (!role1.checked && !role2.checked)) {
    alert("Please fill all fields");
    return;
  }

  // Get existing users array from localStorage, or create a new one
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    alert("This email is already registered");
    return;
  }

  // Create new user object
  const newUser = {
    name: name,
    email: email,
    password: password,
    role: (role1.checked)? role1.value : role2.value // "patient" or "doctor"
  };

  // Add new user to array and save back to localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");

  
  // Redirect to login page after signup
  window.location.href = "../Pages/login.html";
});