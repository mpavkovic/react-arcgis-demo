import React from 'react';
import { Map } from 'react-arcgis';

import IncomeFeatureLayer from './IncomeFeatureLayer';

export default class ArcgisMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            view: null,
        };

        this.handleMapFail = this.handleMapFail.bind(this);
        this.handleMapLoad = this.handleMapLoad.bind(this);
    }

    handleMapFail(err) {
        console.error(err);
    }

    handleMapLoad(map, view) {
        this.setState({ map, view });
    }

    render() {
        //return <WebMap id='7ecc206a78e24abb9b55fbcb49dcdc72' onLoad={this.handleMapLoad} onFail={this.handleMapFail} />
        const mapProperties = {
            basemap: 'gray',
        };

        const viewProperties = {
            center: [ -87.6500500, 41.8500300 ],
            zoom: 10,
        };

        return (
            <Map
                mapProperties={mapProperties}
                viewProperties={viewProperties}
                onLoad={this.handleMapLoad}
                onFail={this.handleMapFail}
                on
            >
                <IncomeFeatureLayer />
            </Map>
        );
    }
}