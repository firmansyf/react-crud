import axios from "axios";

export function getData() {
  return axios({
    method: "get",
    url: `http://localhost:3001/data`,
  });
}

export function post(params) {
  return axios({
    method: "post",
    url: `http://localhost:3001/data`,
    data: params,
  });
}

export function update(id, params) {
  return axios({
    method: "put",
    url: `http://localhost:3001/data/${id}`,
    data: params,
  });
}

export function deleteData(id) {
  return axios({
    method: "delete",
    url: `http://localhost:3001/data/${id}`,
  });
}
