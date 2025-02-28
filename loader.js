// ga naar de home pagina
goTo("home -dp");

if (!is_logd_in()) {
    goTo("SG_login");
}