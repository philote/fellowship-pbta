/**
 * A data model for the Plan item
 */
export class PlanModel extends foundry.abstract.TypeDataModel {
	/**
	 * @returns {any} the schema for the PlanModel
	 */
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			toDestroy: new fields.HTMLField({ required: true, blank: true }),
			create: new fields.BooleanField({ required: true, initial: true }),
			begin: new fields.BooleanField({ required: true, initial: false }),
			execute: new fields.BooleanField({ required: true, initial: false }),
			victory: new fields.BooleanField({ required: true, initial: false }),
			notes: new fields.HTMLField({ required: true, blank: true }),
		};
	}
}
