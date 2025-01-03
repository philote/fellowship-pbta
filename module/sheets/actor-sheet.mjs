export function FellowshipActorSheetMixin(Base) {
    return class FellowshipActorSheet extends Base {

        /** @override */
		get template() {
			return 'modules/fellowship-pbta/templates/actor-sheet.hbs';
		}
        
        /** @override */
		async getData() {
			const context = await super.getData();
            console.log("FellowshipActorSheetMixin getData", context);
            if (this.actor.baseType === 'character') {
                // Prepare Companions Items
                context.actor.companions = context.actor.items.filter((i) => i.type === 'fellowship-pbta.companion');
                // Prepare Destiny Item
                context.actor.destiny = context.actor.items.filter((i) => i.type === 'fellowship-pbta.destiny');
            }
			return context;
		}

        /**
         * Added in handling creating a new Owned Companion Items
         *
         * @param {Event} event The originating click event
         * @override
         */
        async _onItemCreate(event) {
            console.log("FellowshipActorSheetMixin _onItemCreate", event);
            event.preventDefault();
            const clickedElement = event.currentTarget;
            const type = clickedElement.dataset.type;
            if (type == 'fellowship-pbta.companion') {
                const itemData = {
                    name: CONFIG.Item.documentClass.defaultName({ type, parent: this.actor }),
                    type: type,
                };
                await this.actor.createEmbeddedDocuments('Item', [itemData], { renderSheet: true });
            } else if (type == 'fellowship-pbta.destiny') {

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
            } else await super._onItemCreate(event);
        }
    }
}