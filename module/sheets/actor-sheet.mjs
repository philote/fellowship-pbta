import * as utils from "../helpers/utils.mjs";

export function FellowshipActorSheetMixin(Base) {
    return class FellowshipActorSheet extends Base {

        /** @override */
		get template() {
			return 'modules/fellowship-pbta/templates/actor-sheet.hbs';
		}
        
        /** @override */
		async getData() {
			const context = await super.getData();
            if (this.actor.baseType === 'character') {
                // Prepare Companions Items
                context.actor.companions = context.actor.items.filter((i) => i.type === 'fellowship-pbta.companion');
                // Prepare Destiny Item
                context.actor.destiny = context.actor.items.filter((i) => i.type === 'fellowship-pbta.destiny');
                console.log("context.actor.destiny");
                console.log(context.actor.destiny);
                context.currentDestinyUuid = (context.actor.destiny[0]) ? context.actor.destiny[0].uuid : "";                

                // get available Destinies
                if (!CONFIG.FELLOWSHIP.destinies.length) await utils.getDestinies();
			    context.destinies = CONFIG.FELLOWSHIP.destinies
                    .map((d) => {
                        return { name: d.name, uuid: d.uuid };
                    });
                console.log("context.destinies");
                console.log(context.destinies);
            }
			return context;
		}

        /** @override */
        activateListeners(html) {
            super.activateListeners(html);

            // View Destiny.
            html.find(".char-destiny").on("change", async (event) => {
                const currentDestinyUuid = this.actor.currentDestinyUuid;
                const selectedDestinyUuid = event.target.value;

                if (currentDestinyUuid) {
                    const deleted = await this.actor.items.find((i) => i.type === "fellowship-pbta.destiny")?.delete();
                    if (!deleted) {
                        event.target.value = currentDestinyUuid;
                        event.stopPropagation();
                        return;
                    }
                }
                if (selectedDestinyUuid) await this.actor.createEmbeddedDocuments("Item", [await fromUuid(selectedDestinyUuid)], { keepId: true, originalUuid: selectedDestinyUuid });
            });

            html.find(".view-destiny.active").on("click", this._onViewDestiny.bind(this));
        }

        /**
         * Listen for click events on view Destiny.
         * @param {MouseEvent} event
         */
        async _onViewDestiny(event) {
            event.preventDefault();
            this.actor.items.find((i) => i.type === "fellowship-pbta.destiny")?.sheet.render(true);
        }

        /**
         * Added in handling creating a new Owned Companion Items
         *
         * @param {Event} event The originating click event
         * @override
         */
        async _onItemCreate(event) {
            event.preventDefault();
            const clickedElement = event.currentTarget;
            const type = clickedElement.dataset.type;
            if (type == 'fellowship-pbta.companion') {
                const itemData = {
                    name: CONFIG.Item.documentClass.defaultName({ type, parent: this.actor }),
                    type: type,
                };
                await this.actor.createEmbeddedDocuments('Item', [itemData], { renderSheet: true });
            } else await super._onItemCreate(event);
        }
    }
}
/*
else if (type == 'fellowship-pbta.destiny') {

// const itemExists = this.actor.items.get(item._id);
// itemExists?.delete();
// Delete existing destiny item
const items = await this.actor.getEmbeddedCollection('Item');
console.log("FellowshipActorSheetMixin fellowship-pbta.destiny items", items);
for (const item of items) {
    if (item.type === 'fellowship-pbta.destiny') {
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
    }
}

const itemData = {
    name: CONFIG.Item.documentClass.defaultName({ type, parent: this.actor }),
    type: type,
};
console.log("FellowshipActorSheetMixin _onItemCreate itemData", itemData);
await this.actor.createEmbeddedDocuments('Item', [itemData], { renderSheet: true });
}
*/