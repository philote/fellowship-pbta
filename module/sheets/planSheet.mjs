/**
 * Extend the ItemSheet to implement a Plan sheet
 *
 * @augments {ItemSheet}
 */
export class PlanSheet extends ItemSheet {
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
		return "modules/fellowship-pbta/templates/plan-sheet.hbs";
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
			toDestroy: this.item.system.toDestroy,
			notes: this.item.system.notes,
		};

		// Handle rich text fields.
		const enrichmentOptions = {
			async: true,
			secrets: this.item.isOwner,
			rollData: this.item?.getRollData() ?? {},
			relativeTo: this.item,
		};
	  
		if (context.system?.toDestroy) {
			context.enriched.toDestroy = await TextEditor.enrichHTML(context.system.toDestroy, enrichmentOptions);
		}

		if (context.system?.notes) {
			context.enriched.notes = await TextEditor.enrichHTML(context.system.notes, enrichmentOptions);
		}
		
		return context;
	}
	
	/** @override */
	async activateListeners(html) {
		super.activateListeners(html);
	}
}
