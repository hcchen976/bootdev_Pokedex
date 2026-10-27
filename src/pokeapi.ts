import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cacheObj: Cache;

    constructor(cacheInterval: number) {
        this.cacheObj = new Cache(cacheInterval);
    }

    closeCache() {
        this.cacheObj.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let url: string;
        // implement this
        if (!pageURL) {
            url = PokeAPI.baseURL + "/location-area";
        } else {
            url = pageURL;
        }

        const cached = this.cacheObj.get<ShallowLocations>(url);

        if (!cached) {
            const response = await fetch(url);
            const data: ShallowLocations = await response.json();
            this.cacheObj.add(url, data);
            return data;
        } else {
            return cached;
        }

    }

    async fetchLocation(locationName: string): Promise<LocationDetail> {
        // implement this
        const url = PokeAPI.baseURL + "/location-area/" + locationName;
        const cached = this.cacheObj.get<LocationDetail>(url);

        if (cached) {
            return cached;
        } else {
            const response = await fetch(url);
            const data: LocationDetail = await response.json();
            this.cacheObj.add(url, data);
            return data;
        }
    }

    async fetchPokemon(pokemonName: string): Promise<PokemonDetail | undefined> {
        const url = PokeAPI.baseURL + "/pokemon/" + pokemonName;
        const cached = this.cacheObj.get<PokemonDetail>(url);

        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const dataRaw = await response.json();
            const data: PokemonDetail = {
                id: dataRaw.id,
                name: dataRaw.name,
                base_experience: dataRaw.base_experience,
                height: dataRaw.height,
                weight: dataRaw.weight,
                stats: dataRaw.stats,
                types: dataRaw.types,
                past_types: dataRaw.past_types,
            }
            this.cacheObj.add(url, data);
            return data;

        } catch (e) {
            console.log(e);
            return
        }
    }
}

export type ShallowLocations = {
    // add properties here
    count: number
    next: string
    previous: any
    results: Location[]
};

export type Location = {
    // add properties here
    name: string
    url: string
};

export interface LocationDetail {
    id: number
    name: string
    location: Location
    pokemon_encounters: PokemonEncounter[]
};

export interface PokemonEncounter {
    pokemon: Pokemon
};

export interface Pokemon {
    name: string
    url: string
};

export interface PokemonDetail {
    id: number
    name: string
    base_experience: number
    height: number
    weight: number
    stats: Stat[]
    types: Type[]
    past_types: any[]
}

export interface Stat {
    base_stat: number
    effort: number
    stat: {
        name: string
    }
}

export interface Type {
    slot: number
    type: {
        name: string
    }
}
