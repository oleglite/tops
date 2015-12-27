import ajax from '../utils/ajax';
import settings from '../settings';
import store from '../store'


export let ACTIONS = {
    RATES_LOADED: 'RATES_LOADED'
}


export function loadWeekRates () {
    var url = settings.SERVICE_URL + 'api/rates/week';

    ajax(url, {
        method: 'GET',
        success: function (data) {
            store.dispatch({type: ACTIONS.RATES_LOADED, rates: data})
        }
    });
}
