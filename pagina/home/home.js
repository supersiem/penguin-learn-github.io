async function run() {
    await preload();
    let home = await get_user_home();
    let div = document.getElementById("template");
    let container = document.getElementById("WP_container");
    console.log(home);
    home.forEach(lijst => {
        if (lijst.type != "list") return;

        let temp = div.cloneNode(true);
        // show the thing
        temp.style.display = "block";
        temp.innerHTML = temp.innerHTML.replaceAll("{{naam}}", lijst.title);
        temp.innerHTML = temp.innerHTML.replaceAll("{{last_updated_at_display}}", lijst.last_updated_at_display);
        temp.innerHTML = temp.innerHTML.replaceAll("{{woorden}}", lijst.word_count_display);
        if (lijst.subject.icon_url) {
            temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", lijst.subject.icon_url);
        } else {
            temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", "https://wrts-production.s3.eu-west-2.amazonaws.com/subject/1652713748-5a68133b-0779-4297-9e13-43b504f4450b");
        }

        temp.setAttribute("onClick", "javascript: get_list(" + lijst.id + ")");
        container.appendChild(temp);

    });
}

if (!is_logd_in()) {
    goTo("SG_login");
}
run();