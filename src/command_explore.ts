import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        console.log("accepts exactly one location-area argument !");
        return;
    }

    try {

        const userInput = args[0];
        const response = await state.api.fetchLocation(userInput);

        const locationName: string = response.name;

        console.log(`Exploring ${locationName}...`);
        console.log(`Found Pokemon:`);
        for (const pokemon of response.pokemon_encounters) {
            console.log(" - " + pokemon.pokemon.name);
        }
    } catch (err) {
        console.log(`Something went wrong!`);
        console.log(`Error message: \n ${err}`);
    }
}