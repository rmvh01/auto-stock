function SalesPeopleList(props){
    console.log(props)
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
               { props.salesPeople.map(salesPeople => {
                return(
                    <tr key={salesPeople.href}>
                        <td>{salesPeople.employee_id}</td>
                        <td>{salesPeople.first_name}</td>
                        <td>{salesPeople.last_name}</td>
                    </tr>
                );
               })}
            </tbody>
      </table>
    )
}

export default SalesPeopleList
