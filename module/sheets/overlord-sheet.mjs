/**
 * Allows the OverlordSheet to be extended in the Hooks
 *
 * @param {game.pbta.applications.actor.PbtaActorSheet} Base
 * @returns {OverlordSheet} the OverlordSheet class that need extending
 */
export function OverlordSheetMixin(Base) {
	/**
	 * Extend the basic PbtaActorSheet with some very simple modifications
	 *
	 * @param {game.pbta.applications.actor.PbtaActorNpcSheet} Base
	 */
	return class OverlordSheet extends Base {
		/** @override */
		static get defaultOptions() {
			return foundry.utils.mergeObject(super.defaultOptions, {
				classes: ["pbta", "sheet", "actor", "npc"],
				width: 750,
				height: 750,
				tabs: [
					{
						navSelector: ".sheet-tabs",
						contentSelector: ".sheet-body",
						initial: "description",
					},
				],
			});
		}

		/** @override */
		get template() {
			return "modules/fellowship-pbta/templates/actor-overlord-sheet.hbs";
		}

		/** @override */
		async getData() {
			const context = await super.getData();
			// Prepare Stat Items
			context.actor.stats = context.actor.items.filter(
				(i) => i.type === "fellowship-pbta.stat"
			);
			context.actor.plans = context.actor.items.filter(
				(i) => i.type === "fellowship-pbta.plan"
			);
			// Enrich Stat text fields.
			for (let item of context.actor.stats) {
				item.isExpanded = this._expanded.has(item.id);
				const sourceItem = this.actor.items.get(item._id) ?? {};
				const enrichmentOptions = {
					secrets: this.actor.isOwner,
					rollData: sourceItem?.getRollData() ?? {},
					relativeTo: sourceItem,
				};

				if (item.system?.description) {
					item.system.description = await TextEditor.enrichHTML(
						item.system.description,
						enrichmentOptions
					);
				}
			}

			// Third Agenda & Extra Cut
			context.actor.agendaOptions = [
				{
					key: 0,
					label: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.0.label"
					),
					description: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.0.description"
					),
					extraCut: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.0.extraCut"
					),
				},
				{
					key: 1,
					label: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.1.label"
					),
					description: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.1.description"
					),
					extraCut: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.1.extraCut"
					),
				},
				{
					key: 2,
					label: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.2.label"
					),
					description: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.2.description"
					),
					extraCut: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.thirdAgenda.agendaOptions.2.extraCut"
					),
				},
			];

			context.actor.agenda = {};
			if (context.actor.system.attributes.thirdAgenda.value[1]) {
				const currentAgenda = context.actor.agendaOptions.find(
					(agenda) =>
						agenda.key ===
						Number(context.actor.system.attributes.thirdAgenda.value[1])
				);

				context.actor.agenda.extraCut = currentAgenda?.extraCut ?? "";
				context.actor.agenda.description = currentAgenda.description ?? "";
			}

			// Secret Reason
			context.actor.secretReasonOptions = {
				0: game.i18n.localize(
					"FELLOWSHIP.OverlordSheet.attr.secretReason.options.0.label"
				),
				1: game.i18n.localize(
					"FELLOWSHIP.OverlordSheet.attr.secretReason.options.1.label"
				),
				2: game.i18n.localize(
					"FELLOWSHIP.OverlordSheet.attr.secretReason.options.2.label"
				),
				3: game.i18n.localize(
					"FELLOWSHIP.OverlordSheet.attr.secretReason.options.3.label"
				),
			};

			context.actor.armyOptions = [
				{
					key: "horde",
					label: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.horde.label"
					),
					description: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.horde.description"
					),
				},
				{
					key: "organization",
					label: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.organization.label"
					),
					description: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.organization.description"
					),
				},
				{
					key: "scourge",
					label: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.scourge.label"
					),
					description: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.scourge.description"
					),
				},
				{
					key: "titans",
					label: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.titans.label"
					),
					description: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.army.options.titans.description"
					),
				},
			];
			context.actor.currentArmyDetail = "";
			if (context.actor.system.attributes.army.value) {
				const currentArmy = context.actor.armyOptions.find(
					(army) =>
						army.key === context.actor.system.attributes.army.value
				);

				context.actor.currentArmyDetail = currentArmy.description ?? "";
			}
			console.log(context.actor.items);
			return context;
		}

		/** @override */
		activateListeners(html) {
			super.activateListeners(html);
			html.find(".item-label2").on("click", this._showItemDetails.bind(this));
			html.find(".stat-update").on("click", this._onStatUpdate.bind(this));
			html.find(".open-journal").on("click", this._openJournal.bind(this));
			html.find(".add-secret").on("click", this._onAddSecret.bind(this));
			html.find(".plan-update").on("click", this._onPlanUpdate.bind(this));
		}

		async _onAddSecret(event) {
			event.preventDefault();
			const dialogContext = {
				options: this.actor.secretReasonOptions,
				key: 0,
			};
			const content = await renderTemplate(
				"modules/fellowship-pbta/templates/dialog-secret-reason.hbs",
				dialogContext
			);

			const selection = await foundry.applications.api.DialogV2.prompt({
				window: {
					title: game.i18n.localize(
						"FELLOWSHIP.OverlordSheet.attr.secretReason.prompt.title"
					),
					resizable: true,
				},
				content: content,
				ok: {
					label: "Close",
					callback: (event, button) => button.form.elements.secretReason.value,
				},
				position: { width: 600 },
				rejectClose: false,
			});

			if (selection) {
				const reason = this.actor.secretReasonOptions[Number(selection)];
				await this.actor.update({ "system.attributes.secretReason.value": reason });
			}
		}

		async _openJournal(event) {
			event.preventDefault();
			const journalUuid = event.target.dataset.journaluuid;
			const pageId = event.target.dataset.pageid;
			try {
				const journalEntry = await fromUuid(journalUuid);
				if (journalEntry) {
					journalEntry.sheet.render(true, { pageId: pageId });
				} else {
					console.error(`Journal with UUID ${journalUuid} not found`);
				}
			} catch (e) {
				console.error(`Error opening the journal: ${e}`);
			}
		}

		/**
		 * IDs for items on the sheet that have been expanded.
		 * @type {Set<string>}
		 * @protected
		 */
		_expanded = new Set();

		async _onStatUpdate(event) {
			event.preventDefault();
			const itemId = $(event.currentTarget).parents(".item").attr("data-item-id");
			const action = event.target.dataset.action;
			const item = this.actor.items.get(itemId);

			switch (action) {
				case "damaged": {
					await item.update({ "system.damaged": !item.system.damaged });
					break;
				}
			}
		}

		async _onPlanUpdate(event) {
			event.preventDefault();
			const itemId = $(event.currentTarget).parents(".item").attr("data-item-id");
			const action = event.target.dataset.action;
			const item = this.actor.items.get(itemId);
			switch (action) {
				case "create": {
					await item.update({ "system.create": !item.system.create });
					break;
				}
				case "begin": {
					await item.update({ "system.begin": !item.system.begin });
					break;
				}
				case "execute": {
					await item.update({ "system.execute": !item.system.execute });
					break;
				}
				case "victory": {
					await item.update({ "system.victory": !item.system.victory });
					break;
				}
			}
		}
	};
}
