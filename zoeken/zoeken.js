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
    if (home.length == 0) {
        console.log("geen lijsten gevonden");
        let temp = div.cloneNode(true);
        // show the thing
        temp.style.display = "block";
        temp.innerHTML = temp.innerHTML.replaceAll("{{naam}}", "geen lijsten gevonden");
        temp.innerHTML = temp.innerHTML.replaceAll("{{eigenaar}}", "penguin learn");
        temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", "IconKitchen-Output/web/icon-512.png");


        temp.setAttribute("onClick", "javascript:goTo('home -dp');");
        container.appendChild(temp);
        return;
    }

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

run("https://api.wrts.nl/api/v3/search?apply_default_filters=true&search_terms=" + encodeURIComponent("{url}".replaceAll("_", "%20")) + "&limit=20&offset=0&type=user_lists");