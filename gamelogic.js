let vragen = ["je", "il"];
let antwoorden = ["ik", "hij"];
// worden gebruikt om de vragen en antwoorden te resten en multikeuze
let antwoord_oud = [...antwoorden];
let vragen_oud = [...vragen];
// het nummer van de huidige vraag in vragen en antwoorden
let vraag = 0;
// fase word gebruikt voor het doorgaan als je op enter drukt
let fase = 0;



function nieuwe_vraag() {
    // pak een nieuwen vraag om te gebruiken
    try {
        document.getElementById("antwoord_vak").focus();
    } catch (error) {
        console.log("not found");
    }
    fase = 0;
    if (vragen.length == 0) {
        antwoorden = [...antwoord_oud];
        vragen = [...vragen_oud];
        console.log(vragen);
        goTo("home -dp");
    }
    vraag = Math.floor(Math.random() * vragen.length);
    return vraag;
}

function AntwoordGoed() {
    var audio = new Audio('https://www.myinstants.com/media/sounds/pub-quiz-2023.mp3');
    audio.play();
    vragen.splice(vraag, 1);
    antwoorden.splice(vraag, 1);
}

async function anwoord(input2) {
    fase = 1;
    let icon_element = document.getElementById('icon_knop');
    let antwoord_van_gebruiker = document.getElementById('antwoord_vak').value.replace(/[^0-9a-z]/gi, '').toLowerCase();
    let antwoord_met_filter = antwoorden[vraag].replace(/[^0-9a-z]/gi, '').toLowerCase();
    icon_element.setAttribute("onClick", "javascript: goTo('-dp game');");
    if (antwoord_van_gebruiker === antwoord_met_filter) {
        input2.innerHTML = 'hoera je hebt het goed! &#x1F389;';

        AntwoordGoed();
        return;
    }
    input2.innerHTML = 'het antwoord was ' + antwoorden[vraag];
    icon_element.innerHTML = "ok";
}
async function anwoord_ig(input2) {
    fase = 1;
    let icon_element = document.getElementById('icon_knop');
    icon_element.setAttribute("onClick", "javascript: AntwoordGoed(); goTo('-dp game_ig');");
    input2.innerHTML = 'het antwoord was ' + antwoorden[vraag] + ' had je het goed?';
    icon_element.innerHTML = "Ja!";
    let icon_elemen2 = document.getElementById("icon_knop2");
    icon_elemen2.style.display = 'inline';
}
async function anwoord_multi(input2) {

    let icon_element2 = document.getElementById('icon_knop_vraag_2');
    let icon_element3 = document.getElementById('icon_knop_vraag_3');
    let icon_element4 = document.getElementById('icon_knop_vraag_4');
    // remove the buttons
    icon_element2.remove();
    icon_element3.remove();
    icon_element4.remove();
    fase = 1;
    let text_vak = document.getElementById('vraag');
    let icon_element = document.getElementById('icon_knop_vraag_1');
    icon_element.setAttribute("onClick", "javascript: goTo('-dp game_multi');");
    if (input2) {
        icon_element.innerHTML = "hoera!";
        text_vak.innerHTML = 'hoera je hebt het goed! &#x1F389;';
        AntwoordGoed();
        return;
    }
    text_vak.innerHTML = 'het antwoord was ' + antwoorden[vraag];

    icon_element.innerHTML = "ok";

}

function enterpressalert(e, textarea) {
    // deze functie word geroepen wanneer je op een toets drukt
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
        if (fase == 0) {
            anwoord(document.getElementById('vraag'));
            return;
        }
        if (fase == 1) { goTo('-dp game'); return; }
    }
}