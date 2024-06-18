async function mostrarDados() {
    let conteudo = document.getElementById('content');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar usuário.');
        }

        const user = await response.json();

        // Adicionar as informações do usuário ao conteúdo
        conteudo.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    
                </div>
                <div class="profile-info">
                    <label>Usuário:</label>
                    <span>${user.nickname || ""}</span>
                </div>
                <div class="profile-info">
                    <label>Nome:</label>
                    <span>${user.name || ""}</span>
                </div>
                <div class="profile-info">
                    <label>Sobrenome:</label>
                    <span>${user.surname || ""}</span>
                </div>
                <div class="profile-info">
                    <label>E-mail:</label>
                    <span>${user.email || ""}</span>
                </div>
                <div class="profile-info">
                    <label>Telefone:</label>
                    <span>${user.telefone || ""}</span>
                </div>
                <div class="profile-info">
                    <label>Idade:</label>
                    <span>${user.idade || ""}</span>
                </div>
                <div class="profile-info">
                    <label>Endereço:</label>
                    <span>${user.rua || ""}, ${user.numero || ""}, ${user.bairro || ""}, ${user.complemento || ""}</span>
                </div>
                <div class="profile-info">
                    <label>Sexo:</label>
                    <span>${user.sexo || ""}</span>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
        conteudo.innerText = 'Erro ao carregar informações do usuário.';
    }
}

async function mudarDados() {
    let conteudo = document.getElementById('content');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar usuário.');
        }

        const user = await response.json();

        // Adicionar as informações do usuário ao conteúdo com um formulário editável
        conteudo.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-name"><h3>Alterar Perfil</h3></div>
                </div>
                <form id="editForm">
                    <div class="profile-info">
                        <label>Usuário:</label>
                        <input type="text" id="nickname" value="${user.nickname || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Nome:</label>
                        <input type="text" id="name" value="${user.name || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Sobrenome:</label>
                        <input type="text" id="surname" value="${user.surname || ""}">
                    </div>
                    <div class="profile-info">
                        <label>E-mail:</label>
                        <input type="email" id="email" value="${user.email || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Telefone:</label>
                        <input type="text" id="telefone" value="${user.telefone || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Data Nascimento:</label>
                        <input type="date" id="birthdate" value="${user.nascimento || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Rua:</label>
                        <input type="text" id="rua" value="${user.rua || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Número:</label>
                        <input type="text" id="numero" value="${user.numero || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Bairro:</label>
                        <input type="text" id="bairro" value="${user.bairro || ""}">
                    </div>
                    <div class="profile-info">
                        <label>Complemento:</label>
                        <input type="text" id="complemento" value="${user.complemento || ""}">
                    </div>
                    <button type="button" onclick="atualizarDados('${user.id}')">Salvar</button>
                    <p id="aviso"></p>
                </form>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
        conteudo.innerText = 'Erro ao carregar informações do usuário.';
    }
}

async function atualizarDados(userId) {
    const nickname = document.getElementById('nickname').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const surname = document.getElementById('surname').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const complemento = document.getElementById('complemento').value;

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'PUT', // ou 'PATCH', dependendo da sua preferência
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname, name, email, telefone, surname, rua, numero, bairro, complemento })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário.');
        }

        document.getElementById('aviso').innerText = 'Usuário atualizado com sucesso!';
        setTimeout(mostrarDados, 2000); // Recarrega os dados atualizados
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário.');
    }
}

document.addEventListener('DOMContentLoaded', mostrarDados);
