import * as utils from "../helpers/utils.mjs";

export function FellowshipActorSheetMixin(Base) {
    return class FellowshipActorSheet extends Base {
        /** @override */
		static get defaultOptions() {
			return foundry.utils.mergeObject(super.defaultOptions, {
				classes: ["pbta", "sheet", "actor", "character"],
				width: 750,
				height: 750,
			});
		}

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
            // Companions
            html.find(".companion-update").on("click", this._onCompanionUpdate.bind(this))
            // Destiny
            html.find(".add-destiny").on("click", this._onAddDestiny.bind(this))
            html.find(".delete-destiny").on("click", this._onDeleteDestiny.bind(this))
            html.find(".view-destiny.active").on("click", this._onViewDestiny.bind(this));
        }

        async _onCompanionUpdate(event) {
            event.preventDefault();
            const itemId = $(event.currentTarget).parents('.item').attr('data-item-id');
            const action = event.target.dataset.action;
            const item = this.actor.items.get(itemId);

            switch(action) {
                case "despair": {
                    await item.update({ 'system.inDespair': !item.system.inDespair });
                    break;
                }
                case "stat": {
                    const stat = event.target.dataset.stat;
                    item.system.stats[stat].damaged = !item.system.stats[stat].damaged
                    await item.update({ [`system.stats`]: item.system.stats });
                    break;
                }
              }
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
                window: { 
                    title: game.i18n.localize("FELLOWSHIP.CharacterSheets.destiny.prompt.title"),
                    resizable: true
                },
                content: content,
                ok: {
                    callback: (event, button) => {
                        const output = Array.from(button.form.elements).reduce((obj, input) => {
                            if (input.name) obj[input.name] = input.value;
                            return obj;
                          }, {});
                        return output.uuid;
                    }
                },
                position: { width: 400 },
                rejectClose: false
              })
            if (selection) {
                await this.actor.createEmbeddedDocuments("Item", [await fromUuid(selection)], { keepId: true, originalUuid: selection });
            }
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