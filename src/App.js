import './App.scss';
import { useState, useEffect } from 'react';
import Dropdown from './components/Dropdown/Dropdown';
import {dropdownTitle, dropdownInfo} from './Data/SeedData';

function App() {

  const [selectedItems, setSelectedItems] = useState([2]);

  useEffect(() => {
  }, [selectedItems])

  return (
    <div className='app'>
          <Dropdown value={selectedItems} onChange={setSelectedItems} title={dropdownTitle} options={dropdownInfo}/>
          <Dropdown value={selectedItems} onChange={setSelectedItems} title={dropdownTitle} options={dropdownInfo}/>
    </div>

  );
}

export default App;
