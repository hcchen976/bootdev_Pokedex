
type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(num: number) {
        this.#interval = num;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, { createdAt: Date.now(), val: val });
    }
    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        } else {
            return entry.val;
        }
    }

    #reap() {
        this.#cache.forEach((val, key, map) => {
            if (Date.now() - this.#interval > val.createdAt) {
                map.delete(key);
            }
        });
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval / 2);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}