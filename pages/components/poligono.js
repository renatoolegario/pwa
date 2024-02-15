import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import data from './arquivo.json'; // Importe o arquivo JSON

const MapWithPolygon = () => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-47.4, -19.4], // Defina o centro do mapa
      zoom: 12 // Defina o nível de zoom do mapa
    });

    map.on('load', () => {
      // Iterar sobre os recursos (features) no arquivo JSON
      data.features.forEach(feature => {
        // Adicionar cada polígono como uma camada ao mapa
        map.addLayer({
          'id': feature.properties.NOME_FAZEN + feature.properties.TALHAO,
          'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': feature.geometry
            }
          },
          'layout': {},
          'paint': {
            'fill-color': '#0080ff',
            'fill-opacity': 0.5
          }
        });

        // Adicionar um contorno preto ao redor do polígono
        map.addLayer({
          'id': feature.properties.NOME_FAZEN + feature.properties.TALHAO + '_outline',
          'type': 'line',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': feature.geometry
            }
          },
          'layout': {},
          'paint': {
            'line-color': '#000',
            'line-width': 3
          }
        });
      });
    });

    // Limpeza do mapa quando o componente é desmontado
    return () => map.remove();
  }, []);

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default MapWithPolygon;
