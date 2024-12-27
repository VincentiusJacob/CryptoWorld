import { Col, Typography, Row, Card } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./News.css";
import { useGetNewsQuery } from "../Services/cryptoNews";

export default function News() {
  const { data, isFetching } = useGetNewsQuery();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    if (data) {
      setNewsData(data);
    }
  }, [data]);
  console.log(newsData);
  return (
    <div className="newsContainer">
      <Row gutter={[32, 32]}>
        {newsData
          ? newsData.map((news) => {
              return (
                <Col xs={28} lg={8} sm={16}>
                  <Link to={news.url}>
                    <Card title={news.title} hoverable>
                      <p> {news.description} </p>
                    </Card>
                  </Link>
                </Col>
              );
            })
          : null}
      </Row>
    </div>
  );
}
