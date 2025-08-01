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

    //Busca ususiarios ja cadastrados
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //verifica se ja existe um usuario com mesmo e-mail
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    //Cria novo usuario e salva no array
    const newUser = {name, email, password};
    users.push(newUser);

        // Salva no localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cadastro realizado com sucesso!");
    toggleForm();
}

function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Busca todos os usuários
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Procura o usuário com e-mail e senha
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Email ou senha inválidos!");
        return;
    }

    alert("Login bem-sucedido!");
    localStorage.setItem("loggedInUser", user.name);
    window.location.href = "home.html";
}
