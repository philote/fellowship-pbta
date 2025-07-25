/**
 * Allows the FellowshipItem to be extended in the Hooks
 *
 * @param {game.pbta.documents.ItemPbta} Base
 * @returns {FellowshipItem}
 */
export function FellowshipItemMixin(Base) {
  return class FellowshipItem extends Base {
    static getDefaultArtwork(itemData) {
      const iconsPath = 'modules/fellowship-pbta/assets/icons/';
      switch (itemData.type) {
        case 'fellowship-pbta.bond':
          return { img: `${iconsPath}chained-heart.svg` };
        case 'fellowship-pbta.destiny':
          return { img: `${iconsPath}scales.svg` };
        case 'fellowship-pbta.companion':
          return { img: `${iconsPath}discussion.svg` };
        default:
          return Base.getDefaultArtwork(itemData);
      }
    }
  };
}
