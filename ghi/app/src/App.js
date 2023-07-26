import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalesPeopleList';
import CreateSalesPeople from './CreateSalesPeople';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='SalesPeopleList' element={<SalesPeopleList salesPeople={props.salesPeople_content}/>} />
          <Route path='CreateSalesPeople' element={<CreateSalesPeople />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
