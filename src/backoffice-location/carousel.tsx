import { useEffect, useState } from 'react';
import { Carousel, CarouselImageItem, CarouselVideoItem } from 'reactx-carousel';

import { OnClick } from 'react-hook-core';
import { useNavigate } from 'react-router-dom';
import { FileInfo } from 'reactx-upload';
import { getShops } from '../backoffice/service';
import { Shop } from '../backoffice/service/shop/shop';
import './carousel.css';

interface Props {
  edit: (e: any, id: string) => void;
  shop: Shop;
}
export default function ShopCarousel({ edit, shop }: Props) {
  const [carousel, setCarousel] = useState(false);
  const [files, setFiles] = useState<FileInfo[]>();
  const navigate = useNavigate();
  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop, carousel]);
  const shopService = getShops();
  const handleFetch = async () => {
    if (!carousel || files) { return; }
    let res;
    try {
      res = await shopService.fetchImageUploaded(shop.id);
    } catch (error) { }
    if (res && res.length > 0) {
      for (const item of res) {
        if (item.type === 'youtube') {
          const thumbnails = await shopService.fetchThumbnailVideo(
            item.url
          );
          item.thumbnail = thumbnails.thumbnail;
          item.standardThumbnail = thumbnails.standardThumbnail;
          item.mediumThumbnail = thumbnails.mediumThumbnail;
          item.maxresThumbnail = thumbnails.maxresThumbnail;
          item.hightThumbnail = thumbnails.hightThumbnail;
        }
      }
      setFiles(res);
    } else {
      const info: FileInfo[] = [
        {
          source: '',
          type: 'image',
          url: shop.imageURL || '',
        },
      ];
      setFiles(info);
    }
  };

  const toggleCarousel = (e: OnClick, enable: boolean) => {
    e.preventDefault();
    setCarousel(enable);
  };

  // const navigateEdit = (e: OnClick) => {
  //   e.preventDefault();
  //   navigate(`edit/${location.id}`);
  // };
  return (
    <>
      {carousel ? (
        <div className='col s12 m6 l4 xl3 '>
          <div
            className='user-carousel-container '
            onClick={(e) => toggleCarousel(e, false)}
          >
            {files && files.length > 0 ? (
              <Carousel infiniteLoop={true}>
                {files.map((itemData, index) => {
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
                        <CarouselImageItem key={index} src={itemData.url} />
                      );
                    case 'youtube':
                      return (
                        <CarouselVideoItem
                          key={index}
                          type={itemData.type}
                          src={itemData.url}
                        />
                      );
                    default:
                      return <></>;
                  }
                })}
              </Carousel>
            ) : (
              ''
            )}
            <div className='user-carousel-content'>
              <h3
                onClick={(e) => edit(e, shop.id)}
                className={shop.status === 'I' ? 'inactive' : ''}
              >
                {shop.name}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <li
          className='col s12 m6 l4 xl3 card '
          
        >
          <section>
            <div
              className='cover'
              style={{
                backgroundImage: `url('${shop.imageURL}')`,
              }}
              onClick={(e) => toggleCarousel(e, true)}
             ></div>
            <h3 onClick={(e) => edit(e, shop.id)}>{shop.name}</h3>
          </section>
        </li>
      )}
    </>
  );
}
