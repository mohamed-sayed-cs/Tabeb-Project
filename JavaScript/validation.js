

console.log("ملف الجافا سكريبت شغال ومربوط بنجاح! 🚀");

document.addEventListener("DOMContentLoaded", function () {
    // 1. لو دوسنا enter
    let registerForm = document.getElementById("registerForm");
    
    let userName = document.getElementById("userName");
    let userPhone = document.getElementById("userPhone");
    let userEmail = document.getElementById("userEmail");
    let userPass = document.getElementById("userPass");

    // لو الفورم مش موجود نوقف الكود عشان ميعملش إيرور
    if (!registerForm) {
        console.error("مش لاقي الفورم! اتأكد إن الـ id بتاعه registerForm");
        return;
    }

    // قواعد الفحص (Regex)
    let phoneRegex = /^[0-9]+$/; // أرقام فقط
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/; // إيميل صحيح

    
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault(); // السطر ده بيمنع إعادة تحميل الصفحة (الريفريش)
        
        console.log("بيتم فحص البيانات دلوقتي...");

        // فحص الاسم
        if (userName.value.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "خطأ في الاسم",
                text: "من فضلك أدخل الاسم بالكامل!"
            });
            return;
        }

      //فحص رقم التليفون
        if (!phoneRegex.test(userPhone.value.trim())) {
            Swal.fire({
                icon: "error",
                title: "خطأ في رقم الهاتف",
                text: "رقم الهاتف يجب أن يحتوي على أرقام فقط بدون حروف!"
            });
            return;
        }

        // فحص الإيميل
        if (!emailRegex.test(userEmail.value.trim())) {
            Swal.fire({
                icon: "error",
                title: "خطأ في البريد الإلكتروني",
                text: "من فضلك أدخل بريد إلكتروني صحيح يحتوي على '@' وينتهي بـ '.com'!"
            });
            return;
        }

        // فحص الباسورد
        if (userPass.value.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "خطأ في كلمة المرور",
                text: "من فضلك أدخل كلمة المرور!"
            });
            return;
        }

        // لو كل البيانات صح ومفيش أي إيرور
        console.log("كل البيانات صحيحة!");
        Swal.fire({
            icon: "success",
            title: "تم بنجاح!",
            text: "تم تسجيل البيانات بنجاح."
        });
    });
});