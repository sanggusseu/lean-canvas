import { useEffect, useState } from 'react';
import CanvasList from '../components/home/CanvasList';
import ViewToggle from '../components/home/ViewToggle';
import SearchBar from '../components/home/SearchBar';
import { createCanvas, getCanvases } from '../api/canvas';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';

function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const handleCreateCanvas = async () => {
    try {
      setIsLoadingCreate(true);
      await new Promise(resolver => setTimeout(resolver, 1000));
      await createCanvas();
      fetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  const fetchData = async params => {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolver => setTimeout(resolver, 1000));
      const response = await getCanvases(params);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ title_like: searchText });
  }, [searchText]);

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
      {error && (
        <Error
          message={error.message}
          onRetry={() => fetchData({ title_like: searchText })}
        />
      )}
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
