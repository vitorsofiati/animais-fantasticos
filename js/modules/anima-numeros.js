export default class AnimaNumeros {
	constructor(numeros, observerTarget, observerClass) {
		this.numeros = document.querySelectorAll(numeros);
		this.observerTarget = document.querySelector(observerTarget);
		this.observerClass = observerClass;

		// Bind do this do objeto ao callback da mutação.
		this.handleMutation = this.handleMutation.bind(this);
	}

	// Estática pois não precisa de nenhum elemento do objeto, mas fica apenas no construtor da classe.
	static incrementarNumero(numero) {
		const total = +numero.innerText;
		const incremento = Math.floor(total / 100);
		let start = 0;
		const timer = setInterval(() => {
			start += incremento;
			numero.innerText = start;
			if (start > total) {
				// Como estou trabalhando com múltiplos, o valor de start vai passar, então voltamos com o valor de 'total'.
				numero.innerText = total;
				clearInterval(timer);
			}
		}, 25 * Math.random());
	}

	animaNumeros() {
		this.numeros.forEach((numero) =>
			this.constructor.incrementarNumero(numero)
		);
	}

	// é ativada quando a mutação ocorrer e desconecta o observador
	handleMutation(mutation) {
		if (mutation[0].target.classList.contains(this.observerClass)) {
			this.observer.disconnect();
			this.animaNumeros();
		}
	}

	// Adiciona o MutationObserver para verificar quando a classe ativo é adicionada ao elemento target.
	addMutationObserver() {
		this.observer = new MutationObserver(this.handleMutation);
		this.observer.observe(this.observerTarget, { attributes: true });
	}

	init() {
		// Evitar bugs caso os parâmetros passados não 'existam'
		if (this.numeros.length && this.observerTarget) {
			this.addMutationObserver();
		}
		return this;
	}
}
