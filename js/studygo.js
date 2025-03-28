// note: gebruik bij voorkeur https://corsproxy.io/ als token niet nodig is
// note: de studygo api is iritant dus wees gewaarschuwd

// WARN: LAAT DIT NIET AAN STAAN
const negeer_token_vernieuwen_datum = false;

// WARN: DIT ZET ALLE STUDYGO FUNCTIES UIT DUS ZET NIET AAN
const gebruik_studygo_api = true;

let user_name;

// Add this helper function at the top to sanitize strings
function sanitize(str) {
    try {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    } catch (error) { console.log(error); }
}
async function get_user_home() {
    if (!gebruik_studygo_api) return;
    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", await get_token());

    try {
        const response = await fetch(
            'https://cros.vankeulensiem.workers.dev/?url=' +
            encodeURIComponent("https://api.wrts.nl/api/v3/public/users/" + user_name + "/practiceable_items"),
            {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            }
        );

        let result = await response.json();

        return result;
    } catch (error) { throw error; }
}
async function get_user_data() {
    if (!gebruik_studygo_api) return;
    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", await get_token());

    try {
        const response = await fetch(
            'https://cros.vankeulensiem.workers.dev/?url=' +
            encodeURIComponent("https://api.wrts.nl/api/v3/get_user_data"),
            {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            }
        );

        let result = await response.json();

        return result;
    } catch (error) { throw error; }
}
async function get_group(id) {
    if (!gebruik_studygo_api) return;
    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", await get_token());

    try {
        const response = await fetch(
            'https://cros.vankeulensiem.workers.dev/?url=' +
            encodeURIComponent("	https://api.wrts.nl/api/v3/groups/" + id + "/practiceable_items"),
            {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            }
        );

        let result = await response.json();

        return result;
    } catch (error) { throw error; }
}

async function get_token() {
    if (!is_logd_in()) {
        goTo("SG_login");
    }
    if (!gebruik_studygo_api) return;
    let token_vernieuwen_datum = localStorage.getItem("token_vernieuwen_datum");
    if (token_vernieuwen_datum == null) {
        localStorage.setItem("token_vernieuwen_datum", 1);
    }

    if (token_vernieuwen_datum <= Number(Date.now().toString().slice(0, 10)) || negeer_token_vernieuwen_datum) {

        let myHeaders = new Headers();
        myHeaders.append("Sec-Fetch-Mode", "cors");
        myHeaders.append("Sec-Fetch-Site", "cross-site");
        myHeaders.append("Origin", "https://studygo.com");
        myHeaders.append("Referer", "https://studygo.com");
        myHeaders.append("Sec-Fetch-Dest", "empty");

        const response = await fetch(
            'https://corsproxy.io/?url=' +
            "https://api.wrts.nl/api/v3/auth/get_token?email=" + encodeURIComponent(localStorage.getItem("email_studygo") + "&password=" + localStorage.getItem("password_studygo")),
            {
                method: "POST",
                headers: myHeaders,
                redirect: "follow"
            }
        );

        const result = await response.json();
        console.log(result);

        // Update localStorage
        localStorage.setItem("token", result.auth_token.toString());
        localStorage.setItem("token_vernieuwen_datum", Number(result.renew_from));
        return result.auth_token.toString();

    } else { return localStorage.getItem("token"); }
}
async function maak_lijst(pl_lijst_antwoorden, pl_lijst_vragen, title, wat_oefene_wij) {

    if (!localStorage.getItem("email_studygo")) goTo("SG_login");
    if (!localStorage.getItem("password_studygo")) goTo("SG_login");

    if (!gebruik_studygo_api) return;
    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", await get_token());
    // WARN: WIJZIG DE VOLGENDE DE REGEL NIET WANT HET IS HEEL BLANGELRIJK (behalven als je variable namen veranderd)
    myHeaders.append("Content-Type", "application/json");
    let raw_body = JSON.parse(JSON.stringify(lijst_verzoek_template_SG));
    pl_lijst_vragen.forEach(element => {
        raw_body.list.words_collection.push({
            "id": 1,
            "words": [
                "vraag",
                "antwoord"
            ],
            "image_url": null
        });
        raw_body.list.words_collection[raw_body.list.words_collection.length - 1].id = raw_body.list.words_collection.length;
        raw_body.list.words_collection[raw_body.list.words_collection.length - 1].words[0] = element;
        raw_body.list.words_collection[raw_body.list.words_collection.length - 1].words[1] = pl_lijst_antwoorden[pl_lijst_vragen.indexOf(element)];
    });
    raw_body.list.title = title;
    raw_body.list.subject_id = wat_oefene_wij;
    raw_body = JSON.stringify(raw_body);

    try {
        const response = await fetch(
            'https://cros.vankeulensiem.workers.dev/?url=https://api.wrts.nl/api/v3/lists',
            {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: raw_body
            }
        );

        let result = await response.json();

        return result;
    } catch (error) { throw error; }
}
async function get_list(id) {
    if (!gebruik_studygo_api) return;
    try {
        // Fetch data using the proxy
        const response = await fetch('https://corsproxy.io/?url=' + encodeURIComponent(`https://api.wrts.nl/api/v3/public/lists/${id}`));

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            new Notify({
                title: 'Error!',
                text: 'Er ging iets mis bij het ophalen van de lijst. Is de ID correct?',
                autoclose: true,
                autotimeout: 5000,
                effect: 'slide',
                speed: 300,
                position: 'center',
                status: 'error'
            });
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();

        // Initialize arrays for questions and answers
        let questions = [];
        let answers = [];

        // Loop through all vocabulary items, sanitizing each question and answer to prevent XSS
        data.words_with_performance.forEach(entry => {
            questions.push(sanitize(entry.words[0]));
            answers.push(sanitize(entry.words[1]));
        });

        // update arrays
        vragen = [...questions];
        antwoorden = [...answers];
        antwoord_oud = [...antwoorden];
        vragen_oud = [...vragen];

        // rederect
        goTo('kies_wat_wil_doen');

    } catch (error) {
        new Notify({
            title: 'Error!',
            text: 'Er is een fout in de code: ' + error.message,
            autoclose: true,
            autotimeout: 5000,
            effect: 'slide',
            speed: 300,
            position: 'center',
            status: 'error'
        });
        throw error;
    }
}
async function upload_lijst() {
    if (!gebruik_studygo_api) return;
    let temp = await maak_lijst(antwoorden, vragen, "hoi", "41");
    return temp.id;
}
async function login(GN, WW) {
    localStorage.setItem("email_studygo", str(GN));
    localStorage.setItem("password_studygo", str(WW));

    try { await get_token(); goTo("home -dp"); } catch (error) {
        new Notify({
            title: 'Error!',
            text: 'je email of wachtwoord is verkeerd, probeer het opnieuw.',
            autoclose: true,
            autotimeout: 5000,
            effect: 'slide',
            speed: 300,
            position: 'center',
            status: 'error'
        });

        localStorage.removeItem("email_studygo");
        localStorage.removeItem("password_studygo");
        throw error;
    }

}
function is_logd_in() {
    if (!localStorage.getItem("email_studygo") || !localStorage.getItem("password_studygo")) return false;
    return true;
}

