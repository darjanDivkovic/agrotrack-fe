import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, GroundOverlay, Marker } from '@react-google-maps/api';

const MapComponent = ({ plotData, apiKey, mapContainerStyle, zoom }) => {
    const mapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [delayedPlotData, setDelayedPlotData] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const center = {
        lat: plotData.plot_center_coordinates[0],
        lng: plotData.plot_center_coordinates[1],
    };

    const overlayBounds = {
        north: Math.max(...plotData.plot_geojson.features[0].geometry.coordinates[0].map(coord => coord[1])),
        south: Math.min(...plotData.plot_geojson.features[0].geometry.coordinates[0].map(coord => coord[1])),
        east: Math.max(...plotData.plot_geojson.features[0].geometry.coordinates[0].map(coord => coord[0])),
        west: Math.min(...plotData.plot_geojson.features[0].geometry.coordinates[0].map(coord => coord[0])),
    };

    const handleMapLoad = (map) => {
        mapRef.current = map;
        map.setMapTypeId('satellite'); // Ensure the map type is set to satellite
        setMapLoaded(true);
        setTimeout(() => setDelayedPlotData(plotData), 1000); // Delay setting plot data by 1 second
    };

    useEffect(() => {
        // Get user's current location using Geolocation API
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, []);

    const mapOptions = {
        disableDefaultUI: true,  // Disable all default UI
        mapTypeControl: false,  // Disable map type control
        zoomControl: false,  // Disable zoom control
        streetViewControl: false,  // Disable street view control
        fullscreenControl: false,  // Enable fullscreen control
    };

    return (
        <>
            {plotData && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={handleMapLoad}
                    options={mapOptions}
                >
                    {mapLoaded && delayedPlotData && (
                        <>
                            <GroundOverlay
                                url={delayedPlotData.plot_heatmap_url}
                                bounds={overlayBounds}
                            />
                            <Marker position={userLocation} />
                        </>
                    )}
                </GoogleMap>
            )}
        </>
    );
};

export default MapComponent;
