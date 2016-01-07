import Reflux from "reflux"
import Actions from "./actions"

let Store = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.foo = "bar";
        console.log("initializing store...");
    },

    getInitialState: function() {
        return this;
    },

    onJoin: function(key, value) {
        console.log(key + ":" + value);
    }

});

export default Store;
