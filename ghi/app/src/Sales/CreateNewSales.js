import { useState, useEffect } from "react";
//NOTE
// dd --> means dropdown function
function CreateNewSales(){
// creating a AutomobileVIN dropdown
const [vins,setVins] = useState([]);
const AutomobileVINdd = async() =>{
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if(response.ok){
      const content = await response.json();
      setVins(content.autos);
      console.log(content,"-------")
    }else{
      console.log("error with the AutomobileVINdd drop_down")
    }
  }
  // creating the salesPersons dropdown
  const [salesPersons,setSalesPersons] = useState([]);
  const salesPersonsdd = async()=>{
    const url = 'http://localhost:8090/api/salespeople/'
    const response = await fetch(url);
    if(response.ok){
      const content = await response.json();
      setSalesPersons(content);
      // console.log(content);
    }else{
      console.log("error with the salesPersonsdd drop_down");
    }
  }
  // creating the customers dropdown
  const [customers,setCustomers] = useState([]);
  const customerdd = async ()=>{
    const url = 'http://localhost:8090/api/customer/';
    const response = await fetch(url);
    if(response.ok){
      const content = await response.json();
      setCustomers(content);
      // console.log(content);
    }else{
      console.log("error with the customers drop_down");
    }
  }
// use the efect only once
  useEffect(()=>{
    AutomobileVINdd()
    salesPersonsdd()
    customerdd()
  },[])
  const[vin,setVin] = useState('');
  const vinHandler = (event)=>{
    const value = event.target.value;
    setVin(value)
  }

  const[salesPerson,setSalesPerson] = useState('');
  const salesPersonHandler = (event)=>{
    const value = event.target.value;
    setSalesPerson(value)
  }

  const[customer,setCustomer] = useState('');
  const customerHandler = (event)=>{
    const value = event.target.value;
    setCustomer(value);
  }

  const[price,setPrice] = useState('');
  const priceHandler = (event)=>{
    const value = event.target.value;
    setPrice(value);
  }

  const submitHandler = (event)=>{
    event.preventDefault()
    const data = {}
    data.automobile = vin;
    data.SalesPerson=salesPerson;
    data.customer = customer;
    data.price = price

    // posting the data into the sales to recor all the sales
    const postingSales=async()=>{
      const content = JSON.stringify(data)
      const url = 'http://localhost:8090/api/sale/'
      const fetchConfig ={
        method:'post',
        body:content,
        headers:{
          'Content-Type':'application/json'
        }
      }
         //updating the the inventory, so if the sales succes, update the inventory
         // into sold status true
      const udpatingInventory = async()=>{
        const data = {};
        data.sold = true
        const content = JSON.stringify(data)

        const url = `http://localhost:8100/api/automobiles/${vin}/`
        const fetchConfig = {
          method:'put',
          body:content,
          headers:{
            'Content-Type':'application/json'
          }
        }
        const response = await fetch(url,fetchConfig)
        if(response.ok){
          console.log('updating success .... ... ...');
        }
      }
      const response1 = await fetch(url,fetchConfig)
      if(response1.ok){
        const json = await response1.json();
        console.log(json,' posting success ... ... ...');
        //updating the the inventory if the sales is succes
        udpatingInventory()
      }
    }
      //calling the posting sales
      postingSales()

      // reset the form
      setVin('');
      setSalesPerson('');
      setCustomer('');
      setPrice('')
  }
    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Sales</h1>
          <form onSubmit={submitHandler} id="create-location-form">
          <div className="mb-3">
            <label htmlFor="vin">VIN Number</label>

              <select value={vin} onChange={vinHandler} required name="vin" id="vin" className="form-select">
                <option value="">Automobile VIN</option>
                {vins.filter((p)=>p.sold===false).map(vin=>{
                  return(
                    <option value={vin.vin} key={vin.href}>{vin.vin}</option>
                  )
                })}
              </select>

            </div>
            <div className="mb-3">
            <label htmlFor="salesPerson">Sales Person</label>
              <select value={salesPerson} onChange={salesPersonHandler}required name="salesPerson" id="salesPerson" className="form-select">
                <option value="">Salesperson</option>
                {salesPersons.map(salesPerson=>{
                  return (
                    <option key={salesPerson.href} value={salesPerson.employee_id}>{salesPerson.employee_id}</option>
                  )
                })}
              </select>

            </div>
            <div className="mb-3">
            <label htmlFor="customer">Customer Name</label>
              <select value={customer} onChange={customerHandler}required name="customer" id="customer" className="form-select">
                <option value="">Customer</option>
                {customers.map(customer=>{
                  return(
                    <option key={customer.href} value={customer.phone_number}>{customer.first_name} {customer.last_name}</option>
                  )
                })}
              </select>

            </div>
            <div className="form-floating mb-3">
              <input value={price} onChange={priceHandler}required placeholder="Name" type="number" name="price" id="price" className="form-control" />
              <label htmlFor="price">Price</label>
            </div>


            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateNewSales
