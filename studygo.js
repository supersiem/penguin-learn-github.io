// note: gebruik bij voorkeur https://corsproxy.io/ als token niet nodig is

// WARN: LAAT DIT NIET AAN STAAN
const negeer_token_vernieuwen_datum = false

// WARN: DIT ZET ALLE STUDYGO FUNCTIES UIT DUS ZET NIET AAN
const gebruik_studygo_api = true


async function get_user_data() {
    if(!gebruik_studygo_api) return
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
    } catch (error) { throw error }
}
async function get_token() {
    if(!gebruik_studygo_api) return
    let token_vernieuwen_datum = localStorage.getItem("token_vernieuwen_datum");
    if (token_vernieuwen_datum == null) {
        localStorage.setItem("token_vernieuwen_datum", 1);
    }

    if (token_vernieuwen_datum <= Number(Date.now().toString().slice(0, 10)) || negeer_token_vernieuwen_datum) {
        console.log("token is bijna verlopen");

        let myHeaders = new Headers();
        myHeaders.append("Sec-Fetch-Mode", "cors");
        myHeaders.append("Sec-Fetch-Site", "cross-site");
        myHeaders.append("Origin", "https://studygo.com");
        myHeaders.append("Referer", "https://studygo.com");
        myHeaders.append("Sec-Fetch-Dest", "empty");

        try {
            const response = await fetch(
                'https://corsproxy.io/?url=' +
                encodeURIComponent("https://api.wrts.nl/api/v3/auth/get_token?email=penguinlearn@googlegroups.com&password=hoi als je dit ziet ben je in de code van de website aan het kijken "),
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
            return result.auth_token.toString()
        } catch (error) {
            console.error("Error:", error);
            return localStorage.getItem("token")
        }

    } else { return localStorage.getItem("token") }
}

async function upload_test() {
    console.log(await get_user_data())


}
