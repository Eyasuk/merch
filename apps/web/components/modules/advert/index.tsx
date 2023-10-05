'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAdvertService } from 'utils/services/advertService';

import styles from './advert.module.scss';

type ImageProps = {
  name: string;
  _id: string;
  alt: string;
  image: string;
};

export default function AdvertBox(): JSX.Element {
  const [currentImage, setCurrentImage] = useState<ImageProps[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const getPhotos = async () => {
      const response = await getAdvertService();
      setCurrentImage(response.data.data);
    };

    getPhotos();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setZoomed(true);
      setTimeout(() => {
        if (currentImage.length > 0) {
          setImageIndex((prevIndex) => (prevIndex + 1) % currentImage.length);
        }
        setZoomed(false);
      }, 300); // Duration of the zoom animation in milliseconds
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [currentImage]);

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {currentImage.length > 0 && (
          <Image
            src={currentImage[imageIndex].image}
            alt={currentImage[imageIndex].alt}
            fill={true}
            className={`${styles.image} ${zoomed ? styles.zoomed : ''}`}
          />
        )}
      </div>
    </div>
  );
}
