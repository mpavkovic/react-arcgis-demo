import React from 'react';
import ReactDom from 'react-dom';
import { Map } from 'react-arcgis';

import ArcgisMap from './components/ArcgisMap';

ReactDom.render(
    <ArcgisMap />,
    document.getElementById('root'),
);