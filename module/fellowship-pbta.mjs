import * as pbtaConfig from "./helpers/pbta-config.mjs";
import * as utils from "./helpers/utils.mjs";
import { FELLOWSHIP } from "./helpers/config.mjs";
import { CompanionModel } from "./data/companionModel.mjs";
import { CompanionSheet } from "./sheets/companionSheet.mjs";
import { DestinyModel } from "./data/destinyModel.mjs";
import { DestinySheet } from "./sheets/destinySheet.mjs";
import { FellowshipActorSheetMixin } from "./sheets/actor-sheet.mjs";
import { CharacterModel } from "./data/characterModel.mjs";
import { StatModel } from "./data/statModel.mjs";
import { StatSheet } from "./sheets/statSheet.mjs";
import { FellowshipActorNpcSheetMixin } from "./sheets/actor-npc-sheet.mjs";

Hooks.once("init", () => {

	// Custom NPC Sheet Setup
	const fellowshipActorNpcSheet = FellowshipActorNpcSheetMixin(game.pbta.applications.actor.PbtaActorSheet);
	Actors.unregisterSheet('pbta', game.pbta.applications.actor.PbtaActorNpcSheet, { types: ['npc'] });
	Actors.registerSheet('pbta', fellowshipActorNpcSheet, {
		types: ['npc'],
		makeDefault: true,
		label: 'FELLOWSHIP.SheetConfig.npc',
	});

	// Fellowship ActorSheet Setup
	CONFIG.Actor.dataModels.character = CharacterModel;
	const fellowshipActorSheet = FellowshipActorSheetMixin(
		game.pbta.applications.actor.PbtaActorSheet
	);
	Actors.unregisterSheet("pbta", game.pbta.applications.actor.PbtaActorSheet, {
		types: ["character"],
	});
	Actors.registerSheet("pbta", fellowshipActorSheet, {
		types: ["character"],
		makeDefault: true,
		label: "FELLOWSHIP.SheetConfig.character",
	});

	// Companion DataModel & Sheet Setup
	Object.assign(CONFIG.Item.dataModels, {
		"fellowship-pbta.companion": CompanionModel,
	});
	Items.unregisterSheet("pbta", game.pbta.applications.item.PbtaItemSheet, {
		types: ["fellowship-pbta.companion"],
	});
	Items.registerSheet("fellowship-pbta", CompanionSheet, {
		types: ["fellowship-pbta.companion"],
		makeDefault: true,
		label: "FELLOWSHIP.SheetConfig.companion",	
	});

	// Destiny DataModel & Sheet Setup
	Object.assign(CONFIG.Item.dataModels, {
		"fellowship-pbta.destiny": DestinyModel,
	});
	Items.unregisterSheet("pbta", game.pbta.applications.item.PbtaItemSheet, {
		types: ["fellowship-pbta.destiny"],
	});
	Items.registerSheet("fellowship-pbta", DestinySheet, {
		types: ["fellowship-pbta.destiny"],
		makeDefault: true,
		label: "FELLOWSHIP.SheetConfig.destiny",
	});

	// Stat DataModel & Sheet Setup
	Object.assign(CONFIG.Item.dataModels, {
		"fellowship-pbta.stat": StatModel,
	});
	Items.unregisterSheet("pbta", game.pbta.applications.item.PbtaItemSheet, {
		types: ["fellowship-pbta.stat"],
	});
	Items.registerSheet("fellowship-pbta", StatSheet, {
		types: ["fellowship-pbta.stat"],
		makeDefault: true,
		label: "FELLOWSHIP.SheetConfig.stat",
	});

	// Register settings
	game.settings.register("fellowship-pbta", "firstTime", {
		name: game.i18n.localize("FELLOWSHIP.Settings.startup.name"),
		scope: "world",
		config: false,
		type: Boolean,
		default: true,
	});

	game.settings.register("fellowship-pbta", "enableLoginImg", {
		name: game.i18n.localize("FELLOWSHIP.Settings.img.name"),
		hint: game.i18n.localize("FELLOWSHIP.Settings.img.hint"),
		scope: "world",
		config: true,
		type: Boolean,
		default: false,
	});

	// Preload Handlebars stuff.
	utils.preloadHandlebarsTemplates();

	CONFIG.FELLOWSHIP = FELLOWSHIP;
});

// PbtA configuration hook
Hooks.once("pbtaSheetConfig", () => {
	// https://github.com/asacolips-projects/pbta?tab=readme-ov-file#overriding-sheet-config-in-a-module
	// Disable the PbtA sheet config form.
	if (game.settings.settings.get("pbta.sheetConfigOverride"))
		game.settings.set("pbta", "sheetConfigOverride", true);

	// Replace the game.pbta.sheetConfig with this module's version.
	pbtaConfig.configSheet();

	// PBTA Settings
	pbtaConfig.pbtaSettings();

	// Defines custom PbtA system tags.
	game.pbta.tagConfigOverride = pbtaConfig.tagConfig;
});

