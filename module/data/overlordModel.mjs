/**
 * A data model for the Fellowship Overlord actor
 */
export class OverlordModel extends pbta.dataModels.NpcData {
    /**
     * @returns {any} the schema for the OverlordModel
     */
    static defineSchema() {
      const superFields = super.defineSchema();
      const fields = foundry.data.fields;
      return {
        ...superFields,
        customType: new fields.StringField({ initial: 'fellowship-pbta.overlord' }),
      };
    }
  }
  