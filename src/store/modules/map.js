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

        createPointsCollection({ dispatch, rootGetters }) {
            const collection = new ymaps.GeoObjectCollection();
            rootGetters['offices/offices'].forEach(off => {
                const placemark = new ymaps.Placemark(off.coords, {
                    balloonContent: rootGetters['offices/formattedToHTML'](off),
                }, {
                    openBalloonOnClick   : true,
                    hideIconOnBalloonOpen: false,
                });

                placemark.events.add('click', () => {
                    dispatch('setCenter', { coords: off.coords });
                });

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

        setCenter({ getters }, { coords, zoom = 12 }) {
            getters.map.setCenter(coords, zoom);
        },
    },
    getters   : {
        pointsCollection(state) {
            return state.pointsCollection();
        },

        map(state) {
            return state.map();
        },

        ready(state) {
            return state.ready;
        },
    },
    namespaced: true,
};