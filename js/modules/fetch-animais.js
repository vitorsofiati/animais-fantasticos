import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
	const numerosGrid = document.querySelector(target);

	// cria a div com o total de animais
	function createAnimal(animal) {
		const div = document.createElement('div');
		div.classList.add('numero-animal');
		div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
		return div;
	}

	// executa createAnimal e insere no DOM
	function preencherAnimais(animal) {
		const divAnimal = createAnimal(animal);
		numerosGrid.appendChild(divAnimal);
	}

	function animaAnimaisNumeros() {
		const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
		animaNumeros.init();
	}

	// Puxa os animais através de um arquivo json e cria cada animal usando createAnimal
	async function criarAnimais() {
		try {
			// fetch espera a resposta e transforma em JSON
			const animaisResponse = await fetch(url);
			const animaisJSON = await animaisResponse.json();

			// Preencher e animar estão aqui dentro pois a função é assíncrona, são ativadas só após a transformação do JSON
			animaisJSON.forEach((animal) => preencherAnimais(animal));
			animaAnimaisNumeros();
		} catch (erro) {
			console.log(erro);
		}
	}

	return criarAnimais();
}
