 class ExperimentUnsubMap{

    static instance ;
    #ExpUnsubMap = new Map


     constructor() {
        if(!ExperimentUnsubMap.instance)
            ExperimentUnsubMap.instance = this;
        return ExperimentUnsubMap.instance;
             }

     add( expId, unsubFunc){
        this.#ExpUnsubMap[expId] = unsubFunc;
    }

    remove (expId) {
        this.#ExpUnsubMap.delete(expId);
    }

    get(expId) {
        return this.#ExpUnsubMap[expId];
    }


}

  const ExpUnsubMap = new ExperimentUnsubMap();

module.exports = {ExpUnsubMap}
