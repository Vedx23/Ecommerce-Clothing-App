import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './adminnavbar';
import { Link, useNavigate } from 'react-router-dom';

function Asellers() {
  const [sellers, setSellers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/get")
      .then((result) => {
        console.log(result);
        setSellers(result.data);
      })
      .catch(err => console.log("Error occurred"));
  }, []);

  

  const removeSeller = (id) => {
    axios.put('http://localhost:4000/users/remove/' + id)
      .then(response => setSellers(response.data.role));
  }

  console.log(sellers);

  return (
    <>
      <Adminnavbar />
      <div className="container mt-5">
        <h2>Seller List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.id}</td>
                <td>{seller.first_name}</td>
                <td>{seller.last_name}</td>
                <td>{seller.email}</td>
                <td>{seller.mobile}</td>
                <td>{seller.status}</td>
                <td>{seller.role}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeSeller(seller.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Asellers;