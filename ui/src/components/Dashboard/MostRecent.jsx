import React, { useState } from "react";
import useConstructor from "../ConstructorHook.jsx";
import store from "../../store.js";
import graphQLFetch from "../../graphQLFetch.js";
import SocialCard from "./SocialCard.jsx";

const MostRecent = () => {
  const [recentPhotos, setRecentPhotos] = useState();

  const getMostRecent = async () => {
    let _recentPhotos = store.initialData ? store.initialData : null;
    delete store.initialData;
    if (!_recentPhotos) {
      _recentPhotos = await MostRecent.fetchData();
    }
    setRecentPhotos(_recentPhotos);
  };

  useConstructor(() => {
    getMostRecent();
  });

  return (
    <div className="container px-6 py-6">
      <h2>Meest Recent</h2>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {recentPhotos &&
          recentPhotos.photos.map((photo) => {
            return <SocialCard key={photo.id} photo={photo} />;
          })}
      </div>
    </div>
  );
};

export default MostRecent;

MostRecent.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query recentPhotos{
    photos(limit: 6, sort:"createdAt:desc") {
createdAt
      title
      desc
      photo {
          url
      }

      comments {
        body
        user {
          profilePicture {
            url
          }
          slug
          username 
        }
      }
      slug
      date
      brand

      shutterspeed
      iso
      aperture
      camera
      likes
      focalLength
usersLike {
id
}
      location {
          longitude
          latitude
          id
          title
          slug
      }
      user {
        id
        slug
        username
        firstname
        lastname
        profilePicture {
            url
          }
      }
    }
  }`;

  const vars = {};
  const result = await graphQLFetch(query, vars, true);
  return result;
};
