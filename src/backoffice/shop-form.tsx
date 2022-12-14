import * as Leaflet from 'leaflet';
import React, { useState } from 'react';
import { createModel, DispatchWithCallback, EditComponentParam, OnClick, useEdit } from 'react-hook-core';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { inputEdit, Status } from 'uione';
import { getShops } from './service';
import { Shop } from './service/shop/shop';
interface InternalState {
  shop: Shop;
}

const createShop = (): Shop => {
  const shop = createModel<Shop>();
  return shop;
};
const initialize = (id: string | null, load: (id: string | null) => void, set: DispatchWithCallback<Partial<InternalState>>) => {
  load(id);
};

const initialState: InternalState = {
  shop: {} as Shop
};

const param: EditComponentParam<Shop, string, InternalState> = {
  createModel: createShop,
  initialize
};
interface Props {
  state: InternalState;
  setState: DispatchWithCallback<Partial<InternalState>>;
}
function ShopMarker({ state, setState }: Props) {
  const map = useMapEvents({
    click(e: Leaflet.LeafletMouseEvent) {
      const { lat, lng } = e.latlng;
      setState({ shop: { ...state.shop, longitude: lat, latitude: lng } });
    },
  });
  return state.shop === null ? null : (
    <Marker position={[state.shop.longitude ?? 1, state.shop.latitude ?? 1]}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export const ShopForm = () => {
  const refForm = React.useRef();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { resource, setState, updateState, flag, save, back, state } = useEdit<Shop, string, InternalState>(refForm, initialState, getShops(), inputEdit(), param);
  const shop = state.shop;

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = (e: OnClick) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  React.useEffect(() => {
    const L = require('leaflet');

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
  }, []);

  const navigateUpload = (e: OnClick) => {
    e.preventDefault();
    navigate(`upload`);
  };

  return (
    <div className='view-container'>
      <form id='cinemaForm' name='cinemaForm' model-name='location' ref={refForm as any}>
        <header>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={back} />
          <h2>{flag.newMode ? resource.create : resource.edit} location</h2>
          {!flag.newMode && <h2 onClick={e => navigateUpload(e)}>Upload</h2>}

        </header>
        <div className='row'>
          <div className='col s12 m6'>
            <button onClick={openModal}>Map</button>
          </div>
        </div>
        <div className='row'>
          <label className='col s12 m6'>
            Name
            <input
              type='text'
              id='name'
              name='name'
              value={shop.name}
              readOnly={!flag.newMode}
              onChange={updateState}
              maxLength={20} required={true}
              placeholder='Name' />
          </label>
          <label className='col s12 m6'>
            Type
            <input
              type='text'
              id='type'
              name='type'
              value={shop.type}
              readOnly={!flag.newMode}
              onChange={updateState}
              maxLength={20} required={true}
              placeholder='Type' />
          </label>
          <label className='col s12 m6'>
            Longitude
            <input
              type='text'
              id='longitude'
              name='longitude'
              value={shop.longitude}
              readOnly
              onChange={updateState}
              maxLength={20} required={true}
              placeholder='Longitude' />
          </label>
          <label className='col s12 m6'>
            Latitude
            <input
              type='text'
              id='latitude'
              name='latitude'
              value={shop.latitude}
              readOnly
              onChange={updateState}
              maxLength={40} required={true}
              placeholder='Latitude' />
          </label>
          <label className='col s12 m6'>
            Description
            <input
              type='text'
              id='description'
              name='description'
              value={shop.description}
              onChange={updateState}
              maxLength={40} required={true}
              placeholder='Description' />
          </label>
          {/* <label className='col s12 m6'>
            Thumbnail
            <input
              type='text'
              id='thumbnail'
              name='thumbnail'
              value={location.thumbnail}
              onChange={updateState}
              maxLength={40}
              placeholder='Thumbnail' />
          </label> */}
          {/* <label className='col s12 m6'>
            ImageURL
            <input
              type='text'
              id='imageURL'
              name='imageURL'
              value={location.imageURL}
              onChange={updateState}
              required={true}
              placeholder='ImageURL' />
          </label> */}
          <div className='col s12 m6 radio-section'>
            {resource.status}
            <div className='radio-group'>
              <label>
                <input
                  type='radio'
                  id='active'
                  name='status'
                  onChange={updateState}
                  value={Status.Active} checked={shop.status === Status.Active} />
                {resource.yes}
              </label>
              <label>
                <input
                  type='radio'
                  id='inactive'
                  name='status'
                  onChange={updateState}
                  value={Status.Inactive} checked={shop.status === Status.Inactive ? true : !shop.status ?? true} />
                {resource.no}
              </label>
            </div>
          </div>
        </div>
        <footer>
          {!flag.readOnly &&
            <button type='submit' id='btnSave' name='btnSave' onClick={save}>
              {resource.save}
            </button>}
        </footer>
      </form>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Modal'
        // portalClassName='modal-portal'
        className='modal-portal-content small-width-height'
        bodyOpenClassName='modal-portal-open'
        overlayClassName='modal-portal-backdrop'
      >
        <div className='view-container profile-info'>
          <form model-name='data'>
            <header>
              <h2>Map</h2>
              <button type='button' id='btnClose' name='btnClose' className='btn-close' onClick={closeModal} />
            </header>
            <div >
              <MapContainer
                center={{ lat: 10.854886268472459, lng: 106.63051128387453 }}
                zoom={13}
                // maxZoom={100}
                attributionControl={true}
                zoomControl={true}
                scrollWheelZoom={true}
                dragging={true}
                easeLinearity={0.35}
                style={{ height: '550px', width: '100%' }}
              >
                <TileLayer
                  attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <ShopMarker state={state} setState={setState} />
              </MapContainer>
            </div>
            <footer>
              <button type='button' id='btnSave' name='btnSave' onClick={closeModal}>
                OK
              </button>
            </footer>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};
