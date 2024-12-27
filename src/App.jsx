import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space, Switch } from "antd";
import "./App.css";
import NavBar from "../Components/navbar";
import Homepage from "../Components/Homepage";
import Cryptocurrencies from "../Components/Cryptocurrencies";
import Exchange from "../Components/Exchange";
import News from "../Components/News";
import Others from "../Components/Others";
import { useGetCryptosQuery } from "../Services/cryptoAPI";

function App() {
  const count = 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    if (data) {
      setCryptos(data?.data?.coins);
      console.log(data);
    }
  }, [data]);

  console.log(cryptos);

  return (
    <div className="app-container">
      <div className="navBar">
        <NavBar />{" "}
      </div>
      <div className="main">
        <div className="mainContainer">
          <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route
              exact
              path="/cryptocurrencies"
              element={<Cryptocurrencies />}
            ></Route>
            <Route exact path="/crypto/:coinId" element={<Others />}></Route>
            <Route exact path="/exchange" element={<Exchange />}></Route>
            <Route exact path="/news" element={<News />}></Route>
          </Routes>
        </div>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            {" "}
            CryptoVerse Inc
            <br />
            All Rights Reserved.
          </Typography.Title>
          <Space size={16} style={{ textAlign: "center" }}>
            <Link to="/"> Home </Link>
            <Link to="/exchange"> Exchange </Link>
            <Link to="/news"> News </Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
