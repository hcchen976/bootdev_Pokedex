import { createInterface, type Interface } from "readline";
import { stdin, stdout } from 'node:process';

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_Inspect.js";
import { commandPokedex } from "./command_pokedex.js";

import { PokeAPI, ShallowLocations, Location, PokemonDetail} from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readlineInterface: Interface;
    commandsRegistry: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationsURL?: ShallowLocations["next"];
    prevLocationsURL?: ShallowLocations["previous"];
    pokedex: Record<string, PokemonDetail>;
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        // can add more commands here
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        map: {
            name: "map",
            description: "fetch api location-area",
            callback: commandMap
        },
        mapb: {
            name:"mapb",
            description: "fetch prev location-area page",
            callback: commandMapb
        },
        explore: {
            name:"explore",
            description: "accepts a location-area argument, and fetch the details(Pokemon) to cli",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "performs a random check to catch pokemon, if success, adds it to user's pokedex",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "inspect a pokemon in pokedex",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "list all caught pokemon",
            callback: commandPokedex
        }
    }
}


export function initState(cacheInterval: number) {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: 'Pokedex > '
    });
    const commands = getCommands();
    const apiObj = new PokeAPI(cacheInterval);
    const state : State = {readlineInterface: rl, commandsRegistry: commands, api: apiObj, pokedex:{}}
    return state
}