async function run(id) {
    let groep = await get_group(id);
    groep.practiceable_items.forEach(item => {

        if (item.type != "list") return;
        console.log(item);
        let temp = template.cloneNode(true);
        // show the thing
        temp.style.display = "inline-block";
        temp.innerHTML = temp.innerHTML.replaceAll("{{naam}}", item.title);
        temp.innerHTML = temp.innerHTML.replaceAll("{{last_updated_at_display}}", item.last_updated_at_display);
        temp.innerHTML = temp.innerHTML.replaceAll("{{woorden}}", item.word_count_display);
        try {
            temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", item.subject.icon_url);

        } catch (error) {
            let localid = item.locales[0].id;
            onderwerpen_SG.subjects.forEach(onderwerp => {
                if (onderwerp.id == localid) {
                    temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", onderwerp.icon_url);
                }
            });
        }
        temp.setAttribute("onClick", "javascript: get_list(" + item.id + ")");
        holder.appendChild(temp);
    });
}
run("{groepID}");