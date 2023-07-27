import { useState, useEffect } from "react";

function TechnicianList() {
    const [technicians, SetTechnicians] = useState([])

    const loaddata = async() => {
        const techniciansURL = "http://localhost:8080/api/technicians/"
        const response = await fetch(techniciansURL)
        if (!response.ok) {
            return console.log("technician list response not ok: ", response)
        } else {
            const data = await response.json()
            console.log("Response is ok: ", response)
            SetTechnicians(data)
        }
    }
    useEffect(() => {
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
                    {technicians.map(content=>{
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

export default TechnicianList
