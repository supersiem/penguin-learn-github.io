let darkmode = localStorage.getItem("darkmode")

function toggle_darkmode() {
    if (darkmode == "darkmode") {
        darkmode = "nee"
    } else {
        darkmode = "darkmode"
    }
    localStorage.setItem("darkmode", darkmode)
    update_darkmode()
}
function update_darkmode() {
    if (darkmode == "darkmode") {
        document.getElementById("root").classList.add("darkmode")
        document.getElementById("darkmode_button_icon").classList.remove("ph-moon")
        document.getElementById("darkmode_button_icon").classList.add("ph-sun")
    } else {
        try {
            document.getElementById("root").classList.remove("darkmode")
            document.getElementById("darkmode_button_icon").classList.remove("ph-sun")
            document.getElementById("darkmode_button_icon").classList.add("ph-moon")
        } catch (error) {
            console.log("darkmode not found")
        }
    }
}
update_darkmode()