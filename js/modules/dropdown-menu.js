import outsideClick from './outsideclick.js';

export default class DropdownMenu {
	constructor(dropdownMenus, events) {
		this.dropdownMenus = document.querySelectorAll(dropdownMenus);
		this.activeClass = 'active';

		// Define click como argumento padrão de events, caso o usuário não defina
		if (events === undefined) this.events = ['click'];
		else this.events = events;

		this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
	}

	// Ativa o dropdown menu e adiciona a função que observa o click fora dele;
	activeDropdownMenu(event) {
		event.preventDefault();
		// Substituí o THIS (já que agora é uma classe) pelo event.currentTarget.
		const element = event.currentTarget;
		element.classList.add(this.activeClass);
		outsideClick(element, this.events, () => {
			element.classList.remove(this.activeClass);
		});
	}

	// Adiciona os eventos ao dropdown menus
	addDropdownMenusEvent() {
		this.dropdownMenus.forEach((menu) => {
			this.events.forEach((userEvent) => {
				menu.addEventListener(userEvent, this.activeDropdownMenu);
			});
		});
	}

	init() {
		if (this.dropdownMenus.length) {
			this.addDropdownMenusEvent();
		}
		return this;
	}
}
