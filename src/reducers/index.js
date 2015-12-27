import _ from 'lodash'

import charts from './charts'


const rootReducer = function (state = {}, action) {
    return {
        charts: charts(_.get(state.charts), action)
    }
}

export default rootReducer
