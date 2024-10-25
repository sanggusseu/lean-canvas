import axios from 'axios';

const create = (baseURL, options) => {
  const instance = axios.create(Object.assign({ baseURL }, options));

  return instance;
};

export const canvases = create('http://localhost:8000/canvases');