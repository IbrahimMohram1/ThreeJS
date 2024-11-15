import React, { useEffect, useRef, useState } from 'react'
import Data from "./data.json";
import Map from "react-map-gl"
;
import DeckGL, { GeoJsonLayer, H3HexagonLayer, HeatmapLayer, MapView, ScatterplotLayer, Tile3DLayer, TripsLayer } from "deck.gl";import {CesiumIonLoader} from '@loaders.gl/3d-tiles';

const MapAccess = 'pk.eyJ1IjoiaWJyYWhpbXNhbWlybW9ocmFtMSIsImEiOiJjbTNpMHNmbmcwY3p4MmtzYXQ2MnZoYzQ3In0.XdMu33ZIsGgUQUOyU9DtVg'; 
const mapStyle = "mapbox://styles/mapbox/streets-v11";

export default function Map3D() {
    const viewState ={
  latitude: 42.8283,
  longitude: -95.5795,
  zoom: 6,
  bearing: 0,
  pitch: 30
};
  return <>
     <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={[
          new GeoJsonLayer({
            id: "scatterplot-layer",
            data: Data,
            filled:true,
            pointRadiusMinPixels:5,
            pointRadiusScale:2000,
            getPointRadius:f => 5,
            getPosition: (d) => d.position,
            getFillColor: [86,144,58,250],
          }),
        ]}
      >
        <Map mapboxAccessToken={MapAccess} mapStyle={mapStyle} />
      </DeckGL>

  
  </>
}
