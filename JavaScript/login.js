const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit",  (e)=> {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const role = document.querySelector('input[name="role"]:checked').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user)=> {return((user.email == email) && (user.password == password) && (user.role == role))});

    console.log(user);
    if (!user) {
        alert("Invalid email, password, or account type.");
        return;
    }

    if (user.role === "patient") {
        window.location.href = "../index.html";
    } else if (user.role === "doctor") {
        window.location.href = `../Pages/DoctorsDashBoard/Dr.${user.name}DashBoard.html`;
    }
});