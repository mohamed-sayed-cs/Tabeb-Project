
    // start-darkMode-btn
let body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

function theme() {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}
    // end-darkMode-btn