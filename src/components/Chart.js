import React from 'react'
import {Line} from 'rc-chartjs'
import tinycolor from 'tinycolor2'


class Chart extends React.Component {
    static propTypes = {
        days: React.PropTypes.array,
        values: React.PropTypes.array,
        baseColor: React.PropTypes.string
    }

    render () {
        var baseColor = tinycolor(this.props.baseColor)
        var fillColor = baseColor.clone()
        fillColor.setAlpha(0.1)

        var data = {
            labels: _.map(this.props.days, day => day.format('D MMM')),
            datasets: [
                {
                    fillColor: fillColor.toRgbString(),
                    strokeColor: baseColor.toRgbString(),
                    pointColor: baseColor.toRgbString(),
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: baseColor.toRgbString(),
                    data: this.props.values
                }
            ]
        }

        var options = {
            bezierCurveTension: 0.2
        }

        return (
            <Line data={data} options={options} width="400" height="150"/>
        )
    }
}


export default Chart;

