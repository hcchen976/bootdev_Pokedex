import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }

    try {
        const locationData = await state.api.fetchLocations(state.prevLocationsURL);
        state.nextLocationsURL = locationData.next;
        state.prevLocationsURL = locationData.previous;

        for (const result of locationData.results) {
            console.log(result.name);
        }
    } catch (err) {
        console.log(`Something went wrong!`);
        console.log(`Error message: \n ${err}`);
    }

}