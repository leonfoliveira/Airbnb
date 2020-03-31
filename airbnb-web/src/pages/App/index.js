import React, { useState, Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapQL from 'react-map-gl';
import { FaTimes, FaPlus, FaMapMarker } from 'react-icons/fa';

import { Container, ButtonContainer, PointReference } from './styles';
import api from '../../services/api';
import { logout } from '../../services/auth';
import useDebounce from '../../utils/useDebounce';

import Properties from './components/Properties';
import Button from './components/Button';

const TOKEN = process.env.REACT_APP_MAPBOX_KEY;

function Map() {
  const [viewport, setViewport] = useState({
    latitude: -22.684172,
    longitude: -45.716829,
    zoom: 13.5,
    bearing: 0,
    pitch: 0,
  });
  const [properties, setProperties] = useState([]);
  const [addActivate, setAddActivate] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const loadProperties = async () => {
    const { latitude, longitude } = viewport;
    try {
      const response = await api.get('/properties', {
        params: { latitude, longitude },
      });
      setProperties(
        response.data.map(property => ({
          ...property,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
          price: parseFloat(property.price),
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updatePropertiesLocalization = useDebounce(loadProperties, 500);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const handleAddProperty = () => {
    const { latitude, longitude } = viewport;
    history.push(
      `${location.pathname}/properties/add?latitude=${latitude}&longitude=${longitude}`,
      //'/properties',
      {
        background: location,
      }
    );

    setAddActivate(false);
  };

  const renderActions = () => (
    <ButtonContainer>
      <Button color="#fc6963" onClick={() => setAddActivate(true)}>
        <FaPlus></FaPlus>
      </Button>

      <Button color="#222" onClick={handleLogout}>
        <FaTimes />
      </Button>
    </ButtonContainer>
  );

  const renderButtonAdd = () =>
    addActivate && (
      <PointReference>
        <FaMapMarker></FaMapMarker>
        <div>
          <button onClick={handleAddProperty} type="button">
            Adicionar
          </button>
          <button onClick={() => setAddActivate(false)} className="cancel">
            Cancelar
          </button>
        </div>
      </PointReference>
    );

  return (
    <Fragment>
      <MapQL
        width={window.innerWidth}
        height={window.innerHeight}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => setViewport(viewport)}
        onViewStateChange={updatePropertiesLocalization}
      >
        {!addActivate && <Properties properties={properties} />}
      </MapQL>
      {renderActions()}
      {renderButtonAdd()}
    </Fragment>
  );
}

const App = () => (
  <Container>
    <Map />
  </Container>
);

export default App;
