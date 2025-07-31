function toggleForm() {
    const form = document.getElementById("form-container");
    const login = document.getElementById("login-container");
    form.style.display = form.style.display === "none" ? "block" : "none";
    login.style.display = login.style.display === "none" ? "block" : "none";
}

function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if ( !name || !email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Cadastro realizado com sucesso!");
    toggleForm();
}

function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.email !== email || user.password !== password) {
        alert("Email ou senha inválidos!");
        return;
    }

    alert("Login bem-sucedido!");
    localStorage.setItem("loggedInUser", user.name);
    window.location.href = "home.html";
}