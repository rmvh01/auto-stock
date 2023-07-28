import {useState, useEffect} from "react";

function CreateTechnician() {
    const [first_name, setFirstName] = useState("")
    const firstNameHandler = event => {
        const value = event.target.value
        setFirstName(value)
    }

    const [last_name, setLastName] = useState("")
    const setLastNameHandler = event => {
        const value = event.target.value
        setLastName(value)
    }

    const [employee_id, setEmployeeID] = useState("")
    const setEmployeeIDHandler = event => {
        const value = event.target.value
        setEmployeeID(value)
    }
    async function submithandler(event) {
        event.preventDefault()
        const data = {}
        data.first_name = first_name
        data.last_name = last_name
        data.employee_id = employee_id
        const content = JSON.stringify(data)
        const url = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: 'post',
            body: content,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            console.log("response not ok", response)
        } else {
            const json = await response.json()
            setFirstName("")
            setLastName("")
            setEmployeeID("")
        }
    }
    return (
      <div className="row">
        <div className='offset-3 col-6'>
          <div className="shadow p-4 mt-4">
            <h1>Create Technician</h1>
            <form onSubmit={submithandler} id="create-location-form">
              <div className="form-floating mb-3">
                <input value={first_name} onChange={firstNameHandler} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">first Name</label>
              </div>

              <div className="form-floating mb-3">
                <input value={last_name} onChange={setLastNameHandler} placeholder="Color" required type="text" name="Color" id="Color" className="form-control" />
                <label htmlFor="roomCount">last Name</label>
              </div>

              <div className="form-floating mb-3">
                <input value={employee_id} onChange={setEmployeeIDHandler} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                <label htmlFor="city">employee ID</label>
              </div>
              <div className="mb-3">
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>
      )
}

export default CreateTechnician
