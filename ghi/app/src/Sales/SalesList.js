import { useState,useEffect } from "react";
function SalesList(){
    const [sales,setSales] = useState([]);
    const loadData = async (event) =>{
        const url = 'http://localhost:8090/api/sale/';
        const response = await fetch(url);
        if(response.ok){
            const content = await response.json()
            setSales(content)
            console.log(content)
        }
    }
    useEffect(()=>{
        loadData()
    },[])
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson Employee ID</th>
                    <th>Salesperson Name</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map((sale)=>{
                    return(
                        <tr key={sale.href}>
                            <td>{sale.SalesPerson.employee_id}</td>
                            <td>{sale.SalesPerson.first_name} {sale.SalesPerson.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    );
                })}
            </tbody>
      </table>
    )
}
export default SalesList