Hooks.once("ready", async function () {
	utils.getThreatTypes();
	// Get destinies in world and compendium, with code so Babele works
	if (!(game.modules.get("babele")?.active && game.i18n.lang !== "en")) {
		utils.getDestinies();
	}

	// This allows the module to set a custom image to the login screen
	if (!game.user.isGM) return;
	if (game.settings.get("fellowship-pbta", "firstTime")) {
		game.settings.set("fellowship-pbta", "firstTime", false);

		const callback = async () => {
			game.settings.set("fellowship-pbta", "enableLoginImg", true);
			const worldData = {
				id: game.world.id,
				action: "editWorld",
				background: `modules/fellowship-pbta/assets/cover.webp`,
			};
			let response;
			try {
				response = await foundry.utils.fetchJsonWithTimeout(
					foundry.utils.getRoute("setup"),
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(worldData),
					}
				);
				if (response.error) {
					ui.notifications.error(response.error);
				} else if (!response) {
					game.world.updateSource(response);
				}
			} catch (e) {
				return ui.notifications.error(e);
			}
		};

		foundry.applications.api.DialogV2.confirm({
			window: {
				title: game.i18n.localize("FELLOWSHIP.Settings.startup.dialog.title"),
			},
			content: game.i18n.localize("FELLOWSHIP.Settings.startup.dialog.content"),
			rejectClose: false,
			modal: true,
			yes: { callback: callback },
		});
	} else {
		if (game.settings.get("fellowship-pbta", "enableLoginImg")) {
			const worldData = {
				id: game.world.id,
				action: "editWorld",
				background: `modules/fellowship-pbta/assets/cover.webp`,
			};
			let response;
			try {
				response = await foundry.utils.fetchJsonWithTimeout(
					foundry.utils.getRoute("setup"),
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(worldData),
					}
				);
				if (response.error) {
					ui.notifications.error(response.error);
				} else if (!response) {
					game.world.updateSource(response);
				}
			} catch (e) {
				return ui.notifications.error(e);
			}
		}
	}
});

Hooks.on("renderActorSheet", async (app, html) => {
	// Character sheet customization
	if (app.actor.type === "character") {
		// Hide and show each stat based on playbook attributes
		const playbook = app.actor.items.find((i) => i.type === "playbook");
		if (playbook == undefined) {
			// Initially hide iron and doom stats
			const iron = html[0].querySelector('li.stat[data-stat="iron"]');
			const doom = html[0].querySelector('li.stat[data-stat="doom"]');
			if (iron) iron.classList.toggle("hidden", true);
			if (doom) doom.classList.toggle("hidden", true);
		} else {
			Object.values(
				playbook.system.attributes.statsVisibility.choices[0].options
			).forEach((option) => {
				const statElement = html[0].querySelector(
					`li.stat[data-stat="${option.label}"]`
				);
				if (statElement) {
					statElement.classList.toggle("hidden", !option.value);
				}
			});
		}
	}
});

Hooks.once("babele.ready", () => {
	// It is a mystery why Babele calls "babele.ready" twice
	Hooks.once("babele.ready", () => utils.getDestinies());
});

Hooks.on("renderSettings", (app, html) => {
    const header = document.createElement("h2");
    header.innerText = game.i18n.localize('FELLOWSHIP.Settings.game.heading');

    const pbtaSettings = document.createElement("div");
    html.find("#settings-game")?.after(header, pbtaSettings);

    const buttons = [
        {
            action: (ev) => {
                ev.preventDefault();
                window.open("https://liberigothica.itch.io/", "_blank");
            },
            iconClasses: ["fa-solid", "fa-book"],
            label: game.i18n.localize('FELLOWSHIP.Settings.game.publisher.title')
        },
        {
            action: (ev) => {
                ev.preventDefault();
                window.open("https://github.com/philote/fellowship-pbta", "_blank");
            },
            iconClasses: ["fab", "fa-github"],
            label: game.i18n.localize(`FELLOWSHIP.Settings.game.github.title`)
        },
        {
            action: (ev) => {
                ev.preventDefault();
                window.open("https://ko-fi.com/ephson", "_blank");
            },
            iconClasses: ["fa-solid", "fa-mug-hot"],
            label: game.i18n.localize("FELLOWSHIP.Settings.game.kofi.title")
        },
    ].map(({ action, iconClasses, label }) => {
        const button = document.createElement("button");
        button.type = "button";

        const icon = document.createElement("i");
        icon.classList.add(...iconClasses);

        button.append(icon, game.i18n.localize(label));

        button.addEventListener("click", action);

        return button;
    });

    pbtaSettings.append(...buttons);
});
