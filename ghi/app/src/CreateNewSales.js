import { useState, useEffect } from "react";

function CreateNewSales(){
const [vins,setVins] = useState([]);

const AutomobileVIN = async() =>{
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if(response.ok){
      const content = await response.json();
      console.log(content,'----------content')
      setVins(content)
    }
  }

  const submitHandler = async(event)=>{

  }

  useEffect(()=>{
    AutomobileVIN()
  },[])
    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Sales</h1>
          <form onSubmit={submitHandler} id="create-location-form">

          <div className="mb-3">
            <label htmlFor="vin">Automobile VIN</label>
              <select value={''} onChange={''} required name="vin" id="vin" className="form-select">
                <option value="">Automobile VIN</option>


              </select>
            </div>

            {/* <div className="mb-3">
              <select value={''} onChange={''} required name="state" id="state" className="form-select">
                <option value="">Salesperson</option>
              </select>
            </div>

            <div className="mb-3">
              <select value={''} onChange={''} required name="state" id="state" className="form-select">
                <option value="">Customer</option>
              </select>
            </div>

            <div className="form-floating mb-3">
              <input value={''} onChange={''} placeholder="City" required type="number" name="city" id="city" className="form-control" />
              <label htmlFor="city">price</label>
            </div> */}

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default CreateNewSales
