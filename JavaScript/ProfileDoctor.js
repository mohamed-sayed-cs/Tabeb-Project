const bookButton = document.getElementById("bookBtn");

const doctorName = document.getElementById("doctorName").textContent;
const locationDoctor = document.getElementById("location").textContent;

const appointments = document.querySelectorAll(".appointment");

let selectedTime = "";

appointments.forEach((button)=> {
    button.addEventListener("click", ()=> {

        appointments.forEach((item)=> {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedTime = button.textContent;
    });
});

bookButton.addEventListener("click", function() {

    if (selectedTime === "") {
        alert("Please select an appointment time first.");
        return;
    }

    const confirmation = confirm(
        "Are you sure you want to book an appointment at " +
        selectedTime +
        " with " +
        doctorName +
        " at " +
        locationDoctor +
        "?"
    );

    if (confirmation) {
        alert(
            "Your appointment has been booked successfully with " +
            doctorName +
            " at " +
            selectedTime +
            "."
        );
    }
});