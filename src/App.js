import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import {dropdownTitle, dropdownInfo} from './Data/SeedData';

function App() {

  return (
    <div className='app'>
          <Dropdown title={dropdownTitle} options={dropdownInfo}/>
          <Dropdown title={dropdownTitle} options={dropdownInfo}/>
    </div>

  );
}

export default App;
