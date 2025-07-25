/**
 * Extend the ItemSheet to implement a Bond sheet
 *
 * @augments {ItemSheet}
 */
export class BondSheet extends ItemSheet {
	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["pbta", "sheet", "item"],
			width: 450,
			height: 450,
		});
	}

	/** @override */
	get template() {
		return "modules/fellowship-pbta/templates/bond-sheet.hbs";
	}

	/** @override */
	async getData() {
		// Retrieve base data structure.
		const context = super.getData();

		// Use a safe clone of the item data for further operations.
		const itemData = context.item;

		// Add the items's data to context.data for easier access, as well as flags.
		context.system = itemData.system;

		return context;
	}

	/** @override */
	async activateListeners(html) {
		super.activateListeners(html);
		html.find('[data-bond-action]').click(this._bondAction.bind(this));
	}

	/**
	 * Tack a click event off the bond sheet and figure out which action to execute.
	 *
	 * @param {object} event The event that triggered the action.
	 */
	async _bondAction(event) {
		event.preventDefault();
		const clickedElement = $(event.currentTarget);
		const action = clickedElement.data().bondAction;
		const id = clickedElement.data().bondId;
		const bonds = this.object.system.bonds;

		switch (action) {
			case "add":
				bonds.push(" ");
				break;
			case "delete":
				bonds.splice(id, 1);
				break;
		}

		await this.object.update({ ["system.bonds"]: bonds });
	}
}
