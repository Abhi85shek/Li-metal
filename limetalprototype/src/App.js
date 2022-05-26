import './App.css';
import Navbar from './component/Navbar';

import CreateOrder from './Pages/CreateOrder';

function App() {
  return (
    <>
      <Navbar /> 
      <div className='flex flex-col justify-center items-center pt-5 font-raleway text-xl'>
       <h1>Generate PO Number</h1>
       <CreateOrder />
      
    </div>
    </>

  );
}

export default App;
