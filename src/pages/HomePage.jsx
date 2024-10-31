import { useState } from 'react';
import CanvasList from '../components/home/CanvasList';
import ViewToggle from '../components/home/ViewToggle';
import SearchBar from '../components/home/SearchBar';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function Home() {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  // 1] 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', searchText],
    queryFn: searchText => getCanvases({ title_like: searchText }),
    initialData: [],
  });

  // 2] 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  // 3] 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const handleDeleteItem = async id => {
    if (confirm('삭제 하시겠습니까?') === false) return;
    deleteCanvasMutation(id);
  };

  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>

      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          searchText={searchText}
          isGridView={isGridView}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
