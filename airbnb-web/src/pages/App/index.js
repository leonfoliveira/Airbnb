import React, { useState, useCallback } from 'react';
import { Container } from './styles';
import MapQL from 'react-map-gl';

const TOKEN = process.env.REACT_APP_MAPBOX_KEY;

function Map({ width, height }) {
  const [viewport, setViewport] = useState({
    latitude: -27.2108001,
    longitude: -49.6446024,
    zoom: 12.8,
    bearing: 0,
    pitch: 0,
  });

  return (
    <MapQL
      width={width}
      height={height}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxApiAccessToken={TOKEN}
      onViewportChange={viewport => setViewport(viewport)}
    />
  );
}

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const div = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <Container ref={div}>
      <Map width={width} height={height} />
    </Container>
  );
}

export default App;
