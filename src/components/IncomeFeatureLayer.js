import React from 'react';
import { loadModules } from 'react-arcgis';

export default class IncomeFeatureLayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            featureLayer: null,
        };
    }

    componentWillMount() {
        const { view } = this.props;

        loadModules([ 'esri/layers/FeatureLayer', 'esri/geometry/Polygon', 'esri/core/watchUtils' ]).then(([ FeatureLayer, Polygon, watchUtils ]) => {
            const featureLayer = new FeatureLayer({
                url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Census_Populated_Places/FeatureServer/0',
            });

            const query = featureLayer.createQuery();
            query.outStatistics = [
                {
                    onStatisticField: 'POP2012',
                    outStatisticFieldName: 'POP2012_MIN',
                    statisticType: 'min'
                },
                {
                    onStatisticField: 'POP2012',
                    outStatisticFieldName: 'POP2012_MAX',
                    statisticType: 'max'
                }
            ];

            featureLayer.queryFeatures(query).then(response => {
                const stats = response.features[0].attributes;
                console.log(stats);

                featureLayer.renderer = {
                    type: 'simple',
                    symbol: { type: 'simple-fill' },
                    visualVariables: [
                        {
                            type: 'color',
                            field: 'POP2012',
                            stops: [
                                { value: stats.POP2012_MIN, color: 'lightyellow' },
                                { value: stats.POP2012_MAX, color: 'green' },
                            ],
                        },
                    ],
                };
            });

            watchUtils.whenTrue(view, 'stationary', () => {
                if (view.extent) {
                    console.log(view.extent);
                    query.geometry = view.extent;
                    console.log(query.geometry);
                    featureLayer.queryFeatures(query).then(response => {
                        const stats = response.features[0].attributes;
                        console.log(stats);
                        featureLayer.renderer.visualVariables[0].stops = [
                            { value: stats.POP2012_MIN, color: 'lightyellow' },
                            { value: stats.POP2012_MAX, color: 'green' },
                        ];
                        console.log(featureLayer.renderer);
                        featureLayer.refresh();
                    });
                }
            });

            this.setState({ featureLayer });
            this.props.map.add(featureLayer);
        }).catch(err => console.error(err));
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.featureLayer);
    }
}