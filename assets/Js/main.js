

// Chamada da função e exibição do conteúdo da lista ordenada

function recuperar(){
	let recuperarEmail = document.getElementById('recuperarEmail');
	let login = document.getElementById('login');
	if (recuperarEmail.style.display === 'none'){
		recuperarEmail.style.display = 'block';
        login.style.display = 'none';
    }
	else{
        recuperarEmail.style.display = 'none';
        login.style.display = 'block';
    }
	
}


function paginaInicial(){
	alert('Bem-vindo(a)!');
}











// function pesquisar(){
// 	promo = document.getElementById('promo')
// 	arroz = document.getElementById('arroz')
// 	search = document.getElementById('pesquisa').value;
// 	map = document.getElementById('map')
// 	begin = document.getElementById('begin')
// 	if (search == 'arroz'){
// 		initMap(-27.60023466745539, -48.50166614760083)
//         arroz.style.display = 'block';
//         promo.style.display = 'none';
// 		begin.style.display = 'none';
// 		map.style.display = 'block';
//     }
    
// }










// function koch (){
// 	document.getElementById('top-content').innerHTML = `
//         <img src="../img/images.jpeg" alt="Imagem do local">
//         <span>
//             <p>Endereço: Rod. João Gualberto Soares, 1087 - Ingleses do Rio Vermelho<br>
//             Florianópolis - SC 88058-300<br>
//             Telefone: (48) 3380-8060<br>
//             Horário de funcionamento:</p>
//         </span>
//     `;
	
// }

// function brasil(){
// 	document.getElementById('top-content').innerHTML = `<img src="../img/images.png" alt="Imagem do local">
// 	<span>
// 		<p>Estrada, Rod. Armando Calil Bulos, 5890 - Ingleses Centro<br>
// 			Florianópolis - SC, 88058-001<br>
// 			Telefone: (48) 3279-4109<br>
// 			Horário de funcionamento:</p>
// 	</span>`
// 	initMap(-27.438641085476945, -48.402981079899305)
        
// }













//AIzaSyCZxffH421RvADYiAFjsRMIy3Bu35_Zyms