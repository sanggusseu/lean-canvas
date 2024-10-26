import { useEffect, useState } from 'react';
import CanvasTitle from '../components/canvas/CanvasTitle';
import LeanCanvas from '../components/canvas/LeanCanvas';
import { getCanvasById, updateTitle } from '../api/canvas';
import { useParams } from 'react-router-dom';

export default function CanvasDetailPage() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const fetchCanvas = async () => {
      const response = await getCanvasById(id);
      setCanvas(response.data);
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
      <CanvasTitle value={canvas?.title} onUpdateTitle={handleUpdateTitle} />
      {canvas && <LeanCanvas canvas={canvas} />}
    </div>
  );
}
