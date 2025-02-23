
let custom_components = [{
    "name": "custom_component",
    "tag": "custom_component",
    "url": "custom_component",
    "version": "1.0",
    "custom_attributes": ["data"]
}];

function activate() {
    try {
        custom_components.forEach(component => {
            let linkTriggers3 = document.querySelectorAll(component.tag);
            linkTriggers3.forEach(async element => {
                let data = await makeRequest(component.tag + "/" + component.url + ".html");

                data = data.replaceAll("{{version}}", component.version);
                data = data.replaceAll("{{name}}", component.name);
                component.custom_attributes.forEach(attr => {
                    data = data.replaceAll("{{" + attr + "}}", element.getAttribute(attr));
                    console.log("{{" + attr + "}}");
                })
                element.innerHTML = data;
                changeTag(element, "custom_component_container");
                activate_triggers();

                data = await makeRequest(component.tag + "/" + component.url + ".js");

                data = data.replaceAll("{{version}}", component.version);
                data = data.replaceAll("{{name}}", component.name);
                component.custom_attributes.forEach(attr => {
                    data = data.replaceAll("{{" + attr + "}}", element.getAttribute(attr));
                    console.log("{{" + attr + "}}");
                })
                eval(data);
            });

        });
    } catch (error) {
        console.error('Error:', error);
    }


    try {
        let allLinks = document.querySelectorAll('weblink'); // Select <weblink> tags

        allLinks.forEach(element => {
            let originalLink = element.getAttribute('href'); // Get the original link
            if (originalLink && originalLink !== "") {
                element.setAttribute('href', "javascript:goTo('" + originalLink + "')"); // Set the href to JS function
                element.innerHTML = element.innerHTML; // Transfer inner content of <weblink> to <a>

                changeTag(element, 'a'); // Replace <weblink> with the new <a> tag

            }
        });

    } catch (error) {
        console.error('Error:', error);
    }

    try {
        let linkTriggers = document.querySelectorAll('linktrigger'); // Select <weblink> tags

        linkTriggers.forEach(element => {
            let originalLink = element.getAttribute('js'); // Get the original link

            element.setAttribute('href', "javascript:eval('" + originalLink + "')"); // Set the href to JS function
            element.innerHTML = element.innerHTML; // Transfer inner content of <weblink> to <a>

            changeTag(element, 'a'); // Replace <weblink> with the new <a> tag

        });
    } catch (error) {
        console.error('Error:', error);
    }
    activate_triggers();
}
async function goTo(url) {
    console.log(url.replaceAll("dynamicPage:", ''));
    if (url.replaceAll("dynamicPage:", '') !== url) {
        url = url.replaceAll("dynamicPage:", '');
        const data = await makeRequest(url + "/" + url + ".html");

        if (checkElementExists('body')) {
            document.getElementById('body').innerHTML = data;
        } else {
            document.querySelector('webpage').innerHTML = data;
        }
        activate();
        const data2 = await makeRequest(url + "/" + url + ".js");
        eval(data2);
    } else {
        const data = await makeRequest(url);
        if (checkElementExists('body')) {
            document.getElementById('body').innerHTML = data;
        } else {
            document.querySelector('webpage').innerHTML = data;
        }
        activate();
    }
}
async function makeRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
function makeCustomComponent(name, tag, url, version, custom_attributes) {
    custom_components.push({
        "name": name,
        "tag": tag,
        "url": url,
        "version": version,
        "custom_attributes": custom_attributes
    })
}
function checkElementExists(id) {
    var element = document.getElementById(id);
    if (element) {
        return true;
    } else {
        return false;
    }
}
function changeTag(element, newTagName) {
    if (!element) return null;

    // Create a new element with the desired tag
    const newElement = document.createElement(newTagName);

    // Copy the attributes from the old element to the new one
    [...element.attributes].forEach(attr => newElement.setAttribute(attr.name, attr.value));

    // Copy the content (if any)
    newElement.innerHTML = element.innerHTML;

    // Replace the old element with the new one
    element.parentNode.replaceChild(newElement, element);

    // Return the new element
    return newElement;
}
function activate_triggers() {
    try {
        let Triggers = document.querySelectorAll('trigger'); // Select <trigger> tags
        console.log(Triggers);
        Triggers.forEach(element => {
            console.log(element.innerHTML);
            eval(element.innerHTML);
            element.remove();
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function isMobile() {
    return ((window.innerWidth <= 800) && (window.innerHeight <= 600));
}
function str(non_string) {


    return non_string.toString();


}


function num(non_number) {


    return Number(non_number);


}