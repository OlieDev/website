// Função para formatar telefone
function formatarTelefone(input) {
    let phoneNumber = input.value.replace(/\D/g, '');

    if (phoneNumber.length > 11) {
        phoneNumber = phoneNumber.slice(1);
    }

    if (phoneNumber.length > 10) {
        input.value = (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)};
    } else if (phoneNumber.length > 6) {
        input.value = (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)};
    } else if (phoneNumber.length > 2) {
        input.value = (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)};
    } else {
        input.value = phoneNumber;
    }
}

// URL da API (URL gerada pelo ngrok)
const apiUrl = 'https://4722-2804-4d98-178-9200-3825-c564-7555-619f.ngrok-free.app';

// Função para criar novo usuário
async function proximo() {
    let nome = document.getElementById('name').value;
    let sobrenome = document.getElementById('surname').value;
    let usuario = document.getElementById('nick').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;
    const verificarSenha = document.getElementById('vericarpass').value;

    document.getElementById('alertcampos').innerText = '';
    document.getElementById('alertpassword').innerText = '';
    document.getElementById('alerconfirmepass').innerText = '';
    document.getElementById('alertemail').innerText = '';
    document.getElementById('alertname').innerText = '';
    document.getElementById('alertnickname').innerText = '';

    if (nome === '' || usuario === '' || email === '' || senha === '') {
        document.getElementById('alertcampos').innerText = 'Preencha todos os campos';
        return;
    }

    if (senha.length < 6) {
        document.getElementById('alertpassword').innerText = 'A senha deve conter no mínimo 6 caracteres';
        return;
    }
    if (senha !== verificarSenha) {
        document.getElementById('alerconfirmepass').innerText = 'As senhas não coincidem';
        return;
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        document.getElementById('alertemail').innerText = 'E-mail inválido';
        return;
    }

    if (nome.length < 3) {
        document.getElementById('alertname').innerText = 'O nome deve conter no mínimo 3 caracteres';
        return;
    }

    if (usuario.length < 3) {
        document.getElementById('alertnickname').innerText = 'O usuário deve conter no mínimo 3 caracteres';
        return;
    }

    try {
        const response = await fetch(${apiUrl}/usuarios, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                nickname: usuario,
                email: email,
                password: senha,
                surname: sobrenome
            })
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 201) {
            window.location.href = cadastroInfo.html?id=${data.id};
        } else {
            alert('Erro ao cadastrar usuário: ' + data.error);
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Houve um problema ao cadastrar o usuário.');
    }
}

document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        await proximo();
    }
});

// Função para atualizar usuário
async function atualizar() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        return;
    }

    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const rua = document.getElementById('rua').value;
    const numero = parseInt(document.getElementById('numero').value, 10);
    const bairro = document.getElementById('bairro').value;
    const complemento = document.getElementById('complemento').value;
    const telefone = document.getElementById('telefone').value;
    const sexo = document.getElementById('sexo').value;
    const nascimento = document.getElementById('birthdate').value;

    var partesData = nascimento.split('-');
    var dia = parseInt(partesData[2], 10);
    var mes = parseInt(partesData[1], 10) - 1;
    var ano = parseInt(partesData[0], 10);
    var dataNasc = new Date(ano, mes, dia);
    var dataAtual = new Date();
    var idade = dataAtual.getFullYear() - dataNasc.getFullYear();

    if (dataAtual.getMonth() < dataNasc.getMonth() || (dataAtual.getMonth() === dataNasc.getMonth() && dataAtual.getDate() < dataNasc.getDate())) {
        idade--;
    }

    try {
        const response = await fetch(${apiUrl}/usuarios/${userId}, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cep,
                cidade,
                estado,
                rua,
                numero,
                bairro,
                complemento,
                telefone,
                sexo,
                nascimento,
                idade
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário.');
        }

        window.location.href = login.html;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        alert('Houve um problema ao atualizar o usuário.');
    }
}

document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        await atualizar();
    }
});

// Função para login
async function login() {
    let usuario = document.getElementById('loginnickname').value;
    let senha = document.getElementById('loginpassword').value;
    try {
        const response = await fetch(${apiUrl}/usuarios);
        const users = await response.json();

        if (!response.ok) {
            throw new Error('Erro ao buscar usuários.');
        }

        const user = users.find(user => user.nickname === usuario && user.password === senha);
        const invalid = users.find(user => user.nickname === usuario && user.password !== senha);
        if (user) {
            window.location.href = main.html?id=${user.id};
        } else if (invalid) {
            document.getElementById('alertas').innerText = 'Usuário ou senha inválidos!!';
        } else {
            document.getElementById('alertas').innerText = 'Usuário não encontrado!';
        }
    } catch (error) {
        console.error('Erro ao validar login:', error);
        document.getElementById('alertas').innerText = 'Erro ao tentar fazer login. Tente novamente mais tarde.';
    }
}

document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        await login();
    }
});

// Função para buscar CEP
document.getElementById('cep').addEventListener('focusout', function () {
    buscarCEP();
});

function limparFormulario() {
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('complemento').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('telefone').value = "";
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

async function buscarCEP() {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    if (cepValido(cep)) {
        try {
            const response = await fetch(https://viacep.com.br/ws/${cep}/json/);
            const data = await response.json();
            if (data.hasOwnProperty('erro')) {
                document.getElementById('cidade').value = 'Cep não encontrado.';
                return;
            }

            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementBy
