// Factory function to create singletons
const  createSingleton = (mapperClass) => {
    let instance;
    // Return a function that creates or returns the existing instance
    return () => {
        if (!instance) {
            instance = new mapperClass;
        }
        return instance;
    };
}

class MapperClass{

    #data = new Map();

    add( key, data){
        this.#data.set(key,data);
    }

    remove (key) {
        this.#data.delete(key);
    }

    get(key) {
        return this.#data.get(key);
    }
    deleteByValue(val){
        const foundIdEntry = [... Object.entries(this.#data)]
            .find(([k,v]) => v === val);
        if (foundIdEntry) this.#data.delete(foundIdEntry[0]);
    }
    getKeysByValue(val){
        return  [...this.#data.entries()]
            .map(([k,v]) => {
                if (v === val)
                    return k
            })
    }


}


// Create singleton instances using the factory function
const ExpUnsubMap = createSingleton(MapperClass)();
const WsClientMap = createSingleton(MapperClass)();
const ExpClientMap = createSingleton(MapperClass)();

module.exports = {ExpUnsubMap ,WsClientMap,ExpClientMap}