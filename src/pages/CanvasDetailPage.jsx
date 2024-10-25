import { useEffect, useState } from 'react';
import CanvasTitle from '../components/canvas/CanvasTitle';
import LeanCanvas from '../components/canvas/LeanCanvas';
import { getCanvasById, updateTitle } from '../api/canvas';
import { useParams } from 'react-router-dom';

export default function CanvasDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchCanvas = async () => {
      const response = await getCanvasById(id);
      setData(response.data);
    };
    fetchCanvas();
  }, [id]);

  const handleUpdateTitle = async title => {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <CanvasTitle value={data?.title} onUpdateTitle={handleUpdateTitle} />
      <LeanCanvas />
    </div>
  );
}
