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
                console.log(context.actor.destiny);

                // get available Destinies
                if (!CONFIG.FELLOWSHIP.destinies.length) await utils.getDestinies();
			    context.destinies = CONFIG.FELLOWSHIP.destinies
                    .map((d) => {
                        return { name: d.name, uuid: d.uuid };
                    });
            }
			return context;
		}

        /** @override */
        activateListeners(html) {
            super.activateListeners(html);
            // Set Destiny
            html.find(".char-destiny").on("change", this._onDestinyChanged.bind(this))
            // View Destiny.
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

        async _onDestinyChanged(event) {
            event.preventDefault();
            const currentDestiny = this.actor.system.currentDestinyUuid;
            const selectedDestinyUuid = event.target.value;

            if (currentDestiny) {
                const deleted = await this.actor.items.find((i) => i.type === "fellowship-pbta.destiny")?.delete();
                if (!deleted) {
                    event.target.value = currentDestiny.uuid;
                    event.stopPropagation();
                    return;
                }
            }

            if (selectedDestinyUuid) {
                await this.actor.createEmbeddedDocuments("Item", [await fromUuid(selectedDestinyUuid)], { keepId: true, originalUuid: selectedDestinyUuid });
            };
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