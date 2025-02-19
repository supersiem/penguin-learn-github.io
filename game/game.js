let vraag_element = document.getElementById('vraag');
nieuwe_vraag();
vraag_element.innerHTML = sanitize(vragen[vraag]);