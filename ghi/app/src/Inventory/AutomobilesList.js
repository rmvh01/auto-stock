import { useState, useEffect} from "react";


function AutomobilesList(){

    const [automobiles,setAutomobiles]=useState([]);
    const automobilesLoad = async()=>{
        const url='http://localhost:8100/api/automobiles/';
        const response=await fetch(url);
        if(response.ok){
            const content=await response.json();
            console.log(content);
            setAutomobiles(content.autos)

        }
    }
    useEffect(()=>{
        automobilesLoad()
    },[])
    return (
        <>
        <h1> Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobiles.map(automobile=>{
                    return(
                        <tr key={automobile.id}>
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.name}</td>
                            <td>{automobile.model.manufacturer.name}</td>
                            <td>
                                {automobile.sold ? "YES":'NO'}
                            </td>
                        </tr>
                    )
                })}

            </tbody>
      </table>
      </>
    )
}

export default AutomobilesList
