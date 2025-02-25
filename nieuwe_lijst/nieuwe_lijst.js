function maak_nieuwe_lijst_card() {
    let qwerty121 = document.getElementById("template2");
    let WP_container = document.getElementById("holder");
    let new_node = qwerty121.cloneNode(true);
    new_node.style.display = "block";


    WP_container.appendChild(new_node);
}
async function import_from_editor() {
    const holder = document.getElementById("holder");
    const cards = holder.getElementsByClassName('card');

    let quwestions = [];
    let answer = [];

    for (let card of cards) {
        const emailInput = card.querySelector('#vraag');
        const answerInput = card.querySelector('#antwoord');

        if (emailInput && answerInput) {
            quwestions.push(emailInput.value);
            answer.push(answerInput.value);

        }
    }
    importlijsten_frominputs(quwestions, answer);
    goTo("kies_wat_wil_doen.html"); if (!gebruik_studygo_api) return
    maak_lijst(antwoorden, vragen, document.getElementById("lijst_naam_input").value);

}
maak_nieuwe_lijst_card()