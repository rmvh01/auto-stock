import { useState,useEffect} from "react";


function SalesPeopleList(){
//     const [href,setHref] = useState('')
//   // fetch the data of sales people
//   const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
//   const response = await fetch(salesPeopleUrl);
//   if(response.ok){
//     const content = await response.json()

//   // if the respnse is not ok
//   }else{
//     console.log('response is error')
//   }
//     // passing the data
// }
    const [contents,SetSalesPeople] = useState([])
    const loaddata = async()=>{
        const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(salesPeopleUrl);
        if(response.ok){
            const salesPeople = await response.json()
            console.log(salesPeople);
            SetSalesPeople(salesPeople)

        }else{
            console.log('fetching error')
        }
    }
    useEffect(()=>{
        loaddata()
    },[])
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {contents.map(content=>{
                    return(
                        <tr key={content.href}>
                            <td>{ content.employee_id }</td>
                            <td>{ content.first_name }</td>
                            <td>{ content.last_name }</td>
                        </tr>
                    )
                })}
            </tbody>

      </table>
    )
}

export default SalesPeopleList;
