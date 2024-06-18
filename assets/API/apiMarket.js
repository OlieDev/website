document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('input[name="slide"]');
    const slideInterval = 5000;
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].checked = false;
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].checked = true;
    }

    setInterval(nextSlide, slideInterval)
});

const pesquisaInput = document.getElementById('pesquisa');
const produtos = document.getElementById('product-info');
async function mostrarProdutos() {
    const pesquisa = pesquisaInput.value.trim().toLowerCase();
    document.getElementById('product-info').style.backgroundColor = '#ffffff';
    if (!pesquisa) {
        return;
    }
    try {
        
        const [responseProdutos, responseEmpresas] = await Promise.all([
            fetch('http://localhost:3000/produtos'),
            fetch('http://localhost:3000/empresas')
        ]);
        const data = await responseProdutos.json();
        const empresas = await responseEmpresas.json();
        const normalizeString = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
        };
        
         
        const pesquisaNormalizada = normalizeString(pesquisa);
        
        produtos.innerHTML = '';
        const produtosFiltrados = data
            .filter(produto => normalizeString(produto.busca || '').includes(pesquisaNormalizada))
            .sort((a, b) => a.preco - b.preco);
        document.getElementById('nomeshow').innerText = 'Produtos'
       
        
        const html = produtosFiltrados.map(produto => `
            
            
            <div class="product-card">                
                <img class="empresa-img" data-empresa="${produto.empresa}" src="${produto.img}" alt="${produto.nomeProduto}">
                <h3>${produto.nomeProduto}</h3>
                <p>R$${produto.preco.toFixed(2)}</p>
            </div>`
        ).join('');
        
        function initMap(lat, lng) {
            var location = { lat: lat, lng: lng };
            var map = new google.maps.Map(document.getElementById('maps'), {
                zoom: 15,
                center: location
            });
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
        
        
        produtos.innerHTML = html;
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        document.querySelectorAll('.empresa-img').forEach(img => {
            img.addEventListener('click', async (event) => {
                const empresaNome = event.target.getAttribute('data-empresa');
                const empresaDados = empresas.find(empresa => empresa.nome === empresaNome);
                if (empresaDados) {
                    const empresaInfo = document.getElementById('top-content');
                    initMap(empresaDados.lat, empresaDados.lng);
                    
                    empresaInfo.innerHTML = `
                        <div class="empresa-info">
                            <img src="${empresaDados.img}" alt="Imagem da empresa">
                            <div class="teste">
                                <p>Endereço: ${empresaDados.endereco}</p>
                                <p>Telefone: ${empresaDados.telefone}</p>
                                <p>Horários: ${empresaDados.horario}</p>
                            </div>
                        </div>`;
                } else {
                    console.error('Empresa não encontrada:', empresaNome);
                }
            });
        });
        
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}
pesquisaInput.addEventListener('focusout', mostrarProdutos);
document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        await mostrarProdutos();
    }
});



async function MostrarEncartes(){
    const telaEncarte = document.getElementById('encartes')
    try{
        const response = await fetch('http://localhost:3000/empresas');
        const data = await response.json();
        const html = data.map(encarte => `
            <div class="encarte-card">
                <a href="${encarte.encarte}" target="_blank"><img src="${encarte.img}" alt="${encarte.nome} "></a>    
                <h3>${encarte.nome}</h3>
               
            </div>
        `).join('');
        telaEncarte.innerHTML = html;
        
    }
    catch(error){
        console.error('Erro ao buscar dados da API:', error);
    }
 
     
             
}




MostrarEncartes()











