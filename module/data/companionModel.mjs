/**
 * A data model for the Companion item
 */
export class CompanionModel extends foundry.abstract.TypeDataModel {
    /**
     * @returns {any} the schema for the CompanionModel
     */
    static defineSchema() {
      const fields = foundry.data.fields;
      return {
        typeName: new fields.StringField({ required: true, blank: true }),
        typeDescription: new fields.StringField({ required: true, blank: true }),
        inDespair: new fields.BooleanField({ required: true, initial: false }),
        stats: new fields.ArrayField(new fields.SchemaField({
          name: new fields.StringField({ required: true, blank: true }),
          damaged: new fields.BooleanField({ required: true, initial: false }),
        })),
      };
    }
  }