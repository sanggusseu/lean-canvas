import { canvases } from './http';

export const getCanvases = params => {
  return canvases.get('/', { params });
};
