
import { useEffect, useState } from "react";

function AppointmentListH() {

    const [appointmentList, setAppointmentList] = useState([])
    const loadData = async() => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url)
        if (!response.ok) {
            console.log("response not ok: ", response)
        } else {
            const data = await response.json()
            console.log("Appointments JSON Data: ", data)
            setAppointmentList(data)
            }
        }

    useEffect(() => {
        loadData()
    },[])

    const [number, setNumberHandler] = useState('')
    const vinNumberHandler = event => {
        const value = event.target.value
        setNumberHandler(value)
    }

    return(

        <>
        <div className="mb-3">
            <label htmlFor="vin_search">Search by VIN</label>
            <input value={number} onChange={vinNumberHandler} required type="text" name="vin_search" id="vin_search">search...</input>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is vip?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointmentList.map(content=>{
                    return(
                        <tr key={content.href}>
                            <td>{ content.vin}</td>
                            <td>{ content.isvip }</td>
                            <td>{ content.customer }</td>
                            <td>{ String(content.date_time).slice(0,10) }</td>
                            <td>{ String(content.date_time).slice(11,16) }</td>
                            <td>{ content.technician.first_name } { content.technician.last_name }</td>
                            <td>{ content.reason }</td>
                            <td>{ content.status }</td>
                        </tr>
                    )
                })}
            </tbody>

      </table>
    </>
    )
}

export default AppointmentListH
