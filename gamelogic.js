let vragen = ["je", "il"];
let antwoorden = ["ik", "hij"];
let antwoord_oud = antwoorden;
let vragen_oud = vragen;
let mode = 1
let vraag = 0;

function nieuwe_vraag() {
    if (vragen.length == 0) {
        window.location.reload();
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
    goTo('start.html');


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
    goTo('start.html');

}
async function anwoord(input2) {
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

        // Log the results for debugging
        console.log('Questions:', vragen);
        console.log('Answers:', antwoorden);
        goTo('start.html');

    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}