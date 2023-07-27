import { useState, useEffect } from "react";


function ManufacturersList(){
    const [manufacturers,setManufacturers] = useState([]);
    const loadData = async ()=>{
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if(response.ok){
            const content = await response.json();
            console.log(content,"-----")
            setManufacturers(content.manufacturers)
        }
    }
    useEffect(()=>{
        loadData();
    },[])
    return(
        <>
        <h1> Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer =>{
                    return(
                        <tr key={manufacturer.href}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    )
                })}
            </tbody>
      </table>
      </>
    )
}
export default ManufacturersList
