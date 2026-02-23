let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
let editIndex = -1;

function salvarContato() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (!nome || !email || !telefone) {
        alert("Preencha todos os campos!");
        return;
    }

    const contato = { nome, email, telefone };

    if (editIndex === -1) {
        contatos.push(contato);
    } else {
        contatos[editIndex] = contato;
        editIndex = -1;
    }

    atualizarStorage();
    limparCampos();
    atualizarTabela();
}

function atualizarTabela(lista = contatos) {
    const tabela = document.getElementById("tabelaContatos");
    tabela.innerHTML = "";

    lista.forEach((contato, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${contato.nome}</td>
                <td>${contato.email}</td>
                <td>${contato.telefone}</td>
                <td>
                    <button class="editar" onclick="editarContato(${index})">Editar</button>
                    <button class="excluir" onclick="excluirContato(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalContatos").innerText = contatos.length;
}

function editarContato(index) {
    const contato = contatos[index];
    document.getElementById("nome").value = contato.nome;
    document.getElementById("email").value = contato.email;
    document.getElementById("telefone").value = contato.telefone;
    editIndex = index;
}

function excluirContato(index) {
    if (confirm("Deseja excluir este contato?")) {
        contatos.splice(index, 1);
        atualizarStorage();
        atualizarTabela();
    }
}

function filtrarContatos() {
    const termo = document.getElementById("filtro").value.toLowerCase();
    const filtrados = contatos.filter(c =>
        c.nome.toLowerCase().includes(termo)
    );
    atualizarTabela(filtrados);
}

function atualizarStorage() {
    localStorage.setItem("contatos", JSON.stringify(contatos));
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}

window.onload = atualizarTabela;
