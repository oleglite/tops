import React from 'react'
import _ from 'lodash'

import Chart from './Chart'
import store from '../store'
import {loadWeekRates} from '../actions/service'


const CURRENCIES = {
    'USD': 'green',
    'EUR': 'blue',
    'RUB': 'red'
}



class Page extends React.Component {
    constructor () {
        super();

        store.subscribe(function () {
            this.setState(store.getState())
        }.bind(this))
    }

    componentDidMount () {
        loadWeekRates()
    }

    render () {
        var charts;

        var weekRates = _.get(this.state, 'charts.weekRates')
        if (!_.isEmpty(weekRates)) {
            charts = (
                <div>
                    <Chart days={weekRates.days} values={_.get(weekRates.data, "USD", [])} baseColor="green"/><br/>
                    <Chart days={weekRates.days} values={_.get(weekRates.data, "EUR", [])} baseColor="blue"/><br/>
                    <Chart days={weekRates.days} values={_.get(weekRates.data, "RUB", [])} baseColor="red"/><br/>
                </div>
            )
        }

        return (
            <div>
                {charts}
            </div>
        )
    }
}


export default Page;
