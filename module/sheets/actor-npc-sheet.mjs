import * as utils from "../helpers/utils.mjs";
/**
 * Allows the FellowshipActorNpcSheet to be extended in the Hooks
 *
 * @param {game.pbta.applications.actor.PbtaActorNpcSheet} Base
 * @returns {FellowshipActorNpcSheet} the FellowshipActorNpcSheet class that need extending
 */
export function FellowshipActorNpcSheetMixin(Base) {
	/**
	 * Extend the basic PbtaActorNpcSheet with some modifications
	 *
	 * @param {game.pbta.applications.actor.PbtaActorNpcSheet} Base
	 */
	return class FellowshipActorNpcSheet extends Base {
		/** @override */
		static get defaultOptions() {
			return foundry.utils.mergeObject(super.defaultOptions, {
				classes: ["pbta", "sheet", "actor", "npc"],
				width: 650,
				height: 650,
			});
		}

		/** @override */
		get template() {
			return "modules/fellowship-pbta/templates/actor-npc-sheet.hbs";
		}

    /** @override */
		async getData() {
			const context = await super.getData();
      if (this.actor.baseType === 'npc') {
        // Prepare Companions Items
        context.actor.stats = context.actor.items.filter((i) => i.type === 'fellowship-pbta.stat');
        // get available Types & Subtypes
        if (!CONFIG.FELLOWSHIP.threats.length) await utils.getThreatTypes();
        context.actor.threatTypes = [ ...CONFIG.FELLOWSHIP.threats.keys() ];
        // setup subtypes
        context.actor.threatSubtypes = [];
        if (context.actor.system.attributes.threatType.value) {
          const subtypes = CONFIG.FELLOWSHIP.threats.get(context.actor.system.attributes.threatType.value)
          context.actor.threatSubtypes = subtypes;
        }

        // Enrich text fields.
        for (let item of context.actor.stats) {
          const sourceItem = this.actor.items.get(item._id) ?? {};
          const enrichmentOptions = {
            secrets: this.actor.isOwner,
            rollData: sourceItem?.getRollData() ?? {},
            relativeTo: sourceItem
          };

          if (item.system?.description) {
            item.system.description =
              await TextEditor.enrichHTML(item.system.description, enrichmentOptions);
          }
        }
      }
			return context;
		}

		/** @override */
		activateListeners(html) {
			super.activateListeners(html);
      html.find(".stat-update").on("click", this._onStatUpdate.bind(this))
		}

    async _onStatUpdate(event) {
      event.preventDefault();
      const itemId = $(event.currentTarget).parents('.item').attr('data-item-id');
      const action = event.target.dataset.action;
      const item = this.actor.items.get(itemId);

      switch(action) {
          case "damaged": {
              await item.update({ 'system.damaged': !item.system.damaged });
              break;
          }
        }
  }
	};
}
