export const configSheet = async () => {
    // Pass module sheet object to sheetConfig
    game.pbta.sheetConfig = {
        rollFormula: "2d6",
        rollShifting: false,
        minMod: -3,
        maxMod: 3,
        statToggle: {
            label: game.i18n.localize("FELLOWSHIP.CharacterSheets.despairToggle"),
            modifier: "dis"
        },
        rollResults: {
            failure: {
                start: null,
                end: 6,
                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.rollResults.complications")
            },
            partial: {
                start: 7,
                end: 9,
                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.rollResults.partialSuccess")
            },
            success: {
                start: 10,
                end: null,
                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.rollResults.success")
            }
        },
        actorTypes: {
            character: {
                stats: {
                    blood: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.stats.blood"),
                        value: 0
                    },
                    courage: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.stats.courage"),
                        value: 0
                    },
                    grace: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.stats.grace"),
                        value: 0
                    },
                    sense: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.stats.sense"),
                        value: 0
                    },
                    wisdom: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.stats.wisdom"),
                        value: 0
                    },
                    iron: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.stats.iron"),
                        value: 0
                    },
                    doom: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.stats.doom"),
                        value: 0
                    }
                },
                attributes: {
                    statsVisibility: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.label"),
                        description: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.description"),
                        customLabel: false,
                        userLabel: false,
                        playbook: true,
                        type: "ListMany", 
                        condition: false,
                        sort: false,
                        options: {
                            0: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.options.0"),
                                value: true
                            },
                            1: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.options.1"),
                                value: true
                            },
                            2: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.options.2"),
                                value: true
                            },
                            3: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.options.3"),
                                value: true
                            },
                            4: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.options.4"),
                                value: true
                            },
                            5: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.options.5"),
                                value: false
                            },
                            6: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.statsVisibility.options.6"),
                                value: false
                            },
                        }
                    },
                    lookOne: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.lookLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Text",
                        position: "left",                                
                        playbook: true,
                        value: ""
                    },
                    lookTwo: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.lookLabelTwo"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Text",
                        position: "left",                                
                        playbook: true,
                        value: ""
                    },
                    lookThree: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.lookLabelThree"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Text",
                        position: "left",                                
                        playbook: true,
                        value: ""
                    },
                    lookFour: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.lookLabelFour"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Text",
                        position: "left",                                
                        playbook: true,
                        value: ""
                    },
                    initialAgendas: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.agendasLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        position: "left",
                        playbook: true,
                        value: ""
                    },
                    fourthAgenda: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.lastAgendasLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        position: "left",
                        playbook: true,
                        value: ""
                    },
                    advancements: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.advancement.label"),
                        description: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.advancement.description"),
                        customLabel: false,
                        userLabel: false,
                        playbook: true,
                        limited: false,
                        position: null,
                        type: "ListMany",
                        condition: false,
                        sort: false,
                        options: {
                            0: {
                                label: "",
                                value: false
                            },
                            1: {
                                label: "",
                                value: false
                            },
                            2: {
                                label: "",
                                value: false
                            },
                            3: {
                                label: "",
                                value: false
                            },
                            4: {
                                label: "",
                                value: false
                            },
                            5: {
                                label: "",
                                value: false
                            }
                        }
                    },
                    unlockDestiny: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.advancement.destiny.label"),
                        description: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.advancement.destiny.description"),
                        customLabel: false,
                        userLabel: false,
                        playbook: true,
                        limited: false,
                        position: null,
                        type: "ListMany",
                        condition: false,
                        sort: false,
                        options: {
                            0: {
                                label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.advancement.destiny.options.0"),
                                value: false
                            },
                        },
                    },
                },
                details: {
                    playingAs: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.playingAsLabel"),
                        playbook: true,
                        value: ""
                    },
                    yourPeople: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.yourPeopleLabel"),
                        playbook: true,
                        value: ""
                    },
                    bonds: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.bondsLabel"),
                        playbook: true,
                        value: ""
                    },
                    earnedFellowship: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.earnedFellowshipLabel"),
                        value: ""
                    },
                    notes: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.notesLabel"),
                        value: ""
                    },
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.moveTypes.basicLabel"),
                        moves: [],
                        creation: true
                    },
                    core: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.moveTypes.coreLabel"),
                        moves: [],
                        playbook: true
                    },
                    customs: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.moveTypes.customsLabel"),
                        moves: [],
                        playbook: true
                    },
                    destiny: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.moveTypes.destinyLabel"),
                        moves: []
                    },
                    bonds: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.moveTypes.bondsLabel"),
                        moves: [],
                        creation: true
                    },
                    fellowship: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.moveTypes.fellowshipLabel"),
                        moves: []
                    }
                },
                equipmentTypes: {
                    gear: {
                       label: game.i18n.localize("FELLOWSHIP.CharacterSheets.equipmentTypes.gear")
                    },
                 }
            },
            npc: {
                attributes: {
                    threatType: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.label'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                    },
                    threatSubtype: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.subtype'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                    },
                    isSourcePower: {
                        type: 'Checkbox',
                        label: null,
                        checkboxLabel: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.isSourcePower'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                    },
                    isSecret: {
                        type: 'Checkbox',
                        label: null,
                        checkboxLabel: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.isSecret'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                    },
                    isCompanion: {
                        type: 'Checkbox',
                        label: null,
                        checkboxLabel: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.isCompanion'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                    },
                    isInDespair: {
                        type: 'Checkbox',
                        label: null,
                        checkboxLabel: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.isInDespair'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                    },
                    bonds: {
                        type: 'Number',
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.bonds'),
                        description: null,
                        default: 0,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                    },
                },
                details: {
                    biography: {
                        label: game.i18n.localize("FELLOWSHIP.NPCSheets.details.description"),
                        value: ""
                    },
                    notes: {
                        label: game.i18n.localize("FELLOWSHIP.NPCSheets.details.notes"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP.OverlordSheet.moveTypes.basic"),
                        moves: []
                    },
                    core: {
                        label: game.i18n.localize("FELLOWSHIP.OverlordSheet.moveTypes.core"),
                        moves: []
                    },
                    custom: {
                        label: game.i18n.localize("FELLOWSHIP.OverlordSheet.moveTypes.custom"),
                        moves: []
                    },
                },
                equipmentTypes: {
                    gear: {
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.equipmentTypes.gear'),
                    },
                },
            },
            'fellowship-pbta.overlord': {
                baseType: "npc",
                attributes: {
                    title: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.title'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                        value: ""
                    },
                    lookOne: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.looks'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                        value: ""
                    },
                    lookTwo: {
                        type: "Text",
                        label: null,
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                        value: ""
                    },
                    lookThree: {
                        type: "Text",
                        label: null,
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                        value: ""
                    },
                    lookFour: {
                        type: "Text",
                        label: null,
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                        value: ""
                    },
                    weakness: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.weakness.label'),
                        description: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.weakness.description'),
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                        value: ""
                    },
                    extraCut: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.extraCut'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                        value: ""
                    },
                    thirdAgenda: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.thirdAgenda.label'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                        value: ""
                    },
                    army: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.army.label'),
                        description: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.army.description'),
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                        value: ""
                    },
                    generals: {
                        type: "LongText",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.generals.label'),
                        description: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.generals.description'),
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                        value: ""
                    },
                    bonds: {
                        type: "LongText",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.bonds.label'),
                        description: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.bonds.description'),
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                        value: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.bonds.value'),
                    },
                    secretReason: {
                        type: "Text",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.secretReason.label'),
                        description: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.secretReason.description'),
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                        value: ""
                    },
                    level: {
                        type: "Number",
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.level.label'),
                        description: game.i18n.localize('FELLOWSHIP.OverlordSheet.attr.level.description'),
                        customLabel: false,
                        userLabel: false,
                        position: 'Top',
                        value: 1
                    },
                },
                details: {
                    biography: {
                        label: game.i18n.localize("FELLOWSHIP.OverlordSheet.details.notes"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP.OverlordSheet.moveTypes.basic"),
                        moves: [],
                        creation: true
                    },
                    core: {
                        label: game.i18n.localize("FELLOWSHIP.OverlordSheet.moveTypes.core"),
                        moves: [],
                        creation: true
                    },
                    custom: {
                        label: game.i18n.localize("FELLOWSHIP.OverlordSheet.moveTypes.custom"),
                        moves: []
                    },
                },
                equipmentTypes: {
                    gear: {
                        label: game.i18n.localize('FELLOWSHIP.OverlordSheet.equipmentTypes.gear'),
                    },
                },
            },
        }
    }
};

