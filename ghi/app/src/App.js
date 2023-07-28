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
import ManufacturersList from './Inventory/ManufacturersList';
import CreateManufacturers from './Inventory/CreateManufacturers';
import CreateTechnician from "./service/CreateTechnician"
import TechnicianList from "./service/TechnicianList"
import CreateAppointment from "./service/CreateAppointment"
import ModelsList from './Inventory/ModelsList';
import CreateModels from './Inventory/CreateModels';
import AutomobilesList from './Inventory/AutomobilesList'
import CreateAutomobile from './Inventory/CreateAutomobile';

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


          {/* inventory division */}
          <Route path="ManufacturersList" element={<ManufacturersList />} />
          <Route path="CreateManufacturers" element={<CreateManufacturers />} />
          <Route path="ModelsList" element={<ModelsList />}/>
          <Route path="CreateModels" element={<CreateModels />}/>
          <Route path="AutomobilesList" element={<AutomobilesList />}/>
          <Route path="CreateAutomobile" element={<CreateAutomobile />}/>




        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
