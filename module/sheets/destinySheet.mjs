/**
 * Extend the ItemSheet to implement a Destiny sheet
 *
 * @augments {ItemSheet}
 */
export class DestinySheet extends ItemSheet {
	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["pbta", "sheet", "item"],
			width: 450,
			height: 375,
		});
	}

	/** @override */
	get template() {
		return "modules/fellowship-pbta/templates/destiny-sheet.hbs";
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
		html.find("[data-destiny-action]").click(this._destinyAction.bind(this));
	}

	async _destinyAction(event) {
		event.preventDefault();
		// const clickedElement = $(event.currentTarget);
		// const action = clickedElement.data().destinyAction;
		// const id = clickedElement.data().destinyId;
		// const stats = this.object.system.stats;

		// switch (action) {
		// 	case "add":
		// 		stats.push({
		// 			name: "New Stat",
		// 			damaged: false,
		// 		});
		// 		break;
		// 	case "delete":
		// 		stats.splice(id, 1);
		// 		break;
		// }

		// await this.object.update({ ["system.stats"]: stats });
	}
}
