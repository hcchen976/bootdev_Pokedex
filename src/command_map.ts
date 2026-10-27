import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const api = state.api;
    let locationData;
    try {
        if (!state.nextLocationsURL) {
            locationData = await api.fetchLocations();
        } else {
            locationData = await api.fetchLocations(state.nextLocationsURL);
        }
        state.nextLocationsURL = locationData.next;
        state.prevLocationsURL = locationData.previous;

        for (const result of locationData.results) {
            console.log(result.name);
        }
    } catch (err) {
        console.log(`Something went wrong!`);
        console.log(`Error message: \n ${err}`);
    }

    // console.log(mapNames);

}