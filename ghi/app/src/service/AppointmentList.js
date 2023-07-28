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
            setAppointmentList(data)
            updateVIPStatus(data)
            }
        }

    async function fetchVIPStatus(vin) {
        try {
            const url = `http://localhost:8100/api/automobiles/${vin}`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Expected error; the customer associated with this vin does not exist")
            }
            return "yes"
        } catch (error) {
            console.log("Error fetching status: ", error.message)
            return "no"
        }
    }

    // This one is kinda horrible (both to write and to read)
    // This is called once in loadData to apply the vip status to the relevant car

    // Define async fat arrow function that accepts data array
    const updateVIPStatus = async (data) => {
        // new list to store the result of the fetchVIPStatus
        const updatedList = await Promise.all(
            // basically we iterate through the content and run fetchVIPStatus on each automobiles vin in the inventory
            data.map(async (content) => {
                // we had to have the await keyword here because fetchVIPStatus is an async function
                const isvip = await fetchVIPStatus(content.vin)
                // the object will contain all of the properties already on content, then will add isvip as a new property to the content
                return {...content, isvip}
            })
        )
        setAppointmentList(updatedList)
        }

    useEffect(() => {
        loadData()
    },[]) // this empty dependency array needs to be there, you can remove it if you want and my appointment list will start a rave

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
            // prev is the previous state of the appointment list, we filter that by checking if the href on the previous state
            // ... matches the the href passed into the function.
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
