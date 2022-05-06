import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dropdown } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Gallery from "react-grid-gallery";

import { getShips } from "../../services/spaces";
import CardWrapper from "../../components/card";

import "./spaces.scss";

const Main = () => {
  const limit = 21;
  const [offset, setOffset] = useState(0);
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isGallery, setIsGallery] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadSpaces() {
      const { ships } = await getShips(limit, offset);

      let hasMore = false;
      if (ships.length === 21) {
        hasMore = true;
        ships.pop();
      }

      const obj = [...results, ...ships];
      fillTypes(obj);
      setResults(obj);
      setHasMore(hasMore);
    }

    loadSpaces();
  }, [offset]);

  const handleGallery = () => {
    const obj = [];
    results.forEach((item) => {
      if (item.image) {
        obj.push({
          src: item.image,
          thumbnail: item.image,
          thumbnailWidth: 220,
          thumbnailHeight: 100,
          caption: item.name,
        });
      }
    });
    return obj;
  };

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
    setOffset(results.length);
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

  const renderListView = () => {
    return (
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
    );
  };

  const renderGalleryView = () => {
    const obj = handleGallery();
    return <Gallery images={obj} />;
  };

  return (
    <>
      <div className="d-flex space-between mb-2">
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

        <BootstrapSwitchButton
          checked={isGallery}
          onlabel="List View"
          offlabel="Gallery View"
          onChange={(checked) => {
            setIsGallery(checked);
          }}
        />
      </div>

      {isGallery ? renderGalleryView() : renderListView()}
    </>
  );
};

export default Main;
