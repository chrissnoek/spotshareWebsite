import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const CategorieList = ({ categories }) => {
  console.log(categories);

  return (
    <div className="">
      <h2 className="text-black mb-2">Zoek locatie op categorie</h2>
      <div className="flex flex-wrap">
        {categories &&
          categories
            .filter((categorie) => categorie.value != "")
            .map((categorie) => (
              <CategorieLabel categorie={categorie} key={categorie.value} />
            ))}
      </div>
    </div>
  );
};

export default CategorieList;

const CategorieLabel = ({ categorie: { label, value } }) => {
  return (
    <Link
      to={`/fotolocaties/categorie/${value}`}
      className="block py-2 px-4 rounded-full mr-2 mb-2 bg-green-100 text-green-400 font-bold hover:bg-green-200 hover:text-green-500"
    >
      {label}
    </Link>
  );
};
