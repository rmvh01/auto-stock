import { useState ,useEffect} from "react";

function ModelsList(){
    const [models,setModels] = useState([])
    const loadData  = async()=>{
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url);
        if(response.ok){
            const content = await response.json()
            console.log(content)
            setModels(content.models);
        }else{
            console.log("error ... ... ...")
        }
    }
    useEffect(()=>{
    loadData()
    },[])
    return(
        <>
        <h1>Model List</h1>
        <table className="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
            </tr>
        </thead>
        <tbody>
           {models.map((model)=>{
            return(
                <tr key={model.href}>
                    <td>{model.name}</td>
                    <td>{model.manufacturer.name}</td>
                    <td><img src={model.picture_url} alt={model.name} /></td>
                </tr>
            )
           })}
        </tbody>
  </table>
  </>
    )
}

export default ModelsList;
