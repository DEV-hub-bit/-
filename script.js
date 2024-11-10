document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll(".input-container input");
    let messageTimeout;
    let errorTimeout;
    let autoRemoveErrorTimeout;

    inputs.forEach((input, index) => {
        input.addEventListener("click", () => {
            input.value = "";
            removeErrorClass();  
            clearTimeout(errorTimeout);  
            clearTimeout(autoRemoveErrorTimeout); 
        });

        input.addEventListener("input", () => {
            if (input.value.length > 1) {
                input.value = input.value.slice(0, 1);
            }
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
                inputs[index + 1].value = "";
            }
            if (input.value === "") {
                removeErrorClass();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && input.value === "" && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener("focus", () => {
            if (document.body.classList.contains("error")) {
                input.classList.add("error");
            }
        });

        input.addEventListener("blur", () => {
            input.classList.remove("error");
        });
    });

    inputs[inputs.length - 1].addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkPassword();
        }
    });
});

function checkPassword() {
    const digit1 = document.getElementById("digit1").value;
    const digit2 = document.getElementById("digit2").value;
    const digit3 = document.getElementById("digit3").value;
    const digit4 = document.getElementById("digit4").value;

    if (!digit1 || !digit2 || !digit3 || !digit4) {
        showMessage("Por favor, rellene todos los espacios.");
        addErrorClass();
        return;
    }

    const password = digit1 + digit2 + digit3 + digit4;
    const passwordPages = {
        "5678": "https://www.youtube.com/watch?v=pDXL_8DwyVQ&list=LL&index=23",
        "2222": "https://youtu.be/Op0ls91WDrM?si=NN2Xz_DMmZ0rCo66",
        "1868": "https://www.youtube.com/watch?v=MvUBpzI2ZjQ",
        "6666": "https://www.bible.com/es/bible-verses/146/REV.1.RVC",
        "3333": "https://www.temu.com/mx",
        "6660": "https://www.mangabreria.com/family-guy-peter-griffin",
        "4321": "https://media.discordapp.net/attachments/1300993627090325514/1302423262046720060/Bertram_falso.webp?ex=67280faf&is=6726be2f&hm=dee08067e164ebaba0cc3100dff8db20197b5231f759d5587e80c6d063a4ffa1&=&format=webp&width=1149&height=993",
        "eeee": "https://m.media-amazon.com/images/I/51KiJ+WXkrL._AC_UF894,1000_QL80_.jpg",
        "4557": "https://www.newgrounds.com/portal/view/770371",
        "1212": "https://youtu.be/eRXE8Aebp7s?si=kEqtAjDoyirh44gO",
        "00e3": "https://www.youtube.com/watch?v=rzLIUgnKY40",
        "5423": "https://youtu.be/QZ1pExKRqQE?si=wgckdABF4uSHxmuN",
        "3412": "https://www.youtube.com/watch?v=6YsNRnZRgg8",
        "2008": "https://www.youtube.com/watch?v=b4XpMTUlorc",
        "1507": "https://www.youtube.com/watch?v=Lcmq-i3kESY",
        "0001": "https://jklm.fun/",
        "9092": "https://web.whatsapp.com/",
        "1999": "https://open.spotify.com/track/3cfOd4CMv2snFaKAnMdnvK?si=0152547f9c6b49bb",
        "4000": "https://wh40k.lexicanum.com/wiki/Main_Page",
        "0108": "https://www.elsoldedurango.com.mx/republica/sociedad/oemtemporales-201694-2419643.html",
        "0211": "https://www.youtube.com/watch?v=8Pc0AEbfnBM",
        "2083": "https://symbl.cc/es/2083/",
        "7880": "https://www.remove.bg/upload",
        "1112": "https://www.elsiglodedurango.com.mx/noticia/2020/celebracion-para-camila.html",
        "0777": "https://youtu.be/FKc8TXBcRBI?si=y9qPHktHQijMWv9t",
        "1982": "https://www.youtube.com/watch?v=Yh1ZDa-rinM",
        "3e45": "https://gomeet.today/?mediasource=google&type=smart&campaignid=21868047505&adgroupid=&creative=&keyword=&matchtype=&netwtork=&device=c&devicemodel=&gclid=Cj0KCQjwm5e5BhCWARIsANwm06gO1-eMlo79Y8qSb5jxvs6gA4NU3Epon65tlVV-BP_vnX_YAqx6ng4aAt2gEALw_wcB&loc_physical_ms=1010047&placement=&extensionid=&adposition=",
        "1997": "https://www.youtube.com/watch?v=FtutLA63Cp8",
        "0010": "https://www.youtube.com/watch?v=QNYT9wVwQ8A",
        "1205": "Loteria.mp4",
        "2214": "https://www.arealme.com/gay-test/es/",
        "2111": "https://www.youtube.com/watch?v=lrbOiYrMSPk",
        "4721": "https://www.traductorbinario.com/",
        "1313": "omar.mp4",
        "4069": "https://youtu.be/G-T3qKl6y-c?si=ycgFpxRIjdwVn08v",
        "e12e": "https://es.wikipedia.org/wiki/Alejandr%C3%ADa",
        "1945": "https://youtu.be/nOJd3xoKMyI?si=oSJKFSx91ZgOANwy",
        "4205": "https://youtu.be/TAeNlpUIlRs?si=mgUX7qWQe2uxCaFU",
        "7070": "https://youtu.be/cZdiFNhu31c?si=2IhtGBy3n_iZ1cid",
        "6065": "https://www.youtube.com/watch?v=3gZC5763wYk",
        "8567": "https://youtu.be/OfXid_DUI-A?si=ZcV1kpqHGycy-uTs",
        "0333": "https://youtu.be/dQw4w9WgXcQ?si=xT46STKMBmJz-hE4",
        "1234": "https://youtu.be/F0GNS6F44wE?si=O5qnna3ffuagVtJr",
        "012e": "https://youtu.be/R6S7oY142ws?si=i-2cMguYSgWRXuZ4",
        "2217": "https://youtu.be/cyNzlsjX-3o?si=kGaQbQtmxTFZhj7e",
        "3321": "https://youtube.com/shorts/XHk2nCAMwoI?si=ScJRlX7HFpBVXjee",
        "9912": "https://youtu.be/Se1uh3PS78Y?si=1wf2SV7r7SBcEZ6X",
    };

    if (passwordPages[password]) {
        window.location.href = passwordPages[password];
    } else {
        addErrorClass();
        showMessage("Contraseña incorrecta.");
        clearInputs();

        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(removeErrorClass, 1000);  

        clearTimeout(autoRemoveErrorTimeout);
        autoRemoveErrorTimeout = setTimeout(removeErrorClass, 5000);
    }
}

let errorTimeout;

function addErrorClass() {
    document.body.classList.add("error");
    document.querySelector(".input-container").classList.add("error");


    document.querySelectorAll(".digit-input").forEach(input => {
        input.classList.add("error"); 


        input.addEventListener("focus", () => input.classList.add("error"));
    });

    clearTimeout(errorTimeout); 
    errorTimeout = setTimeout(removeErrorClass, 700);
}

function removeErrorClass() {
    document.body.classList.remove("error");
    document.querySelector(".input-container").classList.remove("error");


    document.querySelectorAll(".digit-input").forEach(input => {
        input.classList.remove("error");
    });
}

