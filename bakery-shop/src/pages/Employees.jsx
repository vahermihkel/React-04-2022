import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

function Employees() {
  const [employees, setEmployees] = useState([]);

  // TODO: Load data from backend service
  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then(res => res.json())
      .then(body => {
        setEmployees(body.data);
      });
  }, []);

  // employees.map()   --> map is not a function
  // [].map() -> korrektne
  // {}.map()
  // undefined.map()

  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
  }

  const deleteEmployee = (employee) => {
    // TODO: Delete an employee from the table
  }

  return (<div>
    <div className="container">
      <h2 className="mb-4">Employees</h2>
      <Table className="table table-hover table-bordered table-sortable">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          {/* <!-- TODO: Add a column for an avatar --> */}
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>123</td>
          <td>Added name 1</td>
          <td>email@email.com</td>
          <td><Button type="button" variant="danger">Delete</Button></td>
        </tr>
        <tr>
          <td>124</td>
          <td>Added name 2</td>
          <td>email2@email.com</td>
          <td><Button type="button" variant="danger">Delete</Button></td>
        </tr>

        <tr className="input-row">
          <td><input type="text" placeholder="ID" className="form-control"/></td>
          <td><input type="text" placeholder="Name" className="form-control"/></td>
          <td><input type="text" placeholder="Email" className="form-control"/></td>
          <td><Button type="submit" variant="success">Add</Button></td>
        </tr>
        </tbody>
      </Table>
    </div>

  </div>)
}

export default Employees;