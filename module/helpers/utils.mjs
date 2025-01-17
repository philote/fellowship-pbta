/**
 * Define a set of template paths to pre-load
 */
export const preloadHandlebarsTemplates = async function () {
	return loadTemplates([
		"modules/fellowship-pbta/templates/parts/actor-companions.hbs",
		"modules/fellowship-pbta/templates/parts/actor-inventory.hbs",
		"modules/fellowship-pbta/templates/parts/actor-advancements.hbs",
		"modules/fellowship-pbta/templates/parts/actor-destiny.hbs",
		"modules/fellowship-pbta/templates/dialog-destiny.hbs",
	]);
};

/**
 * Retrieves a list of Destinies in the world and compendiums
 * and sets them as an array of names & ids to the CONFIG.
 */
export async function getDestinies() {
	// Retrieve custom or overridden destinies.
	let destinies = game.items.filter(
		(item) => item.type === "fellowship-pbta.destiny"
	);

	// Retrieve compendium destinies and merge them in.
	for (let c of game.packs) {
		if (c.metadata.type !== "Item") continue;
		destinies = destinies.concat(
			await c.getDocuments({ type: "fellowship-pbta.destiny" })
		);
	}

	const sortedDestinies = destinies.sort((a, b) =>
		a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
	);
	CONFIG.FELLOWSHIP.destinies = sortedDestinies.map((p) => {
		return {
			name: p.name,
			uuid: p.uuid,
		};
	});
}

export async function getThreatTypes() {
	var threats = new Map();
	const barriers = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.barriers.Curses'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.barriers.Obstacles'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.barriers.Traps'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.barriers.Zones')
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.barrier'),
		barriers
	);

	const beasts = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.beasts.Aquatic'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.beasts.Cities'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.beasts.Mountains'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.beasts.Plains'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.beasts.Supernatural'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.beasts.Woodlands'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.beasts.Vehicles'),
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.beast'),
		beasts
	);

	const innocents = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.innocents.Bystanders'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.innocents.Criminals'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.innocents.Tolkien'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.innocents.Invells'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.innocents.Rebels'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.innocents.Benefactors'),
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.innocent'),
		innocents
	);

	const hordes = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.hordes.Commanders'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.hordes.Minions'),
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.horde'),
		hordes
	);
	
	const machines = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.machines.Androids'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.machines.Drones'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.machines.MachineCities'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.machines.Programs'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.machines.SupportUnits'),
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.machine'),
		machines
	);
	
	const organizations = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.organizations.Counterparts'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.organizations.Rogues'),
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.organization'),
		organizations
	);
	
	const scourges = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.scourges.Bastions'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.scourges.Aberrations'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.scourges.Undead'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.scourges.DarkLords'),
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.scourge'),
		scourges
	);
	
	const titans = [
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.titans.Legends'),
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.subtype.titans.Monsters'),
	];
	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.titan'),
		titans
	);

	threats.set(
		game.i18n.localize('FELLOWSHIP.NPCSheets.attr.type.options.other'),
		[]
	);
	CONFIG.FELLOWSHIP.threats = threats;
}
