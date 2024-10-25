import { useEffect, useState } from 'react';
import CanvasList from '../components/home/CanvasList';
import ViewToggle from '../components/home/ViewToggle';
import SearchBar from '../components/home/SearchBar';
import { getCanvases } from '../api/canvas';

function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  const fetchData = async params => {
    const response = await getCanvases(params);
    setData(response.data);
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

      <CanvasList
        filteredData={data}
        searchText={searchText}
        isGridView={isGridView}
        onDeleteItem={handleDeleteItem}
      />
    </>
  );
}

export default Home;
