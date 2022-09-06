import React from 'react';
import { useState, useEffect } from 'react';
import {Shop,  useShopsService} from '../service';
import { useParams } from 'react-router-dom';
import { alert, handleError, message, useResource, storage } from 'uione';
import { Carousel, CarouselImageItem, CarouselVideoItem } from 'reactx-carousel';
import {
  User,
  useMyProfileService
} from '../../my-profile/my-profile';
import './carousel.css';

export const ShopPhoto = () => {
  const params = useParams();
  const [shop, setShop] = useState<Shop>();
  const shopService = useShopsService();
  const [currClass, setCurrClass] = useState<string>('');
  const [user, setUser] = useState<User>({} as any);
  const service = useMyProfileService();

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const load = async () => {
    const { id } = params;
    const currentShop = await shopService.load(id || '');
    setCurrClass('rate');
    if (currentShop) {
      setShop(currentShop);
    }
    service.getMyProfile('77c35c38c3554ea6906730dbcfeca0f2').then((profile) => {
      if (profile) {
        setUser(profile);
        // setBio(profile.bio || '');
        // setUploadedCover(profile.coverURL);
        // setUploadedAvatar(profile.imageURL);
      }
    });
  };


  if (shop && window.location.pathname.includes('photo')) {
    return (
      <div className='col s12 m12 l12'>
        <section className='row'>
                <div className='user-carousel-container location-user-carousel-container'>
                  <Carousel infiniteLoop={true}>
                    {/* {location.upload
                      ? location.upload.map((itemData, index) => { */}
                    {user.gallery
                      ? user.gallery.map((itemData, index) => {
                        switch (itemData.type) {
                          case 'video':
                            return (
                              <CarouselVideoItem
                                key={index}
                                type={itemData.type}
                                src={itemData.url}
                              />
                            );
                          case 'image':
                            return (
                              // <img className='image-carousel' src={itemData.url} key={index} alt={itemData.url} draggable={false}/>
                              <CarouselImageItem
                                key={index}
                                src={itemData.url}
                              />
                            );
                          case 'youtube':
                            return (
                              <div className='data-item-youtube'>
                                <iframe
                                  src={itemData.url + '?enablejsapi=1'}
                                  frameBorder='0'
                                  className='iframe-youtube'
                                  title='youtube video'
                                ></iframe>
                                ;
                              </div>
                            );
                          default:
                            return <></>;
                        }
                      })
                      : [<></>]}
                  </Carousel>
                </div>
              </section>
      </div>
    );
  }
  return null;
};
