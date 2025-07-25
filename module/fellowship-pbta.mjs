import * as pbtaConfig from "./helpers/pbta-config.mjs";
import * as utils from "./helpers/utils.mjs";
import { FELLOWSHIP } from "./helpers/config.mjs";
import { BondModel } from "./data/bondModel.mjs";
import { BondSheet } from "./sheets/bondSheet.mjs";
import { FellowshipItemMixin } from './documents/item.mjs';
import { CompanionModel } from "./data/companionModel.mjs";
import { CompanionSheet } from "./sheets/companionSheet.mjs";
import { DestinyModel } from "./data/destinyModel.mjs";
import { DestinySheet } from "./sheets/destinySheet.mjs";
import { CharacterModel } from "./data/characterModel.mjs";
import { FellowshipActorSheetMixin } from "./sheets/actor-sheet.mjs";
import { StatModel } from "./data/statModel.mjs";
import { StatSheet } from "./sheets/statSheet.mjs";
import { FellowshipActorNpcSheetMixin } from "./sheets/actor-npc-sheet.mjs";
import { OverlordModel } from './data/overlordModel.mjs';
import { OverlordSheetMixin } from "./sheets/overlord-sheet.mjs";
import { PlanModel } from "./data/planModel.mjs";
import { PlanSheet } from "./sheets/planSheet.mjs";

Hooks.once("init", () => {
	CONFIG.FELLOWSHIP = FELLOWSHIP;
	CONFIG.Item.documentClass = FellowshipItemMixin(game.pbta.documents.ItemPbta);

	// Custom NPC Sheet Setup
	const fellowshipActorNpcSheet = FellowshipActorNpcSheetMixin(game.pbta.applications.actor.PbtaActorSheet);
	Actors.unregisterSheet('pbta', game.pbta.applications.actor.PbtaActorNpcSheet, { types: ['npc'] });
	Actors.registerSheet('pbta', fellowshipActorNpcSheet, {
		types: ['npc'],
		makeDefault: true,
		label: 'FELLOWSHIP.SheetConfig.npc',
	});

	// Custom Overlord Sheet Setup
	CONFIG.Actor.dataModels['fellowship-pbta.overlord'] = OverlordModel;
	CONFIG.Actor.typeLabels['fellowship-pbta.overlord'] = 'TYPES.fellowship-pbta.overlord';
	const overlordSheet = OverlordSheetMixin(game.pbta.applications.actor.PbtaActorNpcSheet);
	Actors.registerSheet('fellowship-pbta', overlordSheet, {
	  types: ['fellowship-pbta.overlord'],
	  makeDefault: true,
	  label: 'FELLOWSHIP.SheetConfig.overlord',
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

	// Bond DataModel & Sheet Setup
	Object.assign(CONFIG.Item.dataModels, {
		"fellowship-pbta.bond": BondModel,
	});
	Items.unregisterSheet("pbta", game.pbta.applications.item.PbtaItemSheet, {
		types: ["fellowship-pbta.bond"],
	});
	Items.registerSheet("fellowship-pbta", BondSheet, {
		types: ["fellowship-pbta.bond"],
		makeDefault: true,
		label: "FELLOWSHIP.SheetConfig.bond",	
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

	// Plan DataModel & Sheet Setup
	Object.assign(CONFIG.Item.dataModels, {
		"fellowship-pbta.plan": PlanModel,
	});
	Items.unregisterSheet("pbta", game.pbta.applications.item.PbtaItemSheet, {
		types: ["fellowship-pbta.plan"],
	});
	Items.registerSheet("fellowship-pbta", PlanSheet, {
		types: ["fellowship-pbta.plan"],
		makeDefault: true,
		label: "FELLOWSHIP.SheetConfig.plan",
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
	// --- Setting Module Configuration
    const MODULE_CONFIG = {
        headingKey: "FELLOWSHIP.Settings.game.heading",
        sectionClass: "fellowship-doc",
        buttonsData: [
            {
                action: (ev) => {
                    ev.preventDefault();
                    window.open("https://liberigothica.itch.io/", "_blank");
                },
                iconClasses: ["fa-solid", "fa-book"],
                labelKey: "FELLOWSHIP.Settings.game.publisher.title",
            },
            {
                action: (ev) => {
                    ev.preventDefault();
                    window.open("https://github.com/philote/fellowship-pbta", "_blank");
                },
                iconClasses: ["fab", "fa-github"],
                labelKey: "FELLOWSHIP.Settings.game.github.title",
            },
            {
                action: (ev) => {
                    ev.preventDefault();
                    window.open("https://ko-fi.com/ephson", "_blank");
                },
                iconClasses: ["fa-solid", "fa-mug-hot"],
                labelKey: "FELLOWSHIP.Settings.game.kofi.title",
            },
        ]
    };

	// --- Button Creation Logic 
    const buttons = MODULE_CONFIG.buttonsData.map(({ action, iconClasses, labelKey }) => {
        const button = document.createElement("button");
        button.type = "button";

        const icon = document.createElement("i");
        icon.classList.add(...iconClasses);

        // Append icon and localized text node
        button.append(icon, document.createTextNode(` ${game.i18n.localize(labelKey)}`));

        button.addEventListener("click", action);
        return button;
    });
    
    // --- Version Specific Logic (Reusable) ---
    if (game.release.generation >= 13) {
        // V13+ Logic: Insert after the "Documentation" section
        const documentationSection = html.querySelector("section.documentation");
        if (documentationSection) {
            // Create section wrapper
            const section = document.createElement("section");
            section.classList.add(MODULE_CONFIG.sectionClass, "flexcol");

            const divider = document.createElement("h4");
            divider.classList.add("divider");
            divider.textContent = game.i18n.localize(MODULE_CONFIG.headingKey);

            // Append divider and buttons to section
            section.append(divider, ...buttons);
            
            // Insert section before documentation
            documentationSection.before(section);
        } else {
            console.warn(`${game.i18n.localize(MODULE_CONFIG.headingKey)} | Could not find 'section.documentation' in V13 settings panel.`);
        }
    } else {
        // V12 Logic: Insert after the "Game Settings" section
        const gameSettingsSection = html[0].querySelector("#settings-game");
        if (gameSettingsSection) {
			const header = document.createElement("h2");
			header.innerText = game.i18n.localize(MODULE_CONFIG.headingKey);

			const settingsDiv = document.createElement("div");
			settingsDiv.append(...buttons);

			// Insert the header and the div containing buttons after the game settings section
			gameSettingsSection.after(header, settingsDiv);
        } else {
            console.warn(`${game.i18n.localize(MODULE_CONFIG.headingKey)} | Could not find '#settings-game' section in V12 settings panel.`);
        }
    }
});
