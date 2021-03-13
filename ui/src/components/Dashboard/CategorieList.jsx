import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const CategorieList = ({ categories }) => {
  return (
    <div className="relative container px-6 py-4">
      <h2 className="text-black mb-2">Zoek locatie op categorie</h2>
      <div className="flex flex-wrap">
        <Swiper spaceBetween={0} slidesPerView="auto">
          {categories &&
            categories.map((categorie) => (
              <SwiperSlide key={categorie.value}>
                <CategorieLabel categorie={categorie} key={categorie.value} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorieList;

const CategorieLabel = ({ categorie: { label, value } }) => {
  return (
    <Link
      to={`/fotolocaties/categorie/${value}`}
      className="block py-2 px-4 rounded-full mr-2 bg-green-100 text-green-400 font-bold hover:bg-green-200 hover:text-green-500"
    >
      {label}
    </Link>
  );
};
