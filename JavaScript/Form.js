let Name=document.getElementById("Name");
let Phone=document.getElementById("Phone");
let errorname=document.getElementById("errorname");
let errorphone=document.getElementById("errorphone");
function ValidationName(Name)
{
    let Regx=/^[A-Z][a-z]{2,10}*\s$/;
    console.log(Name.value + Regx.test(Name.value))
    return Regx.test(Name.value);
}
function ValidationPhone(Phone)
{
    let Regx=/^01[0125][0-9]{8}$/;
    return Regx.test(Phone.value);
}
function onInput()
{
    if (ValidationName(Name))
    {
        Name.classList.remove("is-invalid")
        Name.classList.add("is-valid");
        errorname.innerHTML="Valid Name";
    }
    else
    {
        Name.classList.remove("is-valid")
        Name.classList.add("is-invalid");
        errorname.innerHTML="Error Name";
    }


    if (ValidationPhone(Phone))
    {
        Phone.classList.remove("is-invalid")
        Phone.classList.add("is-valid");
        errorphone.innerHTML="Valid Phone";
    }
    else
    {
        Phone.classList.remove("is-valid")
        Phone.classList.add("is-invalid");
        errorphone.innerHTML="Error Phone";
    }
}