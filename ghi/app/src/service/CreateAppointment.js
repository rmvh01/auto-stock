import { useState, useEffect} from "react"

function CreateAppointment() {
    const [vin, setVins] = useState("")
    const vinHandler = event => {
        const value = event.target.value
        setVins(value)
    }

    const [customer, setCustomer] = useState("")
    const customerHandler = event => {
        const value = event.target.value
        setCustomer(value)
    }

    const [date, setDate] = useState("")
    const dateHandler = event => {
        const value = event.target.value
        setDate(value)
    }

    const [time, setTime] = useState("")
    const timeHandler = event => {
        const value = event.target.value
        setTime(value)
    }

    const [technician, setTechnician] = useState('')
    const technicianHandler = event => {
        const value = event.target.value
        setTechnician(value)
    }

    const [reason, setReason] = useState("")
    const reasonHandler = event => {
        const value = event.target.value
        setReason(value)
    }

    const [technicians, setTechnicians] = useState([])
    const technicianDropDown = async() => {
        const url = "http://localhost:8080/api/technicians/"
        const response = await fetch(url)
        if (!response.ok) {
            console.log("response not ok: ", response)
        } else {
            const content = await response.json()
            setTechnicians(content)
            console.log("content: ", content)
        }
    }

    useEffect(() => {
        technicianDropDown()
    },[])

    const submitHandler = async(event) => {
        event.preventDefault()
        const data = {}
        data.vin = vin
        data.customer = customer
        data.date = date
        data.time = time
        data.technician = technician
        data.reason = reason
        console.log(data)

        const content = JSON.stringify(data)
        const url = 'http://localhost:8080/api/appointments'
        const fetchConfig = {
            method: 'post',
            body: content,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            console.log("response not ok: ", response)
        } else {
            const json = await response.json()
            console.log("json response is ok: ", json)
            setVins('')
            setCustomer('')
            setDate('')
            setTime('')
            setTechnicians('')
            setReason('')
        }
    }
    console.log(technician)
    return (
        <div className="row">
            <div className='offset-3 col-6'>
            <div className="shadow p-4 mt-4">
                <h1>Create Appointment</h1>
                <form onSubmit={submitHandler} id="create-location-form">
                <div className="form-floating mb-3">
                    <input value={vin} onChange={vinHandler} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="vin">Automobile Vin</label>
                </div>

                <div className="form-floating mb-3">
                    <input value={customer} onChange={customerHandler} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                    <label htmlFor="customer">Customer</label>
                </div>

                <div className="form-floating mb-3">
                    <input value={date} onChange={dateHandler} placeholder="date" required type="date" name="date" id="date" className="form-control" />
                    <label htmlFor="date">Date</label>
                </div>

                <div className="form-floating mb-3">
                    <input value={time} onChange={timeHandler} placeholder="time" required type="time" name="time" id="time" className="form-control" />
                    <label htmlFor="time">Time</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="technician">Technician</label>

                    <select value={technician} onChange={technicianHandler} required name="technician" id="technician" className="form-select">
                        <option value="">Technician</option>
                        {technicians.map(technician => {
                        return(
                            <option value={technician.id} key={technician.id}> {technician.first_name} {technician.last_name}</option>
                        )
                        })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input value={reason} onChange={reasonHandler} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
                    <label htmlFor="reason">Reason</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>
    )
}

export default CreateAppointment
