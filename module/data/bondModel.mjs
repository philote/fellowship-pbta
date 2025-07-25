/**
 * A data model for the Bond item
 */
export class BondModel extends foundry.abstract.TypeDataModel {
    /**
     * @returns {any} the schema for the BondModel
     */
    static defineSchema() {
      const fields = foundry.data.fields;
      return {
        bonds: new fields.ArrayField(
          new fields.SchemaField({
            connection: new fields.StringField({ required: true, blank: true }),
            used: new fields.BooleanField({ required: true, initial: false }),
          }),
          { 
            initial: [], 
            min: 0, 
            max: 3,
          },
        ),
      };
    }
  }