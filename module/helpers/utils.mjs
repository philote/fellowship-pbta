/**
 * Define a set of template paths to pre-load
 */
export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
      'modules/fellowship-pbta/templates/parts/actor-companions.hbs',
      'modules/fellowship-pbta/templates/parts/actor-inventory.hbs',
      'modules/fellowship-pbta/templates/parts/actor-advancements.hbs',
      'modules/fellowship-pbta/templates/parts/actor-destiny.hbs',
      'modules/fellowship-pbta/templates/dialog-destiny.hbs',
    ]);
};

/**
 * Retrieves a list of Destinies in the world and compendiums
 * and sets them as an array of names & ids to the CONFIG.
 */
export async function getDestinies() {
	// Retrieve custom or overridden destinies.
	let destinies = game.items.filter((item) => item.type === "fellowship-pbta.destiny");

	// Retrieve compendium destinies and merge them in.
	for (let c of game.packs) {
		if (c.metadata.type !== "Item") continue;
		destinies = destinies.concat(await c.getDocuments({ type: "fellowship-pbta.destiny" }));
	}

	const sortedDestinies = destinies.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
	CONFIG.FELLOWSHIP.destinies = sortedDestinies
		.map((p) => {
			return {
				name: p.name,
				uuid: p.uuid,
			};
		});
}