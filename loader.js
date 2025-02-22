// ga naar de home pagina
goTo("dynamicPage:home");

if (!is_logd_in()) {
    goTo("SG_login.html");
}