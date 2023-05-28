// styles imports
import './app.scss';

// component imports
import DishForm from './components/DishForm/DishForm';

function App() {
  return (
    <div className="App">
      <h1 className="App__header">Add a dish!</h1>
      <DishForm />
    </div>
  );
}

export default App;