/**
 * Settings for the PbtA system
 */
export function pbtaSettings() {
    game.settings.set('pbta', 'hideForward', true);
    game.settings.set('pbta', 'hideOngoing', true);
    game.settings.set('pbta', 'hideHold', true);
    game.settings.set('pbta', 'hideUses', false);
    game.settings.set('pbta', 'hideRollFormula', true);``
    game.settings.set('pbta', 'hideRollMode', false);
    game.settings.set('pbta', 'advForward', true);
    game.settings.set('pbta', 'hideAdvancement', 'none');
};

/**
 * Tag configuration for the PbtA system
 */
export const tagConfig = {
    item: {
        equipment:
            '[{"value":"FELLOWSHIP.Tags.equipment.Melee.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Melee.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Ranged.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Ranged.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Area.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Area.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Dangerous.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Dangerous.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Burning.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Burning.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Clumsy.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Clumsy.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Dwarf-Made.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Dwarf-Made.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Elf-Made.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Elf-Made.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Necrotic.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Necrotic.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Orc-Made.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Orc-Made.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Piercing.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Piercing.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Slow.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Slow.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Reload.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Reload.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Ammo.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Ammo.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Armor.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Armor.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Drunk.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Drunk.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Food.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Food.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Healing.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Healing.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Precious.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Precious.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Useful.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Useful.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Vigor.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Vigor.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.Trap.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.Trap.description"}]',
    },
};