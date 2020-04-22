import Vue from "vue";
import Vuex from "vuex";

// we first import the module
import shop from "./shop";

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            // then we reference it
            shop
        }
    });
    return Store;
}
