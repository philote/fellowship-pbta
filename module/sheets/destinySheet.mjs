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
			width: 500,
			height: 550,
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

		context.enriched = {
			description: this.item.system.description,
		};

		// Handle rich text fields.
		const enrichmentOptions = {
			async: true,
			secrets: this.item.isOwner,
			rollData: this.item?.getRollData() ?? {},
			relativeTo: this.item,
		};
	  
		if (context.system?.description) {
			context.enriched.description = await TextEditor.enrichHTML(context.system.description, enrichmentOptions);
		}

		return context;
	}

	/** @override */
	async activateListeners(html) {
		super.activateListeners(html);
		html.find("[data-destiny-action]").click(this._destinyAction.bind(this));
	}

	async _destinyAction(event) {
		event.preventDefault();
		const clickedElement = $(event.currentTarget);
		const action = clickedElement.data().destinyAction;
		const id = clickedElement.data().destinyId;
		const advancements = this.object.system.advancements;

		switch (action) {
			case "add":
				advancements.push({
					name: game.i18n.localize("FELLOWSHIP.DestinySheet.advancement.default"),
					damaged: false,
				});
				break;
			case "delete":
				advancements.splice(id, 1);
				break;
		}

		await this.object.update({ ["system.advancements"]: advancements });
	}
}
