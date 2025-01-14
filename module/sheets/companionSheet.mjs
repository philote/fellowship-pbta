/**
 * Extend the ItemSheet to implement a Companion sheet
 *
 * @augments {ItemSheet}
 */
export class CompanionSheet extends ItemSheet {
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
		return "modules/fellowship-pbta/templates/companion-sheet.hbs";
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
		html.find("[data-companion-action]").click(this._companionAction.bind(this));
	}

	async _companionAction(event) {
		event.preventDefault();
		const clickedElement = $(event.currentTarget);
		const action = clickedElement.data().companionAction;
		const id = clickedElement.data().companionId;
		const stats = this.object.system.stats;

		switch (action) {
			case "add":
				stats.push({
					name: game.i18n.localize("FELLOWSHIP.CompanionSheet.default"),
					damaged: false,
				});
				break;
			case "delete":
				stats.splice(id, 1);
				break;
		}

		await this.object.update({ ["system.stats"]: stats });
	}
}
