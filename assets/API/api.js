
function formatarTelefone(input) {
    // Remove caracteres não numéricos do valor atual do campo
    let phoneNumber = input.value.replace(/\D/g, '');

    // Verifica se o número de telefone tem mais de 11 dígitos (incluindo DDD)
    if (phoneNumber.length > 11) {
        // Remove o primeiro dígito se houver (geralmente é o prefixo internacional)
        phoneNumber = phoneNumber.slice(1);
    }

    // Adiciona a formatação correta ao número de telefone
    if (phoneNumber.length > 10) {
        input.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    } else if (phoneNumber.length > 6) {
        input.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
    } else if (phoneNumber.length > 2) {
        input.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else {
        input.value = phoneNumber;
    }

  
}
// document.getElementById('registrationForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevenir o envio do formulário

//     const birthdateInput = document.getElementById('birthdate').value;
//     const birthdate = new Date(birthdateInput);
//     const today = new Date();

//     // Calcular a diferença de anos
//     let age = today.getFullYear() - birthdate.getFullYear();

//     // Ajustar a idade se o aniversário ainda não foi este ano
//     const monthDifference = today.getMonth() - birthdate.getMonth();
//     const dayDifference = today.getDate() - birthdate.getDate();
    
//     if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
//         age--;
//     }

//     if (age < 18) {
//         document.getElementById('error-message').innerText = 'Você deve ter pelo menos 18 anos para se registrar.';
//     } else {
//         document.getElementById('error-message').innerText = '';
//         // Aqui você pode enviar o formulário ou realizar outra ação necessária
// 		alert(age)
//         alert('Formulário válido!');
//         // Pode remover a linha event.preventDefault() se quiser enviar o formulário
		
//         event.target.submit(); 
//     }
	
// });


async function proximo() {
    let nome = document.getElementById('name').value;
    let sobrenome = document.getElementById('surname').value;
    let usuario = document.getElementById('nick').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;
    const verificarSenha = document.getElementById('vericarpass').value;

    // Limpar mensagens de alerta ao iniciar a verificação
    document.getElementById('alertcampos').innerText = '';
    document.getElementById('alertpassword').innerText = '';
    document.getElementById('alerconfirmepass').innerText = '';
    document.getElementById('alertemail').innerText = '';
    document.getElementById('alertname').innerText = '';
    document.getElementById('alertnickname').innerText = '';

    // Verificação dos campos
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
        // Criar novo usuário
        const response = await fetch('http://localhost:3000/usuarios', {
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
            
            // Redirecionar para a página cadastroInfo.html com o ID do usuário recém-criado
            window.location.href = `cadastroInfo.html?id=${data.id}`;
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
        // Chama a função para mostrar os produtos
        await proximo();;
    }
})




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

    // Calculando a idade a partir da data de nascimento
    var partesData = nascimento.split('-'); // Alterado para formato ISO (yyyy-mm-dd)
    var dia = parseInt(partesData[2], 10);
    var mes = parseInt(partesData[1], 10) - 1; // Mês é base 0 no JavaScript (janeiro = 0, fevereiro = 1, ...)
    var ano = parseInt(partesData[0], 10);
    var dataNasc = new Date(ano, mes, dia);
    var dataAtual = new Date();
    var idade = dataAtual.getFullYear() - dataNasc.getFullYear();

    // Verificar se já fez aniversário neste ano
    if (dataAtual.getMonth() < dataNasc.getMonth() || (dataAtual.getMonth() === dataNasc.getMonth() && dataAtual.getDate() < dataNasc.getDate())) {
        idade--;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
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
                idade // Inclui a idade calculada no objeto enviado para o servidor
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário.');
        }

        // Redirecionar após sucesso
        window.location.href = `login.html`;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        alert('Houve um problema ao atualizar o usuário.');
    }
}
document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        // Chama a função para mostrar os produtos
        await atualizar();;
    }
})

async function login() {
    let usuario = document.getElementById('loginnickname').value;
    let senha = document.getElementById('loginpassword').value;
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        const users = await response.json();

        // Verifique se a resposta do fetch foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários.');
        }

        const user = users.find(user => user.nickname === usuario && user.password === senha);
        const invalid = users.find(user => user.nickname === usuario && user.password !== senha);
        if (user) {            
            window.location.href = `main.html?id=${user.id}`;
        }
         else if (invalid) {
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
        // Chama a função para mostrar os produtos
        await login();
    }
})





document.getElementById('cep').addEventListener('focusout', function () {
    buscarCEP();
 });
 
 function limparFormulario(){
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
             const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
             const data = await response.json();
             if (data.hasOwnProperty('erro')) {
                 document.getElementById('cidade').value = 'Cep não encontrado.';   
                 return;
             }
 
             document.getElementById('cidade').value = data.localidade;
             document.getElementById('estado').value = data.uf;
             document.getElementById('rua').value = data.logradouro;
             document.getElementById('bairro').value = data.bairro;
             document.getElementById('complemento').value = data.complemento;
         } catch (error) {
             console.error('Erro ao buscar CEP:', error);
         }
     } else {
         document.getElementById('cidade').value = 'CEP inválido.';
     }
 }
 