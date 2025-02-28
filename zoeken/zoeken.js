async function run(link) {
    const url = 'https://cros.vankeulensiem.workers.dev/?url=' + encodeURIComponent(link);

    let div = document.getElementById("template");
    let container = document.getElementById("WP_container");

    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", await get_token());
    myHeaders.append("Content-Type", "application/json");

    let home = await fetch(url, {
        headers: myHeaders,
    }).then(res => res.json());


    home = home.result_sections[0].results;
    home.forEach(lijst => {
        let temp = div.cloneNode(true);
        // show the thing
        temp.style.display = "block";
        temp.innerHTML = temp.innerHTML.replaceAll("{{naam}}", lijst.title);
        temp.innerHTML = temp.innerHTML.replaceAll("{{eigenaar}}", lijst.creator_name);
        temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", lijst.subject.icon_url);


        temp.setAttribute("onClick", "javascript: get_list(" + lijst.id + ")");
        container.appendChild(temp);
    });
}

run("https://api.wrts.nl/api/v3/search?apply_default_filters=true&search_terms=" + "{url}" + "&limit=20&offset=0&type=user_lists");