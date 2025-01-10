/**
 * A data model for the Fellowship Character item
 */
export class CharacterModel extends pbta.dataModels.CharacterData {
  /**
   * @returns {any} the schema for the CharacterModel
   */
  static defineSchema() {
    const superFields = super.defineSchema();
    const fields = foundry.data.fields;
    return {
      ...superFields,
      currentDestinyUuid: new fields.DocumentUUIDField({ type: "Item", nullable: true }),
    };
  }
}
