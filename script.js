
function sobre(){
	let sobre = document.getElementById('sobre');	
	if(sobre.style.display === 'none'){
		sobre.style.display = 'block';
    }
	else{
        sobre.style.display = 'none';
    }
	
}
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));