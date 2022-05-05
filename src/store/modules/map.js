export default {
    state     : {
        ready           : false,
        map             : undefined,
        pointsClusterer : undefined,
    },
    mutations : {
        ready(state) {
            state.ready = true;
        },

        map(state, map) {
            // Необходимо замкнуть map, иначе он ломается. (proxy?)
            state.map = () => map;
        },

        pointsClusterer(state, clusterer) {
            state.pointsClusterer = () => clusterer;
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
                getters.map.setBounds(getters.pointsClusterer.getBounds());
            }
        },

        createPointsClusterer({ dispatch, rootGetters }) {
            const clusterer = new ymaps.Clusterer({});
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

                clusterer.add(placemark);
            });

            return clusterer;
        },

        async updateMap({ state, dispatch, commit, getters }) {
            if (!state.ready) return null;

            const pointsClusterer = await dispatch('createPointsClusterer');
            commit('pointsClusterer', pointsClusterer);

            getters.map
                   .geoObjects
                   .splice(0, 1, getters.pointsClusterer);

            dispatch('setIncludingAllBounds');
        },

        setCenter({ getters }, { coords, zoom = 12 }) {
            getters.map.setCenter(coords, zoom);
        },
    },
    getters   : {
        pointsClusterer(state) {
            return state.pointsClusterer();
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