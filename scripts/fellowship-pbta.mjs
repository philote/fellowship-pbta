import { configSheet } from "./helpers/config-sheet.mjs";

Hooks.once('pbtaSheetConfig', () => {
    // Disable the sheet config form.
    game.settings.set('pbta', 'sheetConfigOverride', true);

    // Replace the game.pbta.sheetConfig with your own version.
    configSheet();

    // PBTA Settings
    game.settings.set('pbta', 'advForward', true);
    game.settings.set('pbta', 'hideRollFormula', true);
    game.settings.set('pbta', 'hideForward', true);
    game.settings.set('pbta', 'hideOngoing', true);
    game.settings.set('pbta', 'hideRollMode', false);
    game.settings.set('pbta', 'hideUses', false);

    // Define custom tags.
    game.pbta.tagConfigOverride = {
        item: {
            // Tags available to a specific item type (e.g. "equipment", "move")
            gear: '[{"value":"Melee"}, {"value":"Ranged"}, {"value":"Area"}, {"value":"Dangerous"}, {"value":"Burning"}, {"value":"Clumsy"}, {"value":"Dwarf-Made"}, {"value":"Elf-Made"}, {"value":"Necrotic"}, {"value":"Orc-Made"}, {"value":"Piercing"}, {"value":"Reload"}, {"value":"Slow"}, {"value":"Thrown"}, {"value":"Ammo"}, {"value":"Armor"}, {"value":"Drunk"}, {"value":"Food"}, {"value":"Healing"}, {"value":"Precious"}, {"value":"Useful"}, {"value":"Vigor"}, {"value":"Trap"}]'
        }
    }
});