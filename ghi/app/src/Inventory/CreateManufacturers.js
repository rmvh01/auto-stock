import { useState} from "react";


function CreateManufacturers(){
    const [Manufacturer, setManufacturers] = useState('');
    const ManufacturersHandler = (event)=>{
        const value = event.target.value;
        setManufacturers(value);
    }
    const submitHandler = async(event)=>{
        event.preventDefault()
        const data = {};
        data.name = Manufacturer;
        const content = JSON.stringify(data);
        console.log(data)
        console.log(Manufacturer)

        const url = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method:"POST",
            body:content,
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response = await fetch(url,fetchConfig);
        console.log(response)
        if(response.ok){
            const json = await response.json();
            console.log(json)
            console.log('posr succesfully ... ... ... ')
            setManufacturers("")
        }else{
            console.log('fetch error .. .. . .')
        }
    }
    return(
        <div className="row">
        <div className='offset-3 col-6'>
          <div className="shadow p-4 mt-4">
            <h1>Create Manufacturer</h1>
            <form onSubmit={submitHandler} id="create-location-form">
              <div className="form-floating mb-3">
                <input value={Manufacturer} onChange={ManufacturersHandler} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Manufacturer</label>
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

export default CreateManufacturers
