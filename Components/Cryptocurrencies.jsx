import { Typography, Row, Col, Card, Avatar, Input } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import searchIcon from "../src/assets/searchIcon.png";
import "./Cryptocurrencies.css";
import { useGetCryptosQuery } from "../Services/cryptoAPI";

export default function Cryptocurrencies(props) {
  const count = props.simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  console.log(data);
  const [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchCrypto.toLowerCase());
    });
    setCryptos(filteredData);
  }, [data, searchCrypto]);
  useEffect(() => {
    if (data) {
      setCryptos(data?.data?.coins);
    }
  }, [data]);

  return (
    <div className="cryptoListContainer">
      {!props.simplified ? (
        <div className="searchCryptoContainer">
          <div className="searchCrypto">
            <Avatar
              className="searchAvatar"
              src={searchIcon}
              size="small"
            ></Avatar>
            <Input
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchCrypto(e.target.value)}
            />
          </div>
        </div>
      ) : null}

      <Row gutter={[32, 32]}>
        {cryptos
          ? cryptos.map((coins) => (
              <Col xs={24} sm={12} lg={6} className="crypto-coins">
                <Link to={`/crypto/${coins.uuid}`}>
                  <Card
                    title={`${coins.rank}. ${coins.name}`}
                    extra={<Avatar src={coins.iconUrl} size="small" />}
                    hoverable
                  >
                    <p> Price : ${millify(coins.price)} </p>
                    <p> Change : ${millify(coins.change)}</p>
                    <p> Market Cap: ${millify(coins.marketCap)}</p>
                  </Card>
                </Link>
              </Col>
            ))
          : null}
      </Row>
    </div>
  );
}
