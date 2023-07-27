import { useEffect,useState } from "react"

function CustomerList(){

    const[customerlist,setCustomerlist] = useState([])
    const loadData = async ()=>{
        const url = 'http://localhost:8090/api/customer/'
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            console.log(data,"sucess ... ... ...")
            setCustomerlist(data)
        }else{
            console.log('error ... ... ...')
        }
    }

    useEffect(()=>{
        loadData()
    },[])
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {customerlist.map(content=>{
                    return(
                        <tr key={content.href}>
                            <td>{ content.first_name }</td>
                            <td>{ content.last_name }</td>
                            <td>{ content.address }</td>
                            <td>{ content.phone_number }</td>
                        </tr>
                    )
                })}
            </tbody>

      </table>
    )
}

export default CustomerList
