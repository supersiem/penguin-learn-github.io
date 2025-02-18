// WARN: dit doet het nog niet dus niet gebruiken
async function upload_test() {
    let token_vernieuwen_datum = localStorage.getItem("token_vernieuwen_datum");
    if (token_vernieuwen_datum == null) {
        localStorage.setItem("token_vernieuwen_datum", 1);
    }

    if (token_vernieuwen_datum <= Number(Date.now().toString().slice(0, 10))) {
        console.log("token is bijna verlopen");

        let myHeaders = new Headers();
        myHeaders.append("Sec-Fetch-Mode", "cors");
        myHeaders.append("Sec-Fetch-Site", "cross-site");
        myHeaders.append("Origin", "https://studygo.com");
        myHeaders.append("Referer", "https://studygo.com");
        myHeaders.append("Sec-Fetch-Dest", "empty");

        try {
            const response = await fetch(
                'https://corsproxy.io/' + 
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
        } catch (error) {
            console.error("Error:", error);
        }
    }
}