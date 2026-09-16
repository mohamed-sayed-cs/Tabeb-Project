const doctors = [
    {
        id: 1,
        name: "Ahmed Mohamed",
        specialty: "Cardiology",
        image: "../Images/doctor1.jpg"
    },

    {
        id: 2,
        name: "Tarek Saeed",
        specialty: "Dentistry",
        image: "../Images/Doctor5.jpg"
    },

    {
        id: 3,
        name: "Omar Farouk",
        specialty: "Dermatology",
        image: "../Images/About.jpg"
    },

    {
        id: 4,
        name: "Mohamed Ali",
        specialty: "Neurology",
        image: "../Images/Doctor2.jpg"
    },

    {
        id: 5,
        name: "KarimHassan",
        specialty: "Pediatrics",
        image: "../Images/Doctor4.jpg"
    },

    {
        id: 6,
        name: "Ibrahim Khalad",
        specialty: "Neurology",
        image: "../Images/Doctor3.jpg"
    },
];

const searchInput = document.getElementById("doctorSearch");
const searchResults = document.getElementById("searchResults");
const noResults = document.getElementById("noResults");

function displayDoctors(doctorsList) {

    searchResults.innerHTML = "";

    doctorsList.forEach((doctor,i)=> {

        searchResults.innerHTML += 
            `<div class="col-12 col-md-6 col-lg-4">
                <div class="doctor-card" onclick="openDoctorProfile(${doctor.id})">

                    <div class="d-flex align-items-center gap-3">

                        <img src="${doctor.image}" alt="${doctor.name}">

                        <div>
                            <h5 class="doctor-name mb-1">
                                ${doctor.name}
                            </h5>

                            <p class="doctor-specialty mb-0">
                                ${doctor.specialty}
                            </p>
                        </div>

                    </div>

                </div>
            </div>`
        ;
    });

    if (doctorsList.length === 0) {
        noResults.classList.remove("d-none");
    } else {
        noResults.classList.add("d-none");
    }
}

searchInput.addEventListener("input", ()=> {

    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredDoctors = doctors.filter((doctor)=> {

        return doctor.name.toLowerCase().includes(searchValue);

    });

    displayDoctors(filteredDoctors);
});

function openDoctorProfile(doctorId) {
    if (doctorId==1)
        window.location.href="../Pages/ProfileDoctors/DoctorAhmedMohamed.html";
    else if (doctorId==2)
        window.location.href="../Pages/ProfileDoctors/DoctorTarekSaeed.html";
    else if (doctorId==3)
        window.location.href="../Pages/ProfileDoctors/DoctorOmarFarouk.html";
    else if (doctorId==4)
        window.location.href="../Pages/ProfileDoctors/DoctorMohamedAli.html";
    else if (doctorId==5)
        window.location.href="../Pages/ProfileDoctors/DoctorKarimHassan.html";
    else
        window.location.href="../Pages/ProfileDoctors/DoctorIbrahimKhalad.html";
}

displayDoctors(doctors);