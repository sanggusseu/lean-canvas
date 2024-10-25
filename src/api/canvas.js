import dayjs from 'dayjs';
import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';

export const getCanvases = params => {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  return canvases.get('/', { params: payload });
};

export const createCanvas = () => {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
};

export const deleteCanvas = async id => {
  await canvases.delete(`/${id}`);
};
