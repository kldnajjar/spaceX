import http from "./http";

const endPoint = `/graphql`;

export async function getShips(limit, offset, type) {
  let query = `{\n  ships(limit: ${limit}, offset: ${offset}) {\n    id\n    image\n    name\n    active\n    type\n  }\n}\n`;
  if (type) {
    query = `{\n  ships(limit: ${limit}, offset: ${offset}, find: {type: "${type}"}) {\n    id\n    image\n    name\n    active\n    type\n  }\n}\n`;
  }

  const options = {
    query,
  };

  const { data } = await http.post(endPoint, options);

  return data["data"];
}

export default {
  getShips,
};
