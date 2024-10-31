import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function AboutPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['canvases'],
    queryFn: () =>
      axios.get('http://localhost:8000/canvases/').then(res => res.data),
    initialData: [],
  });
  const queryClient = useQueryClient();

  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: newCanvas => {
      axios.post('http://localhost:8000/canvases/', newCanvas);
    },
    onSuccess: queryClient.invalidateQueries(['canvases']),
  });
  const handleCreate = () => {
    createNewCanvas({ title: 'new canvas' });
  };
  return (
    <div>
      <h2 className="text-2xl">useQuery</h2>
      {isLoading && <p>loading...</p>}
      {error && <p className="text-red-700">{error.message}</p>}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <button type="button" onClick={handleCreate}>
        등록하기
      </button>
    </div>
  );
}
