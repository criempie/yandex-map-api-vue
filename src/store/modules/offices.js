import {
    RUSSIA,
    BELARUS,
} from '@/store';

export default {
    state     : {
        offices: [],
    },
    mutations : {
        offices(state, offices) {
            state.offices = offices;
        },
    },
    actions   : {
        init({ dispatch }) {
            dispatch('updateOffices');
        },

        updateOffices({ commit, rootState }) {
            if (rootState.currentCountry === RUSSIA) {
                import('@/russiaOffices.json')
                    .then(_offices => commit('offices', Array.from(_offices)));

            } else if (rootState.currentCountry === BELARUS) {
                import('@/belarusOffices.json')
                    .then(_offices => commit('offices', Array.from(_offices)));
            }
        },
    },
    getters   : {
        offices(state) {
            return state.offices;
        },
    },
    namespaced: true,
};