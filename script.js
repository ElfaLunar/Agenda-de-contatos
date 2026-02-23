// Função para obter os contatos armazenados no localStorage
function getContatos() {
    const contatos = localStorage.getItem('contatos');
    return contatos ? JSON.parse(contatos) : [];
}

// Função para atualizar a tabela de contatos
function atualizarTabela() {
    const contatos = getContatos();
    const listaContatos = document.getElementById('contatos-lista');
    listaContatos.innerHTML = '';
    contatos.forEach((contato, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone}</td>
            <td>
                <button class="action-btn" onclick="editarContato(${index})">Editar</button>
                <button class="delete-btn" onclick="excluirContato(${index})">Excluir</button>
            </td>
        `;
        listaContatos.appendChild(row);
    });

    // Atualizar o total de contatos
    document.getElementById('total-contatos').textContent = contatos.length;
}

// Função para cadastrar um novo contato
function cadastrarContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    if (nome && email && telefone) {
        const contatos = getContatos();
        contatos.push({ nome, email, telefone });
        localStorage.setItem('contatos', JSON.stringify(contatos));

        // Limpar os campos após cadastro
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefone').value = '';

        // Atualizar a tabela
        atualizarTabela();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para excluir um contato
function excluirContato(index) {
    const contatos = getContatos();
    contatos.splice(index, 1);  // Remove o contato pelo índice
    localStorage.setItem('contatos', JSON.stringify(contatos));
    atualizarTabela();  // Atualiza a tabela
}

// Função para editar um contato
function editarContato(index) {
    const contatos = getContatos();
    const contato = contatos[index];
    document.getElementById('nome').value = contato.nome;
    document.getElementById('email').value = contato.email;
    document.getElementById('telefone').value = contato.telefone;

    // Remover o contato original antes de editar
    excluirContato(index);
}

// Função para filtrar os contatos pela busca
function filtrarContatos() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const contatos = getContatos();
    const listaContatos = document.getElementById('contatos-lista');
    listaContatos.innerHTML = '';
    contatos.filter(contato => contato.nome.toLowerCase().includes(filtro)).forEach((contato, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone}</td>
            <td>
                <button class="action-btn" onclick="editarContato(${index})">Editar</button>
                <button class="delete-btn" onclick="excluirContato(${index})">Excluir</button>
            </td>
        `;
        listaContatos.appendChild(row);
    });
}

// Atualizar a tabela ao carregar a página
window.onload = atualizarTabela;
