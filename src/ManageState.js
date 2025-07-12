import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ManageState() {
    const [states, setStates] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ name: '', code: '', countryId: '' });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                //update for
                await axios.put(`https://s-solution-1.onrender.com/api/States/${editId}`, {
                    id: editId,
                    name: formData.name,
                    code: formData.code,
                    countryId: formData.countryId,
                });
                alert('Country updated successfully!');
                setEditId(null); // out exit work
            } else {
                // ADD MODE
                await axios.post('https://s-solution-1.onrender.com/api/States', formData);
                alert('Country added successfully!');
            }

            setFormData({ name: '', code: '', countryId: '' }); // blank form
            fetchStates() // Refresh  for form data
        } catch (error) {
            console.error('Error saving country:', error);
        }
    };

    const hndledit= (state) => {
        setEditId(state.id);
        setFormData({
            name: state.name,
            code: state.code,
            countryId: state.countryId
        });
    };

    function fetchStates() {
        axios.get("https://s-solution-1.onrender.com/api/States")
            .then((res) => setStates(res.data))
    }

    const hndldlt = async (id) => {
        const confirmDelete = window.confirm('Are you sure delete country data...?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://s-solution-1.onrender.com/api/States/${id}`);
            alert('Country deleted successfully!');
            fetchStates();
        } catch (error) {
            console.error('Error deleting country:', error);
        }
    };

    useEffect(() => {
        fetchStates();
    }, [])
    return (
        <>
            <div className="container">
                <div className="form-container">
                    <h2 className="form-title">State & State Information</h2>
                    <form id="countryStateForm" onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label for="country" className="form-label">State Name</label>
                                <input className="form-control" name="name" value={formData.name} onChange={handleChange} list="countryOptions" id="country" placeholder="Select or type country" required />
                                <datalist id="stateOptions">
                                    <option value="United States" />
                                    <option value="United Kingdom" />
                                    <option value="Canada" />
                                    <option value="Australia" />
                                    <option value="Germany" />
                                </datalist>
                            </div>
                            <div className="col-md-4">
                                <label for="stateCode" className="form-label">State Code</label>
                                <input type="text" name="code" value={formData.code} onChange={handleChange} className="form-control" id="stateCode" placeholder="Enter State Code" required />
                            </div>
                            <div className="col-md-4">
                                <label for="countryId" className="form-label">Country-Code</label>
                                <input type="text" name="countryId" value={formData.countryId} onChange={handleChange} className="form-control" id="countryId" placeholder="Enter Country Id" required />
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
                                                setFormData({ name: '', code: '', countryId: '', stateId: '' });
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Add State
                                    </button>
                                </div>
                            )}
                        </div>

                    </form>
                </div>
                <div className="table-container">
                    <h3 className="table-title">State Records</h3>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Sr. Number</th>
                                    <th>State Name</th>
                                    <th>State Code</th>
                                    <th>Country_Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    states.map((s) => (
                                        <tr key={s.id}>
                                            <td>{s.id}</td>
                                            <td>{s.name}</td>
                                            <td>{s.code}</td>
                                            <td>{s.countryId}</td>
                                            <td className="action-btns">
                                                <button className="btn btn-sm btn-warning" onClick={() => hndledit(s)}>Edit</button>&nbsp;&nbsp;&nbsp;
                                                <button className="btn btn-sm btn-danger" onClick={() => hndldlt(s.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ManageState
