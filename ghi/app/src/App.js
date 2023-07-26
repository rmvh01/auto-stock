import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalesPeopleList';
import CreateSalesPeople from './CreateSalesPeople';
import CreateCustomer from './CreateCustomer';
import CustomerList from './CustomerList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* sales division */}
          <Route path='CreateSalesPeople' element={<CreateSalesPeople />} />
          <Route path='SalesPeopleList' element={<SalesPeopleList />} />

          <Route path='CreateCustomer' element={<CreateCustomer />} />
          <Route path='CustomerList' element={<CustomerList />}/>


          {/* service division */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
