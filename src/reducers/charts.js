import {ACTIONS} from '../actions/service'

import {lastDays} from '../utils/tools'

export default function charts (state = {}, action) {
    switch (action.type) {
        case ACTIONS.RATES_LOADED:
            var days = lastDays(7)
            var currencies = _.get(state, 'weekRates.currencies', ['USD', 'EUR', 'RUB'])

            function currencyRates (currency) {
                return _.map(days, day => _.get(action, ['rates', day.unix(), currency], 0))
            }

            return {
                weekRates: {
                    days: days,
                    currencies: currencies,
                    data: _.zipObject(currencies, _.map(currencies, currencyRates))
                },
                ...state
            }

        default:
            return state
    }
}
