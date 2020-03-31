import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Images, Modal } from './styles';

import api from '../../services/api';

const intlMonetary = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

function Property() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`properties/${id}`);

        setProperty(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const renderProperty = () => {
    if (!property) return 'Imóvel não encontrado!';

    return (
      <>
        <div>
          <h1>{property.title}</h1>
          <hr />
          <p>{property.address}</p>
          <Images>
            {property.images.map(image => (
              <img key={image.name} src={image.url} alt={image.path} />
            ))}
          </Images>
          <span>{intlMonetary.format(property.price)}</span>
        </div>
      </>
    );
  };

  return (
    <Modal>
      <Container>{loading ? <p>Carregando</p> : renderProperty()}</Container>
    </Modal>
  );
}

export default Property;
