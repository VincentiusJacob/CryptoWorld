import { Link } from "react-router-dom";
import { Typography, Row, Col, Input, Card, Avatar } from "antd";
import searchIcon from "../src/assets/searchIcon.png";
import "./Exhange.css";
import { useEffect, useState } from "react";
import { useGetExchangeQuery } from "../Services/cryptoExchange";

export default function Exchange(props) {
  const count = props.simplified ? 10 : 100;
  const { data, isFetching } = useGetExchangeQuery(count);
  const [exchangeDatas, setExchangeDatas] = useState([]);
  const [filteredExchangeDatas, setFilteredExchangeDatas] = useState([]);

  useEffect(() => {
    if (data) {
      setExchangeDatas(data);
      setFilteredExchangeDatas(data);
    }
  }, [data]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const handleSearch = (value) => {
    const filteredData = exchangeDatas.filter((exchange) =>
      exchange.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredExchangeDatas(filteredData);
  };

  return (
    <div className="exchangeContainer">
      {!props.simplified ? (
        <div className="searchExchangeBox">
          <Avatar
            className="searchAvatar"
            src={searchIcon}
            size="small"
          ></Avatar>
          <Input
            className="searchExchange"
            placeholder="Search Exchange"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      ) : null}

      <Row gutter={[32, 32]}>
        {filteredExchangeDatas.map((exchange) => (
          <Col lg={20} xs={24} sm={12} key={exchange.id}>
            <Link to={exchange.url}>
              <Card
                title={`${exchange.trust_score_rank}. ${exchange.name}`}
                extra={<Avatar src={exchange.image} size="small" />}
                hoverable
              >
                <p> Country : {exchange.country}</p>
                <p> Rank : {exchange.trust_score_rank} </p>
                <p> Year Established : {exchange.year_established} </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
