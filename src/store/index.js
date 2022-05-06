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
        country({ commit }, country) {
            commit('country', country);
        },
    },
    getters  : {
        currentCountry(state) {
            return state.currentCountry;
        },
    },
    modules  : {
        map, offices,
    },
});