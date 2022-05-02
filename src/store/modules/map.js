export default {
    state     : {
        ready           : false,
        map             : undefined,
        pointsCollection: undefined,
    },
    mutations : {
        ready(state) {
            state.ready = true;
        },

        map(state, map) {
            // Необходимо замкнуть map, иначе он ломается. (proxy?)
            state.map = () => map;
        },

        pointsCollection(state, collection) {
            state.pointsCollection = collection;
        },
    },
    actions   : {
        init({ commit, dispatch }) {
            ymaps.ready(() => {
                const newMap = new ymaps.Map('map', {
                    center: [ 55.76, 37.64 ],
                    zoom  : 7,
                });

                [ 'fullscreenControl',
                  'geolocationControl',
                  'routeEditor',
                  'rulerControl',
                  'searchControl',
                  'trafficControl',
                  'typeSelector',
                  'routeButtonControl',
                  'routePanelControl' ].forEach(
                    control => newMap.controls.remove(control));

                commit('map', newMap);
                commit('ready');
                dispatch('updateMap');
            });
        },

        setIncludingAllBounds({ state, getters }) {
            if (state.ready) {
                ymaps.geoQuery(getters.pointsCollection)
                     .applyBoundsToMap(getters.map);
            }
        },

        createPointsCollection({ state, rootGetters }) {
            console.log(state.ready);
            const collection = new ymaps.GeoObjectCollection();
            rootGetters.coords.forEach(coord => {
                const placemark = new ymaps.Placemark(coord);
                collection.add(placemark);
            });

            // Тут тоже надо замыкать, иначе не работает :/
            return () => collection;
        },

        async updateMap({ state, dispatch, commit, getters }) {
            if (!state.ready) return null;

            const pointsCollection = await dispatch('createPointsCollection');
            commit('pointsCollection', pointsCollection);

            getters.map
                 .geoObjects
                 .splice(0, 1, getters.pointsCollection);

            dispatch('setIncludingAllBounds');
        },
    },
    getters   : {
        pointsCollection(state) {
            return state.pointsCollection();
        },

        map(state) {
            return state.map();
        }
    },
    namespaced: true,
};