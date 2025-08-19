// menu responsivo
document.getElementById("menu-toggle").addEventListener("click", function () {
    document.querySelector("nav ul").classList.toggle("show");
});
function fecharBanner() {
    const banner = document.getElementById("promoBanner");
    banner.style.display = "none";}