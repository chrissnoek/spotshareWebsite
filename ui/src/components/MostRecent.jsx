import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoCard from "./PhotoCard.jsx";
import useConstructor from "./ConstructorHook.jsx";

const MostRecent = () => {
  const [photos, setPhotos] = useState();

  const getPhotos = async () => {
    let _photos = store.initialData ? store.initialData : null;
    delete store.initialData;
    if (!_photos) {
      _photos = await MostRecent.fetchData(null, props.location.search);
    }
    setPhotos(_photos);
  };

  useConstructor(() => {
    getPhotos();
  });

  return (
    <div className="relative px-8 py-4">
      <div className="absolute top-0 left-0 bg-gray-900 h-32 w-full"></div>
      <div className="relative">
        <h2 className="text-white mb-4">Meest Recent</h2>

        <Swiper spaceBetween={0} slidesPerView="auto">
          {photos &&
            photos.map((photo) => {
              return (
                <SwiperSlide key={photo.id}>
                  <PhotoCard photo={photo} key={photo.id} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default MostRecent;