async function preload() {
    if (!user_name) {
        user_name = await get_user_data();
        user_name = user_name.username;
    }
}

async function get_forum_home() {
    if (!gebruik_studygo_api) return;
    try {
        // Fetch data using the proxy
        const response = await fetch('https://corsproxy.io/?url=' + encodeURIComponent(`https://api.wrts.nl/api/v3/public/qna/questions`));

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            new Notify({
                title: 'Error!',
                text: 'Er ging iets mis bij het ophalen van de lijst. Is de ID correct?',
                autoclose: true,
                autotimeout: 5000,
                effect: 'slide',
                speed: 300,
                position: 'center',
                status: 'error'
            });
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();


        return data;



    } catch (error) {
        new Notify({
            title: 'Error!',
            text: 'Er is een fout in de code: ' + error.message,
            autoclose: true,
            autotimeout: 5000,
            effect: 'slide',
            speed: 300,
            position: 'center',
            status: 'error'
        });
        throw error;
    }
}
async function get_forum_item(id) {
    if (!gebruik_studygo_api) return;
    try {
        // Fetch data using the proxy
        const response = await fetch('https://corsproxy.io/?url=' + encodeURIComponent(`https://api.wrts.nl/api/v3/public/qna/questions/${id}`));

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            new Notify({
                title: 'Error!',
                text: 'Er ging iets mis bij het ophalen van de lijst. Is de ID correct?',
                autoclose: true,
                autotimeout: 5000,
                effect: 'slide',
                speed: 300,
                position: 'center',
                status: 'error'
            });
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();


        return data;



    } catch (error) {
        new Notify({
            title: 'Error!',
            text: 'Er is een fout in de code: ' + error.message,
            autoclose: true,
            autotimeout: 5000,
            effect: 'slide',
            speed: 300,
            position: 'center',
            status: 'error'
        });
        throw error;
    }
}