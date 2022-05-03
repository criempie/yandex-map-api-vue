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

        groupByCity(state) {
            const grouped = {};
            const result = [];

            state.offices.forEach(off => {
                if (grouped[off.city]) {
                    grouped[off.city].push(off);
                } else {
                    grouped[off.city] = [ off ];
                }
            });

            for (let k in grouped) {
                result.push({city: k, offices: grouped[k]})
            }

            return result;
        },
    },
    namespaced: true,
};