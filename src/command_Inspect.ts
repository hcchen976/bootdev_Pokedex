import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const target: string = args[0];
    if (!state.pokedex?.[target]) {
        console.log("you have not caught that pokemon");
        return;
    }

    const pokemonDetail = state.pokedex[target];
    const pokemonName = pokemonDetail.name;
    const pokemonHeight = pokemonDetail.height;
    const pokemonWeight = pokemonDetail.weight;
    const pokemonStats = pokemonDetail.stats;
    const statsString = pokemonStats.map(item => `  -${item.stat.name}: ${item.base_stat}`).join('\n');
    const pokemonTypes = pokemonDetail.types;
    const typesString = pokemonTypes.map(item => `  -${item.type.name}`)

    console.log(`Name: ${pokemonName}`);
    console.log(`Height: ${pokemonHeight}`);
    console.log(`Weight: ${pokemonWeight}`);
    console.log(`Stats:`);
    console.log(`${statsString}}`);
    console.log(`Types:`);
    console.log(`${typesString}`);
}