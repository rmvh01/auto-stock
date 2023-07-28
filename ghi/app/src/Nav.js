import { NavLink } from 'react-router-dom';

function Nav() {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand text-success" to="/">CARCAR</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Sales
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><NavLink className="dropdown-item text-white bg-dark" to="CreateSalesPeople">Create SalesPeople</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="CreateNewSales">Create New Sales</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="SalesPeopleList">Sales People List</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="SalesList">Sales List</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="SalesPersonHistory">Sales People History</NavLink></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Customer
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><NavLink className="dropdown-item text-white bg-dark" to="CreateCustomer">Create Customer</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="CustomerList">Customer List</NavLink></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Service
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><NavLink className="dropdown-item text-white bg-dark" to="CreateTechnician">Create Technician</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="TechnicianList">Technician List</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="CreateAppointment">Create Appointment</NavLink></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          inventory
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><NavLink className="dropdown-item text-white bg-dark" to="CreateModels">Create Models</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="CreateManufacturers">Create Manufacturers</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="ModelsList">Models List</NavLink></li>
            <li><NavLink className="dropdown-item text-white bg-dark" to="ManufacturersList">Manufacturers List</NavLink></li>
          </ul>
        </li>


      </ul>
    </div>
  </div>
</nav>



  )
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <div className="container-fluid ">
    //     <NavLink className="navbar-brand" to="/">CarCar</NavLink>

    //     <div className="btn-group">
    //       <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    //         Action
    //       </button>
    //       <ul class="dropdown-menu">
    //         <li><a class="dropdown-item" href="#">Action</a></li>
    //         <li><a class="dropdown-item" href="#">Another action</a></li>
    //         <li><a class="dropdown-item" href="#">Something else here</a></li>
    //         <li><hr class="dropdown-divider"/></li>
    //         <li><a class="dropdown-item" href="#">Separated link</a></li>
    //       </ul>
    //     </div>


  //         {/* <ul className="nav nav-underline">
  //           <li className="nav-item">
  //             <a className="nav-link text-success" aria-current="page" href="CreateSalesPeople">CreateSalesPeople</a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link text-success" href="SalesPeopleList">SalesPeopleList</a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link text-success" href="CreateCustomer">CreateCustomer</a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link text-success" href="CustomerList">CustomerList</a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link text-success" href="CreateNewSales">CreateNewSales</a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link text-success" href="SalesList">SalesList</a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link text-success" href="SalesPersonHistory">SalesPersonHistory</a>
  //           </li>
  //         </ul> */}

  //       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  //         <span className="navbar-toggler-icon"></span>
  //       </button>
  //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //         </ul>
  //       </div>
  //     </div>
  //   </nav>
  // )
}
export default Nav;
