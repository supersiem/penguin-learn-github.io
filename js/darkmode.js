let darkmode = Boolean(localStorage.getItem("darkmode"))
// warn: dit bestaat nog niet en doet nog niks
function toggle_darkmode() {
    darkmode = !darkmode
    localStorage.setItem("darkmode", darkmode)
}
function update_darkmode() {
    // TODO: dit maken

    console.log(darkmode)
    // TODO: dit doen
    // document.getElementById("darkmode_button_icon")
}
update_darkmode()