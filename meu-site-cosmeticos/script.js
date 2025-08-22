// ===== Menu Responsivo =====
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector("nav ul").classList.toggle("show");
});

// ===== Fechar banner =====
function fecharBanner() {
  const banner = document.getElementById("promoBanner");
  banner.style.display = "none";
}


// =====✨ Glitter mágico nos botões =====
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("mouseenter", (e) => {
    createButtonGlitter(e.target);
  });
});

function createButtonGlitter(button) {
  const glitterContainer = document.createElement("span");
  glitterContainer.classList.add("glitter-container");
  button.appendChild(glitterContainer);

  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement("span");
    sparkle.classList.add("sparkle");

    const angle = (i / 12) * (Math.PI * 2);
    const radius = Math.random() * 40 + 20;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    sparkle.style.setProperty("--x", `${x}px`);
    sparkle.style.setProperty("--y", `${y}px`);

    glitterContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  }

  setTimeout(() => glitterContainer.remove(), 1000);
}

let carrinho = [];

// Adicionar item ao carrinho
function adicionarCarrinho(nome, preco) {
    preco = parseFloat(preco); // garante número
    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
}

// Remover item do carrinho
function removerCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Atualizar tabela do carrinho
function atualizarCarrinho() {
    const tbody = document.getElementById("carrinho-itens");
    const totalCarrinho = document.getElementById("carrinho-total");

    tbody.innerHTML = "";
    let total = 0;

    carrinho.forEach((produto, index) => {
        const subtotal = produto.preco * produto.quantidade;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <button onclick="alterarQuantidade(${index}, -1)">-</button>
                ${produto.quantidade}
                <button onclick="alterarQuantidade(${index}, 1)">+</button>
            </td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button onclick="removerCarrinho(${index})">🗑️</button></td>
        `;
        tbody.appendChild(row);
    });

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Alterar quantidade ( + / - )
function alterarQuantidade(index, delta) {
    if (carrinho[index].quantidade + delta > 0) {
        carrinho[index].quantidade += delta;
    } else {
        carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}

let descontoAplicado = false;

function aplicarCupom() {
    const input = document.getElementById("cupom-input").value.trim().toUpperCase();
    const msg = document.getElementById("cupom-msg");

    if (input === "BOASVINDAS10" && !descontoAplicado) {
        carrinho.forEach(produto => {
            produto.preco = produto.preco * 0.9; // 10% de desconto
        });
        descontoAplicado = true;
        atualizarCarrinho();
        msg.textContent = "Cupom aplicado! 🎉 10% de desconto aplicado.";
    } else if (descontoAplicado) {
        msg.textContent = "O cupom já foi aplicado.";
    } else {
        msg.textContent = "Cupom inválido.";
    }
}
