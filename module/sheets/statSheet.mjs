/**
 * Extend the ItemSheet to implement a Stat sheet
 *
 * @augments {ItemSheet}
 */
export class StatSheet extends ItemSheet {
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
		return "modules/fellowship-pbta/templates/stat-sheet.hbs";
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
	}
}
