function navbar(topbar_items) {
    const topnav = document.querySelector(".topnav");
    
    if (!topnav) {
        console.error("Element with class 'topnav' not found!");
        return;
    }

    topnav.innerHTML = '';

    topbar_items.forEach(item => {
        const a = document.createElement("a");
        a.href = "javascript:goTo('" + item.url + "')";
        a.textContent = item.name;
        topnav.appendChild(a);
    });
}
navbar({{topbar_items}})
