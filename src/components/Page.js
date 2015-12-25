import React from 'react';

import Chart from './Chart';


class Page extends React.Component {
    constructor() {
        super();

        this.state = {
            filterText: '',
            inStockOnly: false
        }
    }

    render() {
        return (
            <div>
                <Chart/>
            </div>
        )
    }
}


export default Page;
