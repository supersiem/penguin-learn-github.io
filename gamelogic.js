let vragen = ["je", "il"];
let antwoorden = ["ik", "hij"];
let antwoord_oud = [...antwoorden];
let vragen_oud = [...vragen]
let mode = 1
let vraag = 0;
let fase = 0;

function nieuwe_vraag() {

    try{
    document.getElementById("antwoord_vak").focus();
    } catch (error) {
        console.log("not found");
    }
    fase = 0;
    if (vragen.length == 0) {
        antwoorden = [...antwoord_oud]
        vragen = [...vragen_oud]
        console.log(vragen)
        goTo("home.html")
    }
    vraag = Math.floor(Math.random() * vragen.length);
    return vraag
}
function vraag_UI() {
    document.getElementById("vraag").innerHTML = vragen[vraag];
}
function antwoord_UI() {
    document.getElementById("antwoord").innerHTML = antwoorden[vraag];
}
function AntwoordGoed() {
    vragen.splice(vraag, 1);
    antwoorden.splice(vraag, 1);

}
function MEERKEUZE_ANDWOORD_UI() {
    document.getElementById("MEERKEUZE_ANDWOORD").innerHTML = document.getElementById("MEERKEUZE_ANDWOORD").innerHTML + antwoorden[vraag];
}
function importlijsten(waar) {
    let temp = document.getElementById(waar).value;
    // Split the string into lines (each line is an array element)
    const lines = temp.split('\n').filter(line => line.trim() !== ''); // Remove empty lines

    // Split into two arrays: even-indexed lines and odd-indexed lines
    const array1 = lines.filter((_, index) => index % 2 === 0); // Even indices (0, 2, 4...)
    const array2 = lines.filter((_, index) => index % 2 !== 0); // Odd indices (1, 3, 5...)
    vragen = [...array1]
    antwoorden = [...array2]
    antwoord_oud = [...antwoorden];
    vragen_oud = [...vragen];


    goTo('kies_wat_wil_doen.html');


}
function importlijsten_fromstr(input1) {
    let temp = input1;
    // Split the string into lines (each line is an array element)
    const lines = temp.split('\n').filter(line => line.trim() !== ''); // Remove empty lines

    // Split into two arrays: even-indexed lines and odd-indexed lines
    const array1 = lines.filter((_, index) => index % 2 === 0); // Even indices (0, 2, 4...)
    const array2 = lines.filter((_, index) => index % 2 !== 0); // Odd indices (1, 3, 5...)
    vragen = [...array1]
    antwoorden = [...array2]
 antwoord_oud = [...antwoorden];
 vragen_oud = [...vragen];

    goTo('kies_wat_wil_doen.html');


}
async function anwoord(input2) {
    fase = 1;
    let icon_element = document.getElementById('icon_knop');
    let antwoord_van_gebruiker = document.getElementById('antwoord_vak').value.replace(/[^0-9a-z]/gi, '').toLowerCase();
    let antwoord_met_filter = antwoorden[vraag].replace(/[^0-9a-z]/gi, '').toLowerCase();
    icon_element.setAttribute( "onClick", "javascript: goTo('start.html');" );
    if(antwoord_van_gebruiker === antwoord_met_filter){
        input2.innerHTML = 'hoera je hebt het goed! &#x1F389;'
        AntwoordGoed()
        return
    }
    input2.innerHTML = 'het antwoord was '+ antwoorden[vraag];



    icon_element.innerHTML = "ok"
}
async function anwoord_ig(input2) {
    fase = 1;
    let icon_element = document.getElementById('icon_knop');
    icon_element.setAttribute( "onClick", "javascript: AntwoordGoed(); goTo('start_ig.html');" );
    input2.innerHTML = 'het antwoord was '+ antwoorden[vraag]+' had je het goed?';
    icon_element.innerHTML = "Ja!"
let icon_elemen2 = document.getElementById("icon_knop2")
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
    let text_vak = document.getElementById('vraag')
    let icon_element = document.getElementById('icon_knop_vraag_1');
    icon_element.setAttribute( "onClick", "javascript: goTo('start_multi.html');" );
    if(input2){
        icon_element.innerHTML = "hoera!";
        text_vak.innerHTML = 'hoera je hebt het goed! &#x1F389;'
        AntwoordGoed()
        return
    }
    text_vak.innerHTML = 'het antwoord was '+ antwoorden[vraag];

    icon_element.innerHTML = "ok"

}
async function get_list(id) {
    try {
        // Fetch data using the proxy
        const response = await fetch('https://corsproxy.io/' + encodeURIComponent(`https://api.wrts.nl/api/v3/public/lists/${id}`));
        
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();

        // Initialize arrays for questions and answers
        let questions = [];
        let answers = [];

        // Loop through all vocabulary items
        data.words_with_performance.forEach(entry => {
            const questionIndex = entry.locales.findIndex(l => l.practise_type === 'question');
            const answerIndex = entry.locales.findIndex(l => l.practise_type === 'answer');

            // Add questions and answers to their respective arrays
            if (questionIndex !== -1) questions.push(entry.words[questionIndex]);
            if (answerIndex !== -1) answers.push(entry.words[answerIndex]);
        });

        // Assign to global variables (if needed)
        vragen = [...questions];
        antwoorden = [...answers];
        antwoord_oud = [...antwoorden];
    vragen_oud = [...vragen];
    goTo('kies_wat_wil_doen.html');

    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}
function enterpressalert(e, textarea){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
        if(fase == 0){
            anwoord(document.getElementById('vraag'));
            return;
        }
        if(fase == 1){goTo('start.html');return;}
    }
    }