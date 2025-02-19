let vraag_element = document.getElementById('vraag');
nieuwe_vraag();
vraag_element.innerHTML = sanitize(vragen[vraag]);

// verberg de 2de knop
let icon_elemen2 = document.getElementById("icon_knop2")
icon_elemen2.style.display = 'none';
 