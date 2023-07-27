import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './Sales/SalesPeopleList';
import CreateSalesPeople from './Sales/CreateSalesPeople';
import CreateCustomer from './Sales/CreateCustomer';
import CustomerList from './Sales/CustomerList';
import CreateNewSales from './Sales/CreateNewSales';
import SalesList from './Sales/SalesList';
import SalesPersonHistory from './Sales/SalesPersonHistory';
import TechnicianList from './service/TechnicianList';
import CreateTechnician from './service/CreateTechnician';
import CreateAppointment from './service/CreateAppointment';

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

          <Route path="CreateNewSales" element={<CreateNewSales />} />
          <Route path="SalesList" element={<SalesList />}/>

          <Route path="SalesPersonHistory" element={<SalesPersonHistory />}/>



          {/* service division */}
          <Route path="CreateTechnician" element={<CreateTechnician />}/>
          <Route path="TechnicianList" element={<TechnicianList />}/>
          <Route path="CreateAppointment" element={<CreateAppointment />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
