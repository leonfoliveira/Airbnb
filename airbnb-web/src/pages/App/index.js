import React, { useState, useCallback, Fragment } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import MapQL from 'react-map-gl';
import PropTypes from 'prop-types';
import { FaTimes, FaPlus, FaMapMarker } from 'react-icons/fa';

import { Container, ButtonContainer, PointReference } from './styles';
import api from '../../services/api';
import { logout } from '../../services/auth';
import useDebounce from '../../utils/useDebounce';

import Properties from './components/Properties';
import Button from './components/Button';

const TOKEN = process.env.REACT_APP_MAPBOX_KEY;

function Map({ width, height, match }) {
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
      `${match.url}/properties/add?latitude=${latitude}&longitude=${longitude}`
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
        width={width}
        height={height}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => setViewport(viewport)}
        onViewStateChange={updatePropertiesLocalization}
      >
        {!addActivate && <Properties match={match} properties={properties} />}
      </MapQL>
      {renderActions()}
      {renderButtonAdd()}
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
