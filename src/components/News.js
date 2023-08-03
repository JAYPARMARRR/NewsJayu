import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(0);
    const apiKey = 'c0adc1d26f61400bbd5f59118025fe98';
    const url = `https://newsapi.org/v2/everything?q=apple&from=2023-07-09&to=2023-07-09&sortBy=popularity&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, [page, props.pageSize]);

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + 1);
    const apiKey = 'c0adc1d26f61400bbd5f59118025fe98';
    const url = `https://newsapi.org/v2/everything?q=apple&from=2023-07-09&to=2023-07-09&sortBy=popularity&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: '35px 0px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4 mt-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News;
