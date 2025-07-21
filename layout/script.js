//PARTÍCULAS FOFAS DE FUNDO
particlesJS('particles-js', {
    "particles": {
        "number": {"value": 50},
        "shape": {"type": "circle"},
        "color": {"value": "#ff85c1"},
        "size":  {"value": 4},
        "opacity": {"value": 0.6},
        "move": {"speed": 2}
    }
});

//LÓGICA DE LOGIN LOCAL
const form = document.getElementById("loginForm");
const status = document.getElementById("statusMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    //SALVAMENTO DE LOCALSTORAGE (SIMULAÇÃO DO CADASTRO)
    localStorage.setItem("user", name);
    localStorage.setItem("pass", pass);

    status.textContent = `Olá, ${name}! Você está logado(a) 💖`;
})