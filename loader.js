// ga naar de home pagina

if (!is_logd_in()) {
    goTo("SG_login");
}

custom_root = "pagina/";
goTo("home -dp");