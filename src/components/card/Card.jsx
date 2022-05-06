import { Card } from "react-bootstrap";
import "./card.scss";

const CardWrapperWrapper = (props) => {
  let spacex_image = props.image;
  if (!spacex_image)
    spacex_image = require("../../assets/image-placeholder.jpeg");

  return (
    <Card className="pointer" key={`card-${props.id}`}>
      <Card.Img variant="top" src={spacex_image} />
      <Card.Body>
        <Card.Title>
          {props.name} ({props.type})
        </Card.Title>
        <Card.Text>
          Active:{" "}
          <span className={`card-active-${props.active.toString()}`}>
            {props.active ? "Yes" : "No"}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardWrapperWrapper;
