import { Row, Col, Statistic, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import News from "../Components/News";
import Exchange from "../Components/Exchange";
import { useGetCryptosQuery } from "../Services/cryptoAPI";
import "./Homepage.css";
import { useGetExchangeQuery } from "../Services/cryptoExchange";
import "../Components/Homepage.css";
import Cryptocurrencies from "../Components/Cryptocurrencies";

export default function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const { exchange, isFetchings } = useGetExchangeQuery();

  const globalStats = data?.data?.stats;
  const totalCrypto = globalStats?.total;
  const totalExchange = globalStats?.totalExchanges;
  const marketCap = globalStats?.totalMarketCap;
  const Volume = globalStats?.total24hVolume;
  const totalMarket = globalStats?.totalMarkets;

  if (isFetching) {
    console.log("loading...");
  }
  return (
    <div className="homeContainer">
      <div className="header">
        <Typography.Title level={2} className="heading">
          {" "}
          Global Crypto Stats{" "}
        </Typography.Title>
        <Row className="headerStats">
          <Col span={12}>
            <Statistic title="Total Cryptocurrencies" value={totalCrypto} />{" "}
          </Col>
          <Col span={12}>
            <Statistic title="Total Exchanges" value={totalExchange} />{" "}
          </Col>
          <Col span={12}>
            <Statistic title="Total Market Cap" value={marketCap} />{" "}
          </Col>
          <Col span={12}>
            <Statistic title="Total 24h Volume" value={Volume} />{" "}
          </Col>
          <Col span={12}>
            <Statistic title="Total Market" value={totalMarket} />{" "}
          </Col>
        </Row>
      </div>
      <div className="bodyTopic">
        <div className="topCrypto">
          <Typography.Title level={4} className="body">
            {" "}
            Top 10 Cryptos In The World
          </Typography.Title>
          <Link to="/cryptocurrencies"> Show more</Link>
        </div>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="latestNews">
        <Typography.Title level={4}> Latest Crypto News </Typography.Title>
        <Link to="/"> Show more </Link>
      </div>
      <News simplified={true} />
      <div className="exchangeInfo">
        <Typography.Title level={4}>Exchanges</Typography.Title>
        <Link to="/exchange"> Show more </Link>
      </div>
      <Exchange simplified={true} />
    </div>
  );
}
