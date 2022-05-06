import { Image } from "react-bootstrap";
import "./style.scss";

const PageNotFound = () => {
  const logo = require("../../assets/404.jpg");
  return (
    <div className="page-not-found-container">
      <Image src={logo} />
    </div>
  );
};

export default PageNotFound;
