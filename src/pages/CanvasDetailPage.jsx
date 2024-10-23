import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export default function CanvasDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const hash = location.hash;

  return (
    <div>
      CanvasDetail
      <p>id: {id}</p>
      <p>searchParams: {searchParams.get('keyword')}</p>
      <p>hash: {hash}</p>
    </div>
  );
}
