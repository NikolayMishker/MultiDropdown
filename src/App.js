import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import {dropdownTitle, dropdownInfo} from './Data/SeedData';

function App() {

  const onChangeHandler = (str) =>{
      //console.log(str);
  }

  return (
    <div className='app'>
          <Dropdown onChange={onChangeHandler} title={dropdownTitle} options={dropdownInfo}/>
    </div>

  );
}

export default App;
