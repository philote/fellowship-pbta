/**
 * A data model for the Destiny item
 */
export class DestinyModel extends foundry.abstract.TypeDataModel {
    /**
     * @returns {any} the schema for the DestinyModel
     */
    static defineSchema() {
      const fields = foundry.data.fields;
      return {
        description: new fields.HTMLField({ required: true, blank: true }),
        // Advancement
        advancements: new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({ required: true, blank: true }),
            used: new fields.BooleanField({ required: true, initial: false }),
        })),
        // Moves
        // moves: new fields.ArrayField(new fields.ObjectField()),
        // Stats
        // newStats: new fields.ArrayField(new fields.SchemaField({
        //     name: new fields.StringField({ required: true, blank: true }),
        //     value: new fields.NumberField({ required: true, initial: 0 }),
        // })),
      };
    }
  }