import { useState, useEffect } from "react";

function CreateModels(){
    const[name, setName]=useState('')
    const nameHandler=(event)=>{
        const value=event.target.value;
        setName(value);
    }
    const[picture_url,setPicture]=useState('')
    const pictureHandler=(event)=>{
        const value=event.target.value;
        setPicture(value);
    }
    const[manufacturer_id,setManufacturer] = useState('');
    const manufacturerlhandler=(event)=>{
        const value=event.target.value;
        setManufacturer(value);
    }
    console.log(manufacturer_id)


    const[manufacturers,setManufacturers] = useState([]);
    const loadManufacturers=async()=>{
        const url='http://localhost:8100/api/manufacturers/'
        const response=await fetch(url)
        if(response.ok){
            const content=await response.json();
            console.log(content.manufacturers)
            setManufacturers(content.manufacturers)
        }
    }
    useEffect(()=>{
        loadManufacturers();

    },[])

    const submitHandler = async(event)=>{
        event.preventDefault()
        const data={};
        data.name=name;
        data.picture_url=picture_url;
        data.manufacturer_id=manufacturer_id
        const content = JSON.stringify(data)

        const url='http://localhost:8100/api/models/'
        const fetchConfig={
            method:'post',
            body:content,
            headers:
            {
                'Content-Type':'application/json'
            }
        }
        const response= await fetch(url,fetchConfig)
        if(response.ok){
            console.log(response.json(),'sucess ... .... ...');
        }else{
            console.log("error ... ... ...")
        }
    }
return (
     <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Model</h1>
          <form onSubmit={submitHandler} id="create-location-form">
            <div className="form-floating mb-3">
              <input value={name} onChange={nameHandler}required placeholder="Name" type="text" name="text" id="price" className="form-control" />
              <label htmlFor="price">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input value={picture_url} onChange={pictureHandler}required placeholder="Name" type='url' name="price" id="price" className="form-control" />
              <label htmlFor="price">Picture</label>
            </div>

            <div className="mb-3">
            <label htmlFor="customer">Customer Name</label>
              <select value={manufacturer_id} onChange={manufacturerlhandler}required name="customer" id="customer" className="form-select">
                <option value="">manufacturer</option>
                {manufacturers.map((manufacturer)=>{
                    return(
                        <option key={manufacturer.href} value={manufacturer.id}>{manufacturer.name}</option>
                    )
                })}
              </select>
            </div>




            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
)
}

export default CreateModels
