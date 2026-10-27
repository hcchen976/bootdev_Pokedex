import { State } from "./state.js";

export async function commandPokedex(state: State, ...args: string[]): Promise<void> {
    console.log("Your Pokedex:");
    for ( const pokemon in state.pokedex) {
        console.log(`  - ${pokemon}`);
    }
}