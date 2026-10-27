import { createInterface, type Interface } from 'node:readline';
import { type State } from './state.js';

export function cleanInput(str: string): string[] {
    return str
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 0);
}

export async function startREPL(state: State) {
    const rl = state.readlineInterface;
    const commandsRegistry = state.commandsRegistry;

    rl.prompt();

    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        //DONE: Process commands here
        const commandName = words[0];
        const cmd = commandsRegistry[commandName];

        if (!cmd) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }
        try {
            await cmd.callback(state, ...words.slice(1));
        } catch (e) {
            console.log(e);
        }

        rl.prompt();
    })
}


