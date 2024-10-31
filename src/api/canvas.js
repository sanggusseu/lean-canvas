import dayjs from 'dayjs';
import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';

export const getCanvases = async params => {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  const { data } = await canvases.get('/', { params: payload });
  return data;
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

export const getCanvasById = id => {
  return canvases.get(`/${id}`);
};

export const updateTitle = async (id, title) => {
  await canvases.patch(`/${id}`, { title });
};

export const updateCanvas = async (id, canvas) => {
  await canvases.put(`/${id}`, canvas);
};
