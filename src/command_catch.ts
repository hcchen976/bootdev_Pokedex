import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]):Promise<void> {
    const targetPokemon: string = args[0];
    console.log(`Throwing a Pokeball at ${targetPokemon}...`);

    try {
        const pokemon = await state.api.fetchPokemon(targetPokemon);
        if (!pokemon?.name){
            throw new Error(`no such pokemon`);
            return;
        }
        if (Math.random() < 0.5) {
            console.log(`${targetPokemon} escaped!`);
        } else {
            console.log(`${targetPokemon} was caught!`);
            state.pokedex ??= {};
            if (pokemon){
            state.pokedex[targetPokemon] = pokemon;
            }
        }
    } catch (err) {
        console.log("Something went wrong!");
        console.log(`${err}`);
    }

}