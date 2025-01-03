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
        // slug: new foundry.data.fields.StringField({
        //   required: true,
        //   validate: (value) => {
        //     if (value !== value.slugify()) {
        //       return new foundry.data.validation.DataModelValidationFailure({
        //         unresolved: true,
        //         invalidValue: value,
        //         message: `${value} is not a valid slug`
        //       });
        //     }
        //   }
        // }),
        // holds: description, requirements, and initial creation rules
        description: new fields.HTMLField({ required: true, blank: true }),
        // Advancement
        advancements: new fields.ArrayField(new fields.SchemaField({
            advancement: new fields.StringField({ required: true, blank: true }),
            used: new fields.BooleanField({ required: true, initial: false }),
        })),
        // Moves
        moves: new fields.ArrayField(new fields.ObjectField()),
        // Stats
        newStats: new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({ required: true, blank: true }),
            value: new fields.NumberField({ required: true, initial: 0 }),
        })),
      };
    }
  }