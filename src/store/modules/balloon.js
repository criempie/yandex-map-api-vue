export default {
    state     : {},
    mutations : {},
    actions   : {
        open({ getters, rootGetters }, { data, coords }) {
            return rootGetters['map/map'].balloon.open(coords, data);
        },

        close({ rootGetters }) {
            return rootGetters['map/map'].balloon.close();
        },
    },
    getters   : {},
    namespaced: true,
};