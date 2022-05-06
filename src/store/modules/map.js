export default {
    state     : {
        ready          : false,
        map            : undefined,
        pointsClusterer: undefined,
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
                dispatch('initCustomLayouts')
                    .then(() => dispatch('createPointsByOffices'))
                    .then(() => dispatch('updateMap'));

            });
        },

        async initCustomLayouts() {
            const clusterLayoutData = (await import('@/layouts/cluster.js')).default;
            const clusterLayout = ymaps.templateLayoutFactory.createClass(clusterLayoutData);
            ymaps.layout.storage.add('cluster#myIcon', clusterLayout);

            const placemarkLayoutData = (await import('@/layouts/placemark.js'));
            const defaultLayout = ymaps.templateLayoutFactory.createClass(placemarkLayoutData.defaultLayout);
            const selectedLayout = ymaps.templateLayoutFactory.createClass(placemarkLayoutData.selectedLayout);
            ymaps.layout.storage.add('placemark#myIcon', defaultLayout);
            ymaps.layout.storage.add('placemark_selected#myIcon', selectedLayout);
        },

        setIncludingAllBounds({ state, getters }) {
            if (state.ready) {
                getters.map.setBounds(getters.pointsClusterer.getBounds());
            }
        },

        createPointsByOffices({ dispatch, rootGetters }) {
            rootGetters['offices/offices'].forEach(off => {
                const placemark = new ymaps.Placemark(off.coords, {
                    balloonContent: rootGetters['offices/formattedToHTML'](off),
                }, {
                    iconLayout           : 'placemark#myIcon',
                    iconShape            : {
                        type       : 'Circle',
                        coordinates: [ 12, 12 ],
                        radius     : 12,
                    },
                    iconOffset           : [ -12, -12 ],
                    hideIconOnBalloonOpen: false,
                });

                placemark.events.add('click', () => {
                    dispatch('setCenter', { coords: off.coords });
                });

                placemark.events.add('balloonopen', () => {
                    placemark.options.set('iconLayout', 'placemark_selected#myIcon');
                });

                placemark.events.add('balloonclose', () => {
                    placemark.options.set('iconLayout', 'placemark#myIcon');
                });

                off.getPlacemark = () => placemark;
            });
        },

        createPointsClusterer({ rootGetters }) {
            const clusterer = new ymaps.Clusterer({
                clusterIconLayout: 'cluster#myIcon',
                clusterIconShape : {
                    type       : 'Circle',
                    coordinates: [ 16, 16 ],
                    radius     : 16,
                },
                clusterIconOffset: [ -16, -16 ],
            });

            rootGetters['offices/offices'].forEach(off => {
                clusterer.add(off.getPlacemark());
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