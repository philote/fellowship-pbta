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
                        label: "Stats Visibility",
                        description: "Which stats are visible on the character sheet?",
                        customLabel: false,
                        userLabel: false,
                        playbook: true,
                        type: "ListMany", 
                        condition: false,
                        sort: false,
                        options: {
                            0: {
                                label: "blood",
                                value: true
                            },
                            1: {
                                label: "courage",
                                value: true
                            },
                            2: {
                                label: "grace",
                                value: true
                            },
                            3: {
                                label: "sense",
                                value: true
                            },
                            4: {
                                label: "wisdom",
                                value: true
                            },
                            5: {
                                label: "iron",
                                value: false
                            },
                            6: {
                                label: "doom",
                                value: false
                            },
                        }
                    },
                    level: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.levelLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Number",
                        value: 0,
                        position: "Top"
                    },
                    initialAgendas: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.agendasLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        position: "top",
                        value: ""
                    },
                    fourthAgenda: {
                        label: "When you know not what to do, consult your Agendas.",
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        position: "top",
                        value: ""
                    },
                    advancements: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.advancement.label"),
                        description: game.i18n.localize("FELLOWSHIP.CharacterSheets.attr.advancement.description"),
                        customLabel: false,
                        userLabel: false,
                        playbook: true,
                        limited: false,
                        position: "left",
                        type: "ListMany",
                        condition: false,
                        sort: false,
                        options: {
                            0: {
                                label: "+1 Status (max+1)",
                                value: false
                            },
                            1: {
                                label: "+1 Status (max+1)",
                                value: false
                            },
                            2: {
                                label: "+1 Status (max+1)",
                                value: false
                            },
                            3: {
                                label: "a new Aware move",
                                value: false
                            },
                            4: {
                                label: "a new Aware move",
                                value: false
                            },
                            5: {
                                label: "a move from another archetype",
                                value: false
                            },
                            6: {
                                label: "a move from another archetype",
                                value: false
                            },
                            7: {
                                label: "open a new mortal relationship",
                                value: false
                            }
                        }
                    },
                },
                details: {
                    lookOne: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.lookLabel"),
                        value: ""
                    },
                    lookTwo: {
                        label: "",
                        value: ""
                    },
                    lookThree: {
                        label: "",
                        value: ""
                    },
                    lookFour: {
                        label: "",
                        value: ""
                    },
                    earnedFellowship: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.earnedFellowshipLabel"),
                        value: ""
                    },
                    bonds: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.details.bondsLabel"),
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
                    people: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.moveTypes.peopleLabel"),
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
                    companions: {
                        label: game.i18n.localize("FELLOWSHIP.CharacterSheets.equipmentTypes.companions")
                     }
                 }
            },
            npc: {
                attributes: {
                    fly: {
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.flyLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: 'checkbox',
                        default: false,
                        position: 'Top',
                    },
                    injury: {
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.injuryLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: 'Clock',
                        value: 0,
                        max: 4,
                        steps: [false, false, false, false],
                        position: 'Top',
                    },
                    faction: {
                        type: 'Text',
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.factionLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                    },
                    age: {
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.attr.ageLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: 'Number',
                        default: 1,
                        position: 'Left',
                    },
                },
                details: {
                    biography: {
                        label: game.i18n.localize("FELLOWSHIP.NPCSheets.details.biographyLabel"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP.NPCSheets.moveTypes.basicLabel"),
                        moves: []
                    }
                },
                equipmentTypes: {
                    loot: {
                        label: game.i18n.localize('FELLOWSHIP.NPCSheets.lootLabel'),
                    },
                },
            }
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
    game.settings.set('pbta', 'hideRollFormula', true);
    game.settings.set('pbta', 'hideRollMode', false);
    game.settings.set('pbta', 'advForward', true);
    if (game.settings.settings.has('pbta.hideAdvancement')) {
      game.settings.set('pbta', 'hideAdvancement', true);
    }
};

/**
 * Tag configuration for the PbtA system
 */
export const tagConfig = {
      // Tags available to any actor and item
      actor: {
        // Tags available to all actors
        all: '',
        // Tags available to a specific actor type set up on game.pbta.sheetConfig.actorTypes (e.g. "character", "npc")
        character: '',
        npc: ''
    },
    item: {
        // Tags available to all actors
        all: '',
        // Tags available to a specific item type (e.g. "equipment", "move")
        gear: '[{"value":"Melee"}, {"value":"Ranged"}, {"value":"Area"}, {"value":"Dangerous"}, {"value":"Burning"}, {"value":"Clumsy"}, {"value":"Dwarf-Made"}, {"value":"Elf-Made"}, {"value":"Necrotic"}, {"value":"Orc-Made"}, {"value":"Piercing"}, {"value":"Reload"}, {"value":"Slow"}, {"value":"Thrown"}, {"value":"Ammo"}, {"value":"Armor"}, {"value":"Drunk"}, {"value":"Food"}, {"value":"Healing"}, {"value":"Precious"}, {"value":"Useful"}, {"value":"Vigor"}, {"value":"Trap"}]',
        equipment:
            '[{"value":"FELLOWSHIP.Tags.equipment.strong.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.strong.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.weak.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.weak.description"}, ' +
            '{"value":"FELLOWSHIP.Tags.equipment.glows.value", "editable":false, "description":"FELLOWSHIP.Tags.equipment.glows.description"}]',
    },
};  