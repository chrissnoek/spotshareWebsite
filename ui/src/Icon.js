import L from 'react-leaflet-universal';

const customMarker = new L.Icon({
    iconUrl: require('../public/images/mapMarker.svg'),
    iconRetinaUrl: require('../public/images/mapMarker.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { customMarker };