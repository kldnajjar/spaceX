import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dropdown } from "react-bootstrap";

import { getShips } from "../../services/spaces";
import CardWrapper from "../../components/card";

import "./spaces.scss";

const Main = () => {
  const [limit, setLimit] = useState(21);
  const [offset, setOffset] = useState(0);
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadSpaces() {
      const { ships } = await getShips(limit, offset);

      let hasMore = false;
      if (ships.length === 21) {
        hasMore = true;
        ships.pop();
      }

      fillTypes(ships);
      setResults(ships);
      setHasMore(hasMore);
    }

    loadSpaces();
  }, []);

  const fillTypes = (data) => {
    const newTypes = [];
    data.forEach((item) => {
      if (newTypes.indexOf(item.type) === -1) {
        newTypes.push(item.type);
      }
    });

    if (newTypes.length) setTypes(newTypes);
  };

  const getMoreSpaces = async () => {
    const offset = results.length;
    const data = await getShips(limit, offset);

    let hasMore = false;
    if (data.ships.length === 21) {
      hasMore = true;
      data.ships.pop();
    }

    const obj = [...results, ...data.ships];

    fillTypes(obj);
    setResults(obj);
    setHasMore(hasMore);
  };

  const loadShipsByTypes = async (type) => {
    const { ships } = await getShips(limit, 0, type);

    let hasMore = false;
    if (ships.length === 21) {
      hasMore = true;
      ships.pop();
    }

    setType(type);
    setResults(ships);
    setOffset(0);
    setHasMore(hasMore);
  };

  return (
    <>
      <div className="d-flex mb-2">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {type ? type : "All Types"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => loadShipsByTypes("")}>
              All Types
            </Dropdown.Item>
            {types.map((type, index) => (
              <Dropdown.Item
                onClick={() => loadShipsByTypes(type)}
                key={`ship-type-${index}`}
              >
                {type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <InfiniteScroll
        dataLength={results.length}
        next={getMoreSpaces}
        hasMore={hasMore}
        loader={<h4>Space is loading</h4>}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="spaces-container">
          {results.map((spaces) => CardWrapper(spaces))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Main;
