// let Name=document.getElementById("Name");
// let Phone=document.getElementById("Phone");
// let errorname=document.getElementById("errorname");
// let errorphone=document.getElementById("errorphone");
// function ValidationName(Name)
// {
//     let Regx=/^[A-Z][a-z]{2,10}*\s$/;
//     console.log(Name.value + Regx.test(Name.value))
//     return Regx.test(Name.value);
// }
// function ValidationPhone(Phone)
// {
//     let Regx=/^01[0125][0-9]{8}$/;
//     return Regx.test(Phone.value);
// }
// function onInput()
// {
//     if (ValidationName(Name))
//     {
//         Name.classList.remove("is-invalid")
//         Name.classList.add("is-valid");
//         errorname.innerHTML="Valid Name";
//     }
//     else
//     {
//         Name.classList.remove("is-valid")
//         Name.classList.add("is-invalid");
//         errorname.innerHTML="Error Name";
//     }


//     if (ValidationPhone(Phone))
//     {
//         Phone.classList.remove("is-invalid")
//         Phone.classList.add("is-valid");
//         errorphone.innerHTML="Valid Phone";
//     }
//     else
//     {
//         Phone.classList.remove("is-valid")
//         Phone.classList.add("is-invalid");
//         errorphone.innerHTML="Error Phone";
//     }
// }
//////////////////////////////////////
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e)=> {

    e.preventDefault();

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameRegex = /^[A-Z][a-z]+( [A-Z][a-z]+){1,3}$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    let valid = true;

    if (!nameRegex.test(name.value.trim())) {
        name.classList.add("is-invalid");
        valid = false;
    } else {
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
    }

    if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add("is-invalid");
        valid = false;
    } else {
        phone.classList.remove("is-invalid");
        phone.classList.add("is-valid");
    }

    if (!emailRegex.test(email.value.trim())) {
        email.classList.add("is-invalid");
        valid = false;
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }

    if (message.value.trim() === "") {
        message.classList.add("is-invalid");
        valid = false;
    } else {
        message.classList.remove("is-invalid");
        message.classList.add("is-valid");
    }

    if (valid) {
        alert("Your message has been sent successfully!");
        form.reset();

        name.classList.remove("is-valid");
        phone.classList.remove("is-valid");
        email.classList.remove("is-valid");
        message.classList.remove("is-valid");
    }
});