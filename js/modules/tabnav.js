export default class TabNav {
	constructor(menu, content) {
		this.tabMenu = document.querySelectorAll(menu);
		this.tabContent = document.querySelectorAll(content);
		this.activeClass = 'ativo';
	}

	// Ativa a tab de acordo com seu index.
	activeTab(index) {
		this.tabContent.forEach((section) => {
			section.classList.remove(this.activeClass);
		});
		// Pega o data-anime e atribui a direcao
		const direcao = this.tabContent[index].dataset.anime;
		this.tabContent[index].classList.add(this.activeClass, direcao);
	}
	// Adiciona os eventos nas tabs.
	addTabNavEvent() {
		this.tabMenu.forEach((itemMenu, index) => {
			itemMenu.addEventListener('click', () => this.activeTab(index));
		});
	}

	init() {
		if (this.tabMenu.length && this.tabContent.length) {
			// Ativar primeiro item
			this.activeTab(0);
			this.addTabNavEvent();
		}
	}
}
