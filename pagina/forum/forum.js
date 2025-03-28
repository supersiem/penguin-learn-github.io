async function run() {
    const qna = await get_forum_home();
    let div = document.getElementById("template");
    let container = document.getElementById("WP_container");

    let home = qna.results;

    home.forEach(lijst => {
        let temp = div.cloneNode(true);
        // show the thing
        temp.style.display = "block";
        temp.innerHTML = temp.innerHTML.replaceAll("{{naam}}", lijst.title);
        temp.innerHTML = temp.innerHTML.replaceAll("{{inhoud}}", lijst.truncated_contents.slice(lijst.title.length));
        temp.innerHTML = temp.innerHTML.replaceAll("{{eigenaar}}", lijst.user.username);
        if (lijst.subject.icon_url) {
            console.log("geen gevonden");

            temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", lijst.subject.icon_url);
        } else {
            console.log("geen icon gevonden");
            // note: de link is anders icon
            temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", "https://wrts-production.s3.eu-west-2.amazonaws.com/subject/1652713748-5a68133b-0779-4297-9e13-43b504f4450b");
        }


        temp.setAttribute("onClick", "javascript: forum_item_calback(" + lijst.id + ")");
        container.appendChild(temp);
    });
}
run();