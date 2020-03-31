import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { Form, Modal } from './styles';

import api from '../../services/api';
import useQuery from '../../utils/useQuery';

import Files from './components/Files';

function AddProperty() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    if (!query.has('latitude') || !query.has('longitude')) {
      alert('É necessário definir a latitude e longitude para um imóvel.');
      history.push('/app');
    }

    setLatitude(query.get('latitude'));
    setLongitude(query.get('longitude'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (!title || !address || !price || !latitude || !longitude) {
        setError('Preencha os campos');
        return;
      }

      const {
        data: { id },
      } = await api.post('/properties', {
        title,
        address,
        price,
        latitude,
        longitude,
      });

      if (files.length === 0) history.push('/app');

      let data = new FormData();
      files.map((file, index) =>
        data.append(`image[${index}]`, file, file.name)
      );

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      await api.post(`/properties/${id}/images`, data, config);

      history.push('/app');
    } catch (err) {
      console.log(err);
      setError('Ocorreu algum erro ao adicionar o imóvel');
    }
  };

  const handleCancel = e => {
    e.preventDefault();
    history.push('/app');
  };

  return (
    <Modal>
      <Form
        onSubmit={handleSubmit}
        className={classNames({ 'without-files': !files.length })}
      >
        <h1>Adicionar imóvel</h1>
        <hr />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          onChange={e => setPrice(e.target.value)}
        />
        <Files
          getFiles={() => files}
          handleError={setError}
          handleDrop={setFiles}
        />
        <div className="actions">
          <button type="submit">Adicionar</button>
          <button onClick={handleCancel} className="cancel">
            Cancelar
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddProperty;
