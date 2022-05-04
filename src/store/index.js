import balloon from './modules/balloon';
import Vuex    from 'vuex';
import map     from './modules/map';
import offices from './modules/offices';

export const RUSSIA = 'russia';
export const BELARUS = 'belarus';

export const store = new Vuex.Store({
    state    : {
        currentCountry: RUSSIA,
    },
    mutations: {
        country(state, country) {
            state.currentCountry = country;
        },
    },
    actions  : {
        country({ commit, dispatch }, country) {
            commit('country', country);
            dispatch('balloon/close');
        },
    },
    getters  : {
        coords(state, _, __, rootGetters) {
            return rootGetters['offices/offices'].map(of => of.coords);
        },

        currentCountry(state) {
            return state.currentCountry;
        },
    },
    modules  : {
        map, offices, balloon,
    },
});