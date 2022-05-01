export const RUSSIA = 'russia';
export const BELARUS = 'belarus';

const russiaOffices = [
    [ 55.74461754, 37.59412505 ],
    [ 55.71945444, 37.75186805 ],
    [ 54.60593053, 39.76432452 ],
    [ 54.65592554, 39.65759054 ],
    [ 56.81834866, 60.63596592 ],
    [ 56.82719504, 60.59579844 ],
    [ 61.25714069, 73.44636912 ],
    [ 61.27532437, 73.31590647 ],
    [ 52.28426849, 104.31826738 ],
    [ 52.32804228, 104.30178789 ],
];

const belarusOffices = [
    [ 53.89995056, 27.61734449 ],
    [ 53.85937918, 27.47177564 ],
    [ 53.11901991, 26.00154860 ],
    [ 53.13471460, 26.05270369 ],
    [ 52.79309459, 27.99282057 ],
    [ 52.80048212, 27.97908766 ],
    [ 53.91371153, 30.32760914 ],
    [ 53.89769587, 30.35404500 ],
    [ 52.48461243, 31.04869713 ],
    [ 52.35783248, 31.00337853 ],
];

export default {
    state    : {
        ready           : false,
        currentCountry  : RUSSIA,
        map             : undefined,
        coords          : {
            russia : russiaOffices,
            belarus: belarusOffices,
        },
        collectionPoints: undefined,
    },
    mutations: {
        ready(state) {
            state.ready = true;
        },

        map(state, map) {
            // Необходимо замкнуть map, иначе он ломается. (proxy?)
            state.map = () => map;
        },

        country(state, country) {
            state.currentCountry = country;
        },

        setCollection(state, collection) {
            if (collection) {
                state.map()
                     .geoObjects
                     .splice(0, 1, collection);
            }
        },
    },
    actions  : {
        init({ commit, getters, dispatch }) {
            ymaps.ready(() => {
                const newMap = new ymaps.Map('map', {
                    center: [ 55.76, 37.64 ],
                    zoom  : 7,
                });

                [ 'fullscreenControl', 'geolocationControl', 'routeEditor', 'rulerControl', 'searchControl',
                  'trafficControl',
                  'typeSelector', 'routeButtonControl', 'routePanelControl' ].forEach(
                    control => newMap.controls.remove(control));

                commit('map', newMap);
                commit('ready');
                commit('setCollection', getters.pointsCollection);
                dispatch('setIncludingAllBounds');

            });
        },

        setCountry({ commit, getters }, country) {
            commit('country', country);
            commit('setCollection', getters.pointsCollection);
        },

        setIncludingAllBounds({ state, getters }) {
            if (state.ready) {
                ymaps.geoQuery(getters.pointsCollection)
                     .applyBoundsToMap(state.map());
            }
        },
    },
    getters  : {
        pointsCollection(state) {
            if (!state.ready) return null;

            const collection = new ymaps.GeoObjectCollection();
            state.coords[state.currentCountry].forEach(coord => {
                const placemark = new ymaps.Placemark(coord);
                collection.add(placemark);
            });

            return collection;
        },
    },
};