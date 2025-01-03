/**
 * Define a set of template paths to pre-load
 */
export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
      'modules/fellowship-pbta/templates/parts/actor-companions.hbs',
      'modules/fellowship-pbta/templates/parts/actor-inventory.hbs',
      'modules/fellowship-pbta/templates/parts/actor-advancements.hbs',
      'modules/fellowship-pbta/templates/parts/actor-destiny.hbs',
    ]);
};

/**
 * Retrieves a list of Destinies in the world and compendiums
 * and returns them as an array of names or of documents.
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
				slug: p.system.slug || p.name.slugify(),
				uuid: p.uuid,
			};
		});
	// if (!CONFIG.PBTA.destinies.length) game.pbta.noDestinies = true;
}