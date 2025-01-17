/**
 * A data model for the Stat item
 */
export class StatModel extends foundry.abstract.TypeDataModel {
	/**
	 * @returns {any} the schema for the StatModel
	 */
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			damaged: new fields.BooleanField({ required: true, initial: false }),
			description: new fields.HTMLField({ required: true, blank: true }),
		};
	}
}
