import React from 'react';
import { Marker } from 'react-map-gl';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Pin } from './styles';

const intlMonetary = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

const Properties = ({ properties }) => {
  const match = useRouteMatch();

  return properties.map(property => (
    <Marker
      key={property.id}
      longitude={property.longitude}
      latitude={property.latitude}
    >
      <Pin>
        <Link
          to={{
            pathname: `${match.url}/property/${property.id}`,
            state: {
              modal: 'PROPERTY',
            },
          }}
        >
          {intlMonetary.format(property.price)}
        </Link>
      </Pin>
    </Marker>
  ));
};

Properties.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      longitude: PropTypes.number,
      latitude: PropTypes.number,
    })
  ).isRequired,
};

export default Properties;
