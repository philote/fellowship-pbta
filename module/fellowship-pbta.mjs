import * as pbtaConfig from './helpers/pbta-config.mjs';

Hooks.once('init', () => {
    // Register settings
    game.settings.register('fellowship-pbta', 'firstTime', {
        name: game.i18n.localize('FELLOWSHIP.Settings.startup.name'),
        scope: 'world',
        config: false,
        type: Boolean,
        default: true
    });

    game.settings.register('fellowship-pbta', 'enableLoginImg', {
        name: game.i18n.localize('FELLOWSHIP.Settings.img.name'),
        hint: game.i18n.localize('FELLOWSHIP.Settings.img.hint'),
        scope: 'world',
        config: true,
        type: Boolean,
        default: false
      });
});

// PbtA configuration hook
Hooks.once('pbtaSheetConfig', () => {
    // https://github.com/asacolips-projects/pbta?tab=readme-ov-file#overriding-sheet-config-in-a-module
    // Disable the PbtA sheet config form.
    if (game.settings.settings.get('pbta.sheetConfigOverride')) game.settings.set('pbta', 'sheetConfigOverride', true);

    // Replace the game.pbta.sheetConfig with this module's version.
    pbtaConfig.configSheet();

    // PBTA Settings
    pbtaConfig.pbtaSettings();

    // Defines custom PbtA system tags.
    game.pbta.tagConfigOverride = pbtaConfig.tagConfig;
});

Hooks.once('ready', async function () {
    // This allows the module to set a custom image to the login screen
    if (!game.user.isGM) return;
    if (game.settings.get('fellowship-pbta', 'firstTime')) {
        game.settings.set('fellowship-pbta', 'firstTime', false);
    
        const callback = async () => {
            game.settings.set('fellowship-pbta', 'enableLoginImg', true);
            const worldData = {
                id: game.world.id,
                action: 'editWorld',
                background: `modules/fellowship-pbta/assets/cover.webp`,
            };
            let response;
            try {
                response = await foundry.utils.fetchJsonWithTimeout(foundry.utils.getRoute('setup'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(worldData),
            });
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
            window: { title: game.i18n.localize('FELLOWSHIP.Settings.startup.dialog.title') },
            content: game.i18n.localize('FELLOWSHIP.Settings.startup.dialog.content'),
            rejectClose: false,
            modal: true,
            yes: { callback: callback },
        });
    } else {
        if (game.settings.get('fellowship-pbta', 'enableLoginImg')) {
            const worldData = {
                id: game.world.id,
                action: 'editWorld',
                background: `modules/fellowship-pbta/assets/cover.webp`,
            };
            let response;
            try {
                response = await foundry.utils.fetchJsonWithTimeout(foundry.utils.getRoute('setup'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(worldData),
            });
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
    
    if (app.actor.type === "character") {
        // Hide and show eash stat based on playbook attributes
        const playbook = app.actor.items.find((i) => i.type === "playbook");
        
        if (playbook == undefined) {
            // Initially hide iron and doom stats
            const iron = html[0].querySelector('li.stat[data-stat="iron"]');
            const doom = html[0].querySelector('li.stat[data-stat="doom"]');
            if (iron) iron.classList.toggle("hidden", true);
            if (doom) doom.classList.toggle("hidden", true);
        } else {
            Object.values(playbook.system.attributes.statsVisibility.choices[0].options).forEach(option => {
                const statElement = html[0].querySelector(`li.stat[data-stat="${option.label}"]`);
                if (statElement) {
                    statElement.classList.toggle("hidden", !option.value);
                }
            });
        }
        
    }
});

