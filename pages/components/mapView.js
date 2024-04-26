import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapView = () => {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    const map = L.map(mapRef.current).setView([41.89, -87.62], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }, []);

  return <div ref={mapRef} className="h-full" />;
};

export default MapView;
