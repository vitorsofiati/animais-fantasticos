export default function initAnimaNumeros() {
	function animaNumeros() {
		const numeros = document.querySelectorAll("[data-numero]");

		numeros.forEach((numero) => {
			const total = +numero.innerText;
			const inscremento = Math.floor(total / 100);
			let start = 0;
			const timer = setInterval(() => {
				start += inscremento;
				numero.innerText = start;
				if (start > total) {
					numero.innerText = total;
					clearInterval(timer);
				}
			}, 25 * Math.random());
		});
	}

	const observer = new MutationObserver(handleMutation);

	function handleMutation(mutation) {
		if (mutation[0].target.classList.contains("ativo")) {
			observer.disconnect();
			animaNumeros();
		}
	}

	const observerTarget = document.querySelector(".numeros");

	observer.observe(observerTarget, { attributes: true });
}
