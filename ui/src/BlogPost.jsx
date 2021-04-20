import React, { useState, useEffect } from "react";
import graphQLFetch from "./graphQLFetch.js";
import store from "./store.js";
import { Redirect } from "react-router-dom";
import useConstructor from "./components/ConstructorHook.jsx";
import SanitizedHTML from "react-sanitized-html";

const BlogPost = (props) => {
  const [article, setArticleBySlug] = useState(null);

  const getInitialArticle = async (props) => {
    let _article = store.initialData ? store.initialData : null;
    delete store.initialData;
    if (!_article) {
      _article = await BlogPost.fetchData(props.match);
    }
    setArticleBySlug(_article);
  };

  useConstructor(() => {
    getInitialArticle(props);
  });

  useEffect(() => {
    getInitialArticle(props);
  }, [props.match]);

  if (article === null) {
    console.log("slug is nullllll");
    return <Redirect to="/niet-gevonden" />;
  }

  return (
    <div id="page" className="px-6 py-24">
      {article && (
        <div className="w-full">
          <h1 className="font-bold text-4xl leading-tight text-center">
            {article.articleBySlug.title}
          </h1>
          <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative">
            <img className="" src="" alt={article.articleBySlug.title} />
          </div>
          <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
            <SanitizedHTML
              allowedAttributes={{ a: ["href"], img: ["src"] }}
              allowedTags={["a", "figure", "img"]}
              html={article.articleBySlug.body}
            />
          </div>
        </div>
      )}
    </div>
  );
};

BlogPost.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query articleBySlug($slug: String!){
        articleBySlug(slug: $slug) {
            id
            title
            body
            slug
        }
    }`;

  let {
    params: { [0]: slug },
  } = match;
  slug = slug.replace(/\//g, "");
  const result = await graphQLFetch(query, { slug }, true);
  console.log(result);
  return result;
};

export default BlogPost;
