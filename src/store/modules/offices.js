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
            return dispatch('updateOffices');
        },

        async updateOffices({ commit, rootState, dispatch }) {
            let offices = [];
            if (rootState.currentCountry === RUSSIA) {
                offices = Array.from(await import('@/russiaOffices.json'));

            } else if (rootState.currentCountry === BELARUS) {
                offices = Array.from(await import('@/belarusOffices.json'));
            }

            await dispatch('addPlacemarksToOffices', offices);
            commit('offices', offices);
        },

        addPlacemarksToOffices({ state, dispatch, getters }, offices) {
            offices.forEach(async office => {
                office.getPlacemark = await dispatch('map/createPlacemark', {
                        coords        : office.coords,
                        balloonContent: getters.formattedToHTML(office),
                    },
                    { root: true });
            });
        },
    },
    getters   : {
        offices(state) {
            return state.offices;
        },

        groupedByCity(state) {
            const grouped = {};
            const result = [];

            state.offices.forEach(off => {
                if (grouped[off.city]) {
                    grouped[off.city].push(off);
                } else {
                    grouped[off.city] = [ off ];
                }
            });

            for (let key in grouped) {
                result.push({ city: key, offices: grouped[key] });
            }

            return result;
        },

        formattedToHTML: () => (office) => {
            const phoneNumber = (number) => `<span>${number}</span>`;
            let numbers = ``;
            office.phoneNumbers.forEach(n => numbers += phoneNumber(n));

            return `
                <header class="balloon__header">
                            ОФИС ${office.name}
                </header>
                <main class="balloon__body">
                    <span>${office.owner}</span>
                    <span class="balloon_phoneNumbers">${numbers}</span>    
                    <span class="balloon__email">${office.email}</span>            
                </main>     
            `;
        },
    },
    namespaced: true,
};