import process from "node:process";
import { State } from "./state.js";

export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.readlineInterface.close();
    process.exit(0);
};