import './App.css';
import Category from './components/Category';
import Intro from './components/Intro';
import ItemList from './components/ItemList';

function App() {

  return (
    <div className="App">
      <Intro />
      <Category />
      <ItemList />
    </div>
  );
}

export default App;
