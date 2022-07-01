import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const idRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();

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
    const newEmployee = {
      id: idRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      avatar: avatarRef.current.value,
    }
    employees.push(newEmployee);
    setEmployees(employees.slice());
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
          <th scope="col">Avatar</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
       { employees.map(element => 
        <tr>
          <td>{element.id}</td>
          <td>{element.first_name + " " + element.last_name} </td>
          <td>{element.email}</td>
          <td> <img src={element.avatar} alt="" /> </td>
          <td><Button type="button" variant="danger">Delete</Button></td>
        </tr>) }


        <tr className="input-row">
          <td><input type="text" ref={idRef} placeholder="ID" className="form-control"/></td>
          <td>
            <input type="text" ref={firstNameRef} placeholder="First Name" className="form-control"/>
            <input type="text" ref={lastNameRef} placeholder="Last Name" className="form-control"/>
          </td>
          <td><input type="text" ref={emailRef} placeholder="Email" className="form-control"/></td>
          <td><input type="text" ref={avatarRef} placeholder="Avatar" className="form-control"/></td>
          <td><Button onClick={() => addEmployee()} type="submit" variant="success">Add</Button></td>
        </tr>
        </tbody>
      </Table>
    </div>

  </div>)
}

export default Employees;