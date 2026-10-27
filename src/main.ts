// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
    const state = initState(1000*60*5);
    try {
        await startREPL(state);
    } catch (error) {
         console.log(error);
    }
}

main();