
import { useEffect, useState } from "react";

function AppointmentListH() {

    const [appointmentList, setAppointmentList] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const loadData = async() => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url)
        if (!response.ok) {
            console.log("response not ok: ", response)
        } else {
            const data = await response.json()
            console.log("Appointments JSON Data: ", data)
            setAppointmentList(data)
            setFilteredAppointments(data)
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

    useEffect(() => {
        const filtered = appointmentList.filter(
            (content) => content.vin.includes(number)
        )
        setFilteredAppointments(filtered)
    }, [number, appointmentList])

    return(
        <>
        <h1>Search by VIN</h1>
        <br></br>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">&#128665;</span>
            <input value={number} onChange={vinNumberHandler} required type="text" class="form-control" placeholder="search..." name="search" id="search" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredAppointments.map(content=>{
                    return(
                        <tr key={content.href}>
                            <td>{ content.vin}</td>
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
