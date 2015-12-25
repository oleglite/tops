import ajax from './ajax';
import settings from './settings';


export let getWeekRates = function (success) {
    var url = settings.SERVICE_URL + 'api/rates/week';
    ajax(url, {
        method: 'GET',
        success: success
    });
};
