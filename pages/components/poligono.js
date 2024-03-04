import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import data from './arquivo.json'; // Importe o arquivo JSON

const MapWithPolygon = () => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-47.4, -19.4], // Defina o centro do mapa
      zoom: 12 // Defina o nível de zoom do mapa
    });

    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    // Adicionar o marcador da posição atual da pessoa
    let marker = new mapboxgl.Marker({
      color: '#FF5733' // Cor do marcador
    });

    map.on('load', () => {
      let cont = 0;
      // Iterar sobre os recursos (features) no arquivo JSON
      data.features.forEach(feature => {
        // Adicionar cada polígono como uma camada ao mapa
        cont = cont + 1;
        const cores = [
          '#FF5733', // Cor 1
          '#3366FF', // Cor 2
          '#1E8449', // Cor 3
          '#8E44AD', // Cor 4
          '#16A085', // Cor 5
          '#34495E', // Cor 6
          '#FF6347', // Cor 7
          '#FF4500', // Cor 8
          '#FF1493', // Cor 9
          '#F4D03F', // Cor 10
          '#4CAF50', // Cor 11
          '#FFA500', // Cor 12
          '#3498DB', // Cor 13
          '#9B59B6', // Cor 14
          '#2ECC71', // Cor 15
          '#E74C3C', // Cor 16
          '#1ABC9C', // Cor 17
          '#F39C12', // Cor 18
          '#C0392B', // Cor 19
          '#2980B9'  // Cor 20
        ];
                
        
        if(cont == 20){
          cont = 1;
        }
        map.addLayer({
          'id': feature.properties.DESC_TALHA,
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
            'fill-color': cores[cont],
            'fill-opacity': 0.5
          },
          'metadata': {
            'description': `Talhão: ${feature.properties.DESC_TALHA},<br /> Área: ${feature.properties.AREA_TOTAL}`
          }
        });

        // Adicionar um contorno preto ao redor do polígono
        map.addLayer({
          'id': feature.properties.DESC_TALHA + '_outline',
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

      // Adicionar evento de mousemove
      map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point);
        const talhao = features.length > 0 ? features[0] : null;
        
        // Verificar se um talhão foi encontrado
        if (talhao) {
          const talhaoNome = talhao.layer.id.split('_')[0];
          const layerMetadata = map.getLayer(talhao.layer.id).metadata;
          
          // Exibir ou ocultar o popup conforme necessário
          if (talhaoNome && layerMetadata) {
            const description = layerMetadata.description || 'N/A';
            popup.setLngLat(e.lngLat).setHTML(`
              <div>${talhaoNome}</div>
              <div>${description}</div>
            `).addTo(map);
          } else {
            popup.remove();
          }
        } else {
          popup.remove();
        }
      });

      // Adicionar evento de mouseleave
      map.on('mouseleave', () => {
        popup.remove();
      });

    });

    // Atualizar a posição do marcador quando a localização da pessoa mudar
    navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      
      marker.setLngLat([longitude, latitude]);
      marker.addTo(map); // Adiciona o marcador ao mapa
    });

    // Limpeza do mapa quando o componente é desmontado
    return () => map.remove();
  }, []);

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default MapWithPolygon;
