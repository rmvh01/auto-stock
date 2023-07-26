import { useState } from "react";

function CreateCustomer(){
    const [first_name,setFirstName] = useState("")
    const firstNameHandler = event =>{
        const value = event.target.value;
        setFirstName(value);
    }
    const [last_name,setLatsName] = useState("")
    const latsNameHandler = event =>{
        const value = event.target.value;
        setLatsName(value);
    }
    const[address,setAddress] = useState('')
    const addressHandler = event =>{
        const value = event.target.value;
        setAddress(value);
    }
    const[phone_number,setPhoneNumber] = useState('');
    const phoneNumberHandler = event =>{
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const submitHandler = async (event) =>{
        event.preventDefault()
        const data ={};
        data.first_name = first_name;
        data.last_name = last_name;
        data.address = address;
        data.phone_number = phone_number

        const content = JSON.stringify(data)
        const url = "http://localhost:8090/api/customer/"
        const fetchConfig = {
            method:"POST",
            body:content,
            headers:{
                'Content-Type':'application/json'
            }
        };
        const response = await fetch(url,fetchConfig);
        if(response.ok){
            const output = await response.json();
            console.log(output,'success ... ... ...')
            setFirstName('');
            setLatsName('');
            setAddress('');
            setPhoneNumber('');

        }else{
            console.log("error... ... ... ")
        }
    }
    return(
        <div className="row">
          <div className='offset-3 col-6'>
            <div className="shadow p-4 mt-4">
              <h1>Create Customer</h1>
              <form onSubmit={submitHandler} id="create-location-form">
                <div className="form-floating mb-3">
                  <input value={first_name} onChange={firstNameHandler} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">first Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input value={last_name} onChange={latsNameHandler} placeholder="Color" required type="text" name="Color" id="Color" className="form-control" />
                  <label htmlFor="roomCount">last Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input value={address} onChange={addressHandler} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                  <label htmlFor="city">Address</label>
                </div>

                <div className="form-floating mb-3">
                  <input value={phone_number} onChange={phoneNumberHandler} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                  <label htmlFor="city">Phone Number</label>
                </div>

                <div className="mb-3">
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
          </div>
        )
}

export default CreateCustomer
