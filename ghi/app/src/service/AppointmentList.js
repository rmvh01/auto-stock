import { useEffect, useState } from "react";

function AppointmentList() {

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
            updateVIPStatus(data)
            }
        }

    async function fetchVIPStatus(vin) {
        try {
            const url = `http://localhost:8100/api/automobiles/${vin}`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("404 Does not exist")
            }
            return "yes"
        } catch (error) {
            console.log("Error fetching status: ", error.message)
            return "no"
        }
    }

    const updateVIPStatus = async (data) => {
        const updatedList = await Promise.all(
            data.map(async (content) => {
                const isvip = await fetchVIPStatus(content.vin)
                return {...content, isvip}
            })
        )
        setAppointmentList(updatedList)
        }

    useEffect(() => {
        loadData()
    },[])

    async function finishAppointment(appointment_href) {
        const url = `http://localhost:8080/${appointment_href}/finish/`
        const fetchConfig = {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            console.log("response not ok")
        } else {
            setAppointmentList(prev => prev.filter(appointment => appointment.href !== appointment_href))
        }
    }

    async function cancelAppointment(appointment_href) {
        const url = `http://localhost:8080/${appointment_href}/cancel/`
        const fetchConfig = {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            console.log("response not ok")
        } else {
            setAppointmentList(prev => prev.filter(appointment => appointment.href !== appointment_href))
        }
    }



    return(
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
                            <td><button onClick={() => finishAppointment(content.href)}>Finish</button></td>
                            <td><button onClick={() => cancelAppointment(content.href)}>Cancel</button></td>
                        </tr>
                    )
                })}
            </tbody>

      </table>
    )
}

export default AppointmentList
