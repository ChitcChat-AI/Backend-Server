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

    add( expId, unsubFunc){
        this.#data.set(expId,unsubFunc);
    }

    remove (expId) {
        this.#data.delete(expId);
    }

    get(expId) {
        return this.#data.get(expId);
    }


}


// Create singleton instances using the factory function
const ExpUnsubMap = createSingleton(MapperClass)();
const WsClientServiceMap = createSingleton(MapperClass)();

module.exports = {ExpUnsubMap ,WsClientServiceMap}