let vraag_element = document.getElementById('vraag');

nieuwe_vraag();
vraag_element.innerHTML = vragen[vraag];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.getElementById("icon_knop_vraag_2").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
document.getElementById("icon_knop_vraag_1").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
document.getElementById("icon_knop_vraag_3").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
document.getElementById("icon_knop_vraag_4").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
let random_num = getRandomInt(1, 4);

document.getElementById("icon_knop_vraag_" + random_num).innerHTML = antwoorden[vraag];

document.getElementById("icon_knop_vraag_" + random_num).setAttribute("onClick", "javascript: anwoord_multi(true);");
// TODO: dit anders doen
if (true) {
    if (document.getElementById("icon_knop_vraag_1").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 1)) {
            document.getElementById("icon_knop_vraag_1").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_2").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 2)) {
            document.getElementById("icon_knop_vraag_2").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_3").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 3)) {
            document.getElementById("icon_knop_vraag_3").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_4").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 4)) {
            document.getElementById("icon_knop_vraag_4").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }

    } if (document.getElementById("icon_knop_vraag_1").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 1)) {
            document.getElementById("icon_knop_vraag_1").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_2").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 2)) {
            document.getElementById("icon_knop_vraag_2").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_3").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 3)) {
            document.getElementById("icon_knop_vraag_3").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_4").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 4)) {
            document.getElementById("icon_knop_vraag_4").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }

    } if (document.getElementById("icon_knop_vraag_1").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 1)) {
            document.getElementById("icon_knop_vraag_1").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_2").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 2)) {
            document.getElementById("icon_knop_vraag_2").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_3").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 3)) {
            document.getElementById("icon_knop_vraag_3").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_4").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 4)) {
            document.getElementById("icon_knop_vraag_4").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }

    } if (document.getElementById("icon_knop_vraag_1").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 1)) {
            document.getElementById("icon_knop_vraag_1").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_2").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 2)) {
            document.getElementById("icon_knop_vraag_2").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_3").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 3)) {
            document.getElementById("icon_knop_vraag_3").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }
    } if (document.getElementById("icon_knop_vraag_4").innerHTML == sanitize(antwoorden[vraag])) {
        if (!(random_num == 4)) {
            document.getElementById("icon_knop_vraag_4").innerHTML = sanitize(antwoord_oud[getRandomInt(0, antwoord_oud.length)]);
        }

    }
}