import { useEffect, useState } from "react";
import priceImg from "../src/assets/price.png";
import "./Others.css";
import LineChart from "../Components/LineChart";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptosQuery,
  useGetDetailsQuery,
  useGetHistoryQuery,
} from "../Services/cryptoAPI";
import { Col, Select, Typography, Avatar, Row } from "antd";
import { useParams } from "react-router-dom";
import millify from "millify";
const { Option } = Select;

export default function Others() {
  let { coinId } = useParams();
  console.log(`id : ${coinId}`);
  const { data, Fetching } = useGetDetailsQuery(coinId);
  const [selectedCoin, setSelectedCoin] = useState();
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const [timePeriod, settimePeriod] = useState("7d");

  const { data: coinHistory, isFetching } = useGetHistoryQuery({
    coinId,
    timePeriod,
  });
  useEffect(() => {
    if (coinHistory) {
      console.log(coinHistory);
    }
  }, [coinHistory]);
  useEffect(() => {
    if (data) {
      setSelectedCoin(data?.data?.coin);
    }
  }, [data]);

  if (Fetching) {
    return <div> Loading... </div>;
  }

  if (!selectedCoin) {
    return null;
  }

  console.log(selectedCoin);

  return (
    <div className="selectedCoinContainer">
      <Col
        className="selectedCoinHeader"
        style={{ textAlign: "center", borderBottom: "1px solid black" }}
      >
        <Typography.Title level={2} className="title">
          {selectedCoin.name} Price
        </Typography.Title>
        <p> {selectedCoin.description} </p>
        <br></br>
        <Typography.Title level={5}>
          {selectedCoin.name} live price in US dollars. View value statistics,
          market cap, and supply.
        </Typography.Title>
      </Col>
      <Col className="selectedCoinBody">
        <Col className="chartSection">
          <Select
            defaultValue={"7d"}
            className="timeFrame"
            style={{ width: 200 }}
            onChange={(value) => settimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date}> {date} </Option>
            ))}
          </Select>
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(selectedCoin.price)}
            coinName={selectedCoin.name}
          />
        </Col>
        <div className="statisticSection">
          <div className="eachStatContainer">
            <div className="statsheader">
              <Typography.Title level={2}>
                {" "}
                {selectedCoin.name} Value Statistics
              </Typography.Title>
              <p> An overview showing the stats of {selectedCoin.name} </p>
            </div>

            <div className="statisticBox">
              <div className="box">
                <div className="iconAndstats">
                  <MoneyCollectOutlined />
                  <p> Price USD </p>
                </div>
                <div className="datastats">${millify(selectedCoin.price)}</div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <DollarCircleOutlined />
                  <p> Rank </p>
                </div>
                <div className="datastats">{selectedCoin.rank}</div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <FundOutlined />
                  <p> 24h Volume </p>
                </div>
                <div className="datastats">
                  {millify(selectedCoin["24hVolume"])}
                </div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <ExclamationCircleOutlined />
                  <p> Market Cap </p>
                </div>
                <div className="datastats">
                  {millify(selectedCoin.marketCap)}
                </div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <StopOutlined />
                  <p> All-time-high(daily avg) </p>
                </div>
                <div className="datastats">
                  {millify(selectedCoin.allTimeHigh.price)}
                </div>
              </div>
            </div>
          </div>

          <div className="eachStatContainer">
            <div className="statsheader">
              <Typography.Title level={2}> Other Statistics</Typography.Title>
              <p> An overview showing the stats of all cryptocurrencies </p>
            </div>

            <div className="statisticBox">
              <div className="box">
                <div className="iconAndstats">
                  <TrophyOutlined />
                  <p> Number of Markets </p>
                </div>
                <div className="datastats">{selectedCoin.numberOfMarkets}</div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <CheckOutlined />
                  <p> Number of Exchanges </p>
                </div>
                <div className="datastats">
                  {selectedCoin.numberOfExchanges}
                </div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <NumberOutlined />
                  <p> Approved Supply</p>
                </div>
                <div className="datastats">
                  {millify(selectedCoin.supply.supplyAt)}
                </div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <ThunderboltOutlined />
                  <p> Total Supply </p>
                </div>
                <div className="datastats">
                  {millify(selectedCoin.supply.total)}
                </div>
              </div>
              <div className="box">
                <div className="iconAndstats">
                  <Avatar src={priceImg} size="small"></Avatar>
                  <p>Circulating Supply </p>
                </div>
                <div className="datastats">
                  {millify(selectedCoin.supply.circulating)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </div>
  );
}
