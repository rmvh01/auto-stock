import { useState,useEffect } from "react";


function CreateAutomobile(){

    const[color,setColor]=useState('');
    const colorHandler=(event)=>{
        const value=event.target.value;
        setColor(value)
    }
    const[year,setYear]=useState('');
    const yearHandler=(event)=>{
        const value=event.target.value;
        setYear(value);
    }
    const[vin,setVin]=useState('');
    const vinHandler=(event)=>{
        const value=event.target.value;
        setVin(value)
    }
    const[model_id,setModel]=useState('')
    const modelHandler=(event)=>{
        const value=event.target.value;
        setModel(value);

    }


    const[models,setModels]=useState([])
    const loadModel = async()=>{
        const url='http://localhost:8100/api/models/';
        const response=await fetch(url);
        if(response.ok){
            const content=await response.json();
            console.log(content);
            setModels(content.models);
        }else{
            console.log('load model.error ... ... ...')
        }
    }
    useEffect(()=>{
        loadModel()
    },[])

    const submitHandler=async(event)=>{
        event.preventDefault()
        const data={};
        data.color=color;
        data.year=year;
        data.vin=vin;
        data.model_id=model_id;
        const content=JSON.stringify(data)

        const url='http://localhost:8100/api/automobiles/';
        const fetchConfig={
            method:'post',
            body:content,
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response=await fetch(url,fetchConfig);
        if(response.ok){
            const content=await response.json();
            console.log(content,'success ... ... ...')
            setColor('');
            setYear('');
            setVin('');
            setModel('')


        }else{
            console.log(content,'post error ... ... ...')
        }
    }
    return (
        <div className="row">
         <div className="offset-3 col-6">
           <div className="shadow p-4 mt-4">
             <h1>Create a new Automobile</h1>
             <form onSubmit={submitHandler} id="create-location-form">

               <div className="form-floating mb-3">
                 <input value={color} onChange={colorHandler}required placeholder="Name" type="text" name="text" id="price" className="form-control" />
                 <label htmlFor="price">Color</label>
               </div>

               <div className="form-floating mb-3">
                 <input value={year} onChange={yearHandler}required placeholder="Name" type='text' name="price" id="price" className="form-control" />
                 <label htmlFor="price">Year</label>
               </div>

               <div className="form-floating mb-3">
                 <input value={vin} onChange={vinHandler}required placeholder="Name" type='text' name="price" id="price" className="form-control" />
                 <label htmlFor="price">VIN</label>
               </div>

               <div className="mb-3">
               <label htmlFor="customer">Customer Name</label>
                 <select value={model_id} onChange={modelHandler}required name="customer" id="customer" className="form-select">
                   <option value="">Models</option>
                   {models.map(model=>{
                    return(
                        <option key={model.href} value={model.id}>{model.name}</option>
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

export default CreateAutomobile;
