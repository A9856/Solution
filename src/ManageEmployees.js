import axios from 'axios';
import React, { useEffect, useState } from 'react'
export default function ManageEmployees() {
    const [emplies, setEmplies] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', address: '', gender: '', salary: '', mobileNumber: '' });
    const [editId, setEditId] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // update mode 
                await axios.put(`https://s-solution-1.onrender.com/api/Emplies/${editId}`, {
                    id: editId,
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    gender: formData.gender,
                    salary: formData.salary,
                    mobileNumber: formData.mobileNumber
                });
                alert('Country updated successfully!');
                setEditId(null); // out update mode
            } else {
                // ADD MODE
                await axios.post('https://s-solution-1.onrender.com/api/Emplies', formData);
                alert('Country added successfully!');
            }

            setFormData({ name: '', email: '', address: '', gender: '', salary: '', mobileNumber: '' }); //blank  form
            fetchemplies() // Refresh for form  data
        } catch (error) {
            console.error('Error saving country:', error);
        }
    };

    const hndledit = (employee) => {
        setEditId(employee.id);
        setFormData({
            name: employee.name,
            email: employee.email,
            address: employee.address,
            gender: employee.gender,
            salary: employee.salary,
            mobileNumber: employee.mobileNumber
        });
    };

    function fetchemplies() {
        axios.get("https://s-solution-1.onrender.com/api/Emplies")
            .then((res) => setEmplies(res.data))
    }

    const hndldlt = async (id) => {
        const confirmDelete = window.confirm('Are you sure delete country data...?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://s-solution-1.onrender.com/api/Emplies/${id}`);
            alert('Country deleted successfully!');
            fetchemplies()
        } catch (error) {
            console.error('Error deleting country:', error);
        }
    };

    useEffect(() => {
        fetchemplies()
    }, [])
    return (
        <>
            <div className="form-container">
                <h2 className="form-title">Employee & Employees Information</h2>
                <form id="countryStateForm" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="countryName" className="form-label">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter Country Name" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mail" className="form-label">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter Email-Id " required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-control" placeholder="Enter Address" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input type="text" name='salary' value={formData.salary} onChange={handleChange} className="form-control" id="salary" placeholder="Enter Salary" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mobileNumber" className="form-label">mobileNumber</label>
                            <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="form-control" placeholder="Enter Contact Number" required />
                        </div>
                    </div>
                    <div className="row">
                        {editId ? (
                            <>
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Update
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100"
                                        onClick={() => {
                                            setEditId(null);
                                            setFormData({name: '', email: '', address: '', gender: '', salary: '', mobileNumber: '' });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary w-100">
                                    Add Employees
                                </button>
                            </div>
                        )}
                    </div>

                </form >
            </div >
            <div className="table-container">
                <h3 className="table-title">Employee Records</h3>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sr. Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>salary</th>
                                <th>PhoneNumber</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emplies.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.address}</td>
                                    <td>{e.gender}</td>
                                    <td>{e.salary}</td>
                                    <td>{e.mobileNumber}</td>
                                    <td className="action-btns">
                                        <button className="btn btn-sm btn-warning" onClick={() => hndledit(e)}>Edit</button>&nbsp;&nbsp;&nbsp;
                                        <button className="btn btn-sm btn-danger" onClick={() => hndldlt(e.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


