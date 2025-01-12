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

                // get available Destinies
                if (!CONFIG.FELLOWSHIP.destinies.length) await utils.getDestinies();
			    // context.destinies = CONFIG.FELLOWSHIP.destinies
            }
			return context;
		}

        /** @override */
        activateListeners(html) {
            super.activateListeners(html);
            // Destiny
            html.find(".add-destiny").on("click", this._onAddDestiny.bind(this))
            html.find(".delete-destiny").on("click", this._onDeleteDestiny.bind(this))
            // Destiny.
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

        async _onDeleteDestiny(event) {
            event.preventDefault();
            this.actor.items.find((i) => i.type === "fellowship-pbta.destiny")?.deleteDialog();
        }

        async _onAddDestiny(event) {
            event.preventDefault();
            const dialogContext = {
                destinies: CONFIG.FELLOWSHIP.destinies,
                uuid: 0
            };
            const content = await renderTemplate("modules/fellowship-pbta/templates/dialog-destiny.hbs", dialogContext);

            const selection = await foundry.applications.api.DialogV2.prompt({
                window: { title: "Proceed" },
                content: content,
                ok: {
                    callback: (event, button) => {
                        const output = Array.from(button.form.elements).reduce((obj, input) => {
                            if (input.name) obj[input.name] = input.value;
                            return obj;
                          }, {});
                        return output;
                    }
                }
              })

            const selectedDestinyUuid = selection.uuid;
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