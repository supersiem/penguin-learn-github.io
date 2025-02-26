
let dropdown_value_now_lol = "41";

function update_ui_mk_list(naam, icon_url_) {
    document.getElementById("dropdown_txt_mk_list").innerHTML = naam + ' <img src="' + icon_url_ + '" alt="">';
}

function maak_nieuwe_lijst_card() {
    let qwerty121 = document.getElementById("template2");
    let WP_container = document.getElementById("holder");
    let new_node = qwerty121.cloneNode(true);
    new_node.style.display = "block";


    WP_container.appendChild(new_node);

    build_dropdown();
}
async function build_dropdown() {
    const dropdown_item1 = document.getElementById("dropdown_item");
    const dropdown_item_holder = document.getElementById("dropdown_holder");
    onderwerpen_SG.subjects.forEach(onderwerp => {
        let new_node = dropdown_item1.cloneNode(true);
        new_node.innerHTML = new_node.innerHTML.replaceAll("{naam}", onderwerp.name);
        new_node.innerHTML = new_node.innerHTML.replaceAll("{id}", onderwerp.id);
        new_node.innerHTML = new_node.innerHTML.replaceAll("{icon_link}", onderwerp.icon_url);
        dropdown_item_holder.appendChild(new_node);

    });
    dropdown_item1.remove()

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
    maak_lijst(antwoorden, vragen, document.getElementById("lijst_naam_input").value, dropdown_value_now_lol);

}
maak_nieuwe_lijst_card()