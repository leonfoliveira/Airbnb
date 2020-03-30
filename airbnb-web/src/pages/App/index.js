import React, { useState, useCallback, Fragment } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import MapQL from 'react-map-gl';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

import { Container, ButtonContainer } from './styles';
import api from '../../services/api';
import { logout } from '../../services/auth';
import useDebounce from '../../utils/useDebounce';

import Properties from './components/Properties';
import Button from './components/Button';

const TOKEN = process.env.REACT_APP_MAPBOX_KEY;

function Map({ width, height }) {
  const [viewport, setViewport] = useState({
    latitude: -22.684172,
    longitude: -45.716829,
    zoom: 13.5,
    bearing: 0,
    pitch: 0,
  });

  const [properties, setProperties] = useState([]);

  const history = useHistory();

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

  return (
    <Fragment>
      <MapQL
        width={width}
        height={height}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => setViewport(viewport)}
        onViewStateChange={updatePropertiesLocalization}
      >
        <Properties properties={properties} />
      </MapQL>

      <ButtonContainer>
        <Button color="#222" onClick={handleLogout}>
          <FaTimes />
        </Button>
      </ButtonContainer>
    </Fragment>
  );
}

const RouterMap = withRouter(Map);
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
      <RouterMap width={width} height={height} />
    </Container>
  );
}

Map.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default App;
