export default {
    state     : {
        balloon: undefined,
    },
    mutations : {
        balloon(state, balloon) {
            state.balloon = balloon;
        },
    },
    actions   : {
        init({ rootGetters }) {
            if (rootGetters['map/ready']) {
                const map = rootGetters['map/map'];
                const balloon = new ymaps.Balloon(map);
                balloon.options.setParent(map.options);
            }
        },

        open({ state }, data, coords) {
            state.balloon.setData(data);
            state.balloon.open(coords);
        },
    },
    getters   : {
        balloon(state) {
            return state.balloon;
        },
    },
    namespaced: true,
};