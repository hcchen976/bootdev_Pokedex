import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    const commands = state.commandsRegistry;
    console.log("Welcome to the Pokedex!\nUsage:\n");
    for (let command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }

}
