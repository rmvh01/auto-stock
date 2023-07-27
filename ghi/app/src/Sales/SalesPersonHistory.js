import { useState, useEffect } from "react";



function SalesPersonHistory(){

    const [salesPeoples,setSalesPeoples] = useState([]);
    const salesPeopledd = async()=>{
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if(response.ok){
            const content = await response.json();
            setSalesPeoples(content);
            console.log(content)
        }else{
            console.log('salesPeopledd error ... ... ...')
        }
    }

    const[sales,setSales] = useState([])
    const salesLoad = async()=>{
        const url = 'http://localhost:8090/api/sale/';
        const response = await fetch(url);
        if(response.ok){
            const content = await response.json();
            console.log(content);
            setSales(content);
        }
    }
    useEffect(()=>{
        salesPeopledd()
        salesLoad()

    },[])
    const [salesPeople,setSalesPeople] = useState('');
    const salesPeopleHandler = event =>{
        const value = event.target.value;
        setSalesPeople(value);
    }
    return (
        <>
            <h1>Create a new Sales</h1>
                <div className="mb-3">
                <label htmlFor="customer">Salesperson History</label>

                    <select value={salesPeople} onChange={salesPeopleHandler} required name="customer" id="customer" className="form-select">
                    <option value="">Customer</option>
                    {salesPeoples.map(salespeople => {
                        return(
                            <option key={salespeople.href} value={salespeople.href}> {salespeople.first_name} {salespeople.last_name}</option>
                        );
                    })}
                  </select>
                  </div>
                  <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.filter(sale=>sale.SalesPerson.href.includes(salesPeople)).map((p)=>{
                    return(
                        <tr>
                            <td>{p.SalesPerson.first_name} {p.SalesPerson.last_name}</td>
                            <td>{p.customer.first_name} {p.customer.last_name}</td>
                            <td>{p.automobile.vin}</td>
                            <td>{p.price}</td>
                        </tr>
                    )
                })}
            </tbody>
      </table>
        </>
      );
}

export default SalesPersonHistory
