import moment from 'moment'
import _ from 'lodash'


export function lastDays (n) {
    var today = moment().startOf('day')

    return _.chain(_.range(n))
        .map(i => {
            let day = today.clone()
            day.subtract(i, 'days')
            return day
        })
        .reverse()
        .value()
}
