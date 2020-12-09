import './App.css';

import Header from './components/Header/Header'
import PanelComponent from './components/PanelComponent/PanelComponent'

//Displays header and body
//Header Component : displays header
//PanelComponent : displays body
const App = () => {
  return (
    <div className="App">
      <Header/>
      <PanelComponent/>
    </div>
  );
}

export default App;
