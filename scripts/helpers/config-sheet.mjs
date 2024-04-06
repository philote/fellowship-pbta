export const configSheet = async () => {
    // Pass Masks sheet object to sheetConfig
    game.pbta.sheetConfig = {
        rollFormula: "2d6",
        statToggle: {
            label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.statToggle"),
            modifier: 0
        },
        minMod: -3,
        maxMod: 4,
        rollResults: {
            failure: {
                start: null,
                end: 6,
                label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.rollResults.complications")
            },
            partial: {
                start: 7,
                end: 9,
                label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.rollResults.partialSuccess")
            },
            success: {
                start: 10,
                end: null,
                label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.rollResults.success")
            }
        },
        actorTypes: {
            character: {
                stats: {
                    blood: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.blood"),
                        value: 0
                    },
                    courage: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.courage"),
                        value: 0
                    },
                    grace: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.grace"),
                        value: 0
                    },
                    sense: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.sense"),
                        value: 0
                    },
                    wisdom: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.wisdom"),
                        value: 0
                    }
                },
                attrTop: {},
                attrLeft: {
                    level: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.attr.levelLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Number",
                        value: 0
                    },
                    looks: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.attr.looksLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        value: ""
                    }
                },
                details: {
                    agendas: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.agendasLabel"),
                        value: ""
                    },
                    yourPeople: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.yourPeopleLabel"),
                        value: ""
                    },
                    biography: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.biographyLabel"),
                        value: ""
                    },
                    bonds: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.bondsLabel"),
                        value: ""
                    },
                    advancement: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.advancementLabel"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.basicLabel"),
                        moves: [],
                        creation: true
                    },
                    core: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.coreLabel"),
                        moves: [],
                        playbook: true
                    },
                    custom: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.customLabel"),
                        moves: [],
                        playbook: true
                    },
                    shared: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.sharedLabel"),
                        moves: [],
                        playbook: true
                    },
                    destiny: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.destinyLabel"),
                        moves: [],
                        playbook: true
                    },
                    special: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.specialLabel"),
                        moves: []
                    },
                    fellowship: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.fellowshipLabel"),
                        moves: []
                    }
                },
                equipmentTypes: {
                    gear: {
                       label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.equipmentTypes.gear")
                    },
                    companions: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.equipmentTypes.companions")
                     }
                 }
            },
            dwarf: {
                stats: {
                    blood: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.blood"),
                        value: 0
                    },
                    courage: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.courage"),
                        value: 0
                    },
                    grace: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.grace"),
                        value: 0
                    },
                    sense: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.sense"),
                        value: 0
                    },
                    wisdom: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.wisdom"),
                        value: 0
                    },
                    iron: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.iron"),
                        value: 0
                    }
                },
                attrTop: {},
                attrLeft: {
                    level: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.attr.levelLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Number",
                        value: 0
                    },
                    looks: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.attr.looksLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        value: ""
                    }
                },
                details: {
                    agendas: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.agendasLabel"),
                        value: ""
                    },
                    yourPeople: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.yourPeopleLabel"),
                        value: ""
                    },
                    biography: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.biographyLabel"),
                        value: ""
                    },
                    bonds: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.bondsLabel"),
                        value: ""
                    },
                    advancement: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.advancementLabel"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.basicLabel"),
                        moves: [],
                        creation: true
                    },
                    core: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.coreLabel"),
                        moves: [],
                        playbook: true
                    },
                    custom: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.customLabel"),
                        moves: [],
                        playbook: true
                    },
                    shared: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.sharedLabel"),
                        moves: [],
                        playbook: true
                    },
                    destiny: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.destinyLabel"),
                        moves: [],
                        playbook: true
                    },
                    special: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.specialLabel"),
                        moves: []
                    },
                    fellowship: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.fellowshipLabel"),
                        moves: []
                    }
                },
                equipmentTypes: {
                    gear: {
                       label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.equipmentTypes.gear")
                    },
                    companions: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.equipmentTypes.companions")
                     }
                },
                baseType: "character"
            },
            harbinger: {
                stats: {
                    blood: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.blood"),
                        value: 0
                    },
                    courage: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.courage"),
                        value: 0
                    },
                    grace: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.grace"),
                        value: 0
                    },
                    sense: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.sense"),
                        value: 0
                    },
                    wisdom: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.wisdom"),
                        value: 0
                    },
                    doom: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.stats.doom"),
                        value: 0
                    }
                },
                attrTop: {},
                attrLeft: {
                    level: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.attr.levelLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Number",
                        value: 0
                    },
                    looks: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.attr.looksLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        value: ""
                    }
                },
                details: {
                    agendas: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.agendasLabel"),
                        value: ""
                    },
                    yourPeople: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.yourPeopleLabel"),
                        value: ""
                    },
                    biography: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.biographyLabel"),
                        value: ""
                    },
                    bonds: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.bondsLabel"),
                        value: ""
                    },
                    advancement: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.details.advancementLabel"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.basicLabel"),
                        moves: [],
                        creation: true
                    },
                    core: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.coreLabel"),
                        moves: [],
                        playbook: true
                    },
                    custom: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.customLabel"),
                        moves: [],
                        playbook: true
                    },
                    shared: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.sharedLabel"),
                        moves: [],
                        playbook: true
                    },
                    destiny: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.destinyLabel"),
                        moves: [],
                        playbook: true
                    },
                    special: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.specialLabel"),
                        moves: []
                    },
                    fellowship: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.moveTypes.fellowshipLabel"),
                        moves: []
                    }
                },
                equipmentTypes: {
                    gear: {
                       label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.equipmentTypes.gear")
                    },
                    companions: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.CharacterSheets.equipmentTypes.companions")
                     }
                },
                baseType: "character"
            },
            npc: {
                attrLeft: {
                    
                },
                details: {
                    biography: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.NPCSheets.details.biographyLabel"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("FELLOWSHIP-PBTA.NPCSheets.moveTypes.basicLabel"),
                        moves: []
                    }
                }
            }
        }
    }
};