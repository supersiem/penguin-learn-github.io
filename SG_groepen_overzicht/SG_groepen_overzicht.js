const holder = document.getElementById("holder");
const template = document.getElementById("template");

async function run() {
    let gebruiker = await get_user_data();
    let groepen = gebruiker.groups;
    groepen.forEach(groep => {
        let temp = template.cloneNode(true);
        // show the thing
        temp.style.display = "inline-block";
        temp.innerHTML = temp.innerHTML.replaceAll("{{naam}}", groep.name);
        temp.innerHTML = temp.innerHTML.replaceAll("{{last_updated_at_display}}", groep.grade_display);
        temp.innerHTML = temp.innerHTML.replaceAll("{{icon_link}}", groep.small_image);
        temp.setAttribute("onClick", "javascript:goTo('SG_group -dp -pi=groepID=" + groep.id + "');");
        holder.appendChild(temp);
    });
    template.remove();
}
run();