import './App.css';
import TransactionData from './Pages/TransactionData';
import NewUser from './components/NewUser';
import UserChart from './components/UserChart';

function App() {
  return (
    <div className='App'>
      <TransactionData />
      {/* <UserChart /> */}
      {/* <BuySell/> */}
      <NewUser />
    </div>
  );
}

export default App;
