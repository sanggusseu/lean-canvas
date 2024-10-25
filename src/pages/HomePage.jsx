import { useEffect, useState } from 'react';
import CanvasList from '../components/home/CanvasList';
import ViewToggle from '../components/home/ViewToggle';
import SearchBar from '../components/home/SearchBar';
import { getCanvases } from '../api/canvas';

function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  const fetchData = async () => {
    const response = await getCanvases();
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>

      <CanvasList
        filteredData={filteredData}
        searchText={searchText}
        isGridView={isGridView}
        onDeleteItem={handleDeleteItem}
      />
    </>
  );
}

export default Home;
