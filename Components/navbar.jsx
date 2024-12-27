import { Avatar, Menu } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";
import cryptoLogo from "../src/assets/cryptocurrency.png";
import home from "../src/assets/home.png";
import exchange from "../src/assets/exchange.png";
import currency from "../src/assets/currency.png";
import news from "../src/assets/news.png";

export default function NavBar() {
  return (
    <div className="container">
      <div className="logo-container">
        <Avatar src={cryptoLogo} size="large" />
        <a> CryptoWorld </a>
      </div>
      <Menu theme="dark">
        <Menu.Item className="menu-item" icon={<img src={home} alt="Home" />}>
          <Link to="/"> Home </Link>
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          icon={<img src={currency} alt="Cryptocurrencies" />}
        >
          <Link to="/cryptocurrencies"> Cryptocurrencies </Link>
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          icon={<img src={exchange} alt="Exchanges" />}
        >
          <Link to="/exchange"> Exchanges </Link>
        </Menu.Item>
        <Menu.Item className="menu-item" icon={<img src={news} alt="News" />}>
          <Link to="/news"> News </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
