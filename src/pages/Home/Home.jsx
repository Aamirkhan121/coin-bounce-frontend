import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
// import styles from "./Home.module.css";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApicall() {
      const response = await getNews();
      console.log(response);
      setArticles(response);
    })();
    setArticles([]);
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  if (articles.length === 0) {
    return <Loader text={"homepage"} />;
  }

  return (
    <>
      <div className='text-center my-4'>Latest Articles</div>
      <div className="container">
        <div className="row">
          {articles.map((article) => (
            <div key={article.url} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className='card ' onClick={() => handleCardClick(article.url)}>
                <img src={article.urlToImage} className="card-img-top" alt="error" />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
