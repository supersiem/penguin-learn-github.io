async function run(id) {
    let forum_item = await get_forum_item(id);
    document.getElementById("title").innerHTML = forum_item.qna_question.title;
    document.getElementById("content").innerHTML = forum_item.qna_question.body;

    let div = document.getElementById("template");
    let container = document.getElementById("WP_container");

    let home = forum_item.qna_question.other_qna_answers;

    home.forEach(lijst => {
        let temp = div.cloneNode(true);
        // show the thing
        temp.style.display = "block";
        temp.innerHTML = temp.innerHTML.replaceAll("{{naam}}", lijst.body);
        temp.innerHTML = temp.innerHTML.replaceAll("{{eigenaar}}", lijst.qna_votes_count);
        if (lijst.user.profile_image_url) {
            console.log("geen gevonden");

            temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", lijst.user.profile_image_url);
        } else {
            // note: de link is anders icon
            temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", "https://wrts-production.s3.eu-west-2.amazonaws.com/subject/1652713748-5a68133b-0779-4297-9e13-43b504f4450b");
        }
        container.appendChild(temp);
    });
}
run("{id}");