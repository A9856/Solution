import axios from 'axios';
import React, { useEffect, useState } from 'react'
function ManageDistrict() {
    const [districts, setDistricts] = useState([]);
    const [formData, setFormData] = useState({ name: '', code: '', countryId: '', stateId: '' });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                //update mode
                await axios.put(`https://s-solution-1.onrender.com/api/Districts/${editId}`, {
                    id: editId,
                    name: formData.name,
                    code: formData.code,
                    countryId: formData.countryId,
                    stateId: formData.stateId
                });
                alert('Country updated successfully!');
                setEditId(null); // out update mode
            } else {
                // ADD MODE
                await axios.post('https://s-solution-1.onrender.com/api/Districts', formData);
                alert('Country added successfully!');
            }

            setFormData({ name: '', code: '',countryId:'',stateId:'' }); //data reset form
            fetchDistricts(); // Refresh for form data 
        } catch (error) {
            console.error('Error saving country:', error);
        }
    };

    function fetchDistricts() {
        axios.get("https://s-solution-1.onrender.com/api/Districts")
            .then((res) => setDistricts(res.data))
    }

    const hndldlt= async (id) => {
        const confirmDelete = window.confirm('Are you sure delete district data...?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://s-solution-1.onrender.com/api/Districts/${id}`);
            alert('Country deleted successfully!');
            fetchDistricts()
        } catch (error) {
            console.error('Error deleting country:', error);
        }
    };

    const hndledit = (district) => {
        setEditId(district.id);
        setFormData({
            name: district.name,
            code:district.code,
            countryId:district.countryId,
            stateId:district.stateId
        });
    };

    useEffect(() => {
        fetchDistricts()
    }, [])
    return (
        <>
            <div className="container">
                <div className="form-container">
                    <h2 className="form-title">District & District Information</h2>
                    <form id="countryStateForm" onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label for="district" className="form-label">District Name</label>
                                <input className="form-control" list="districtOptions" id="district" name="name" value={formData.name} onChange={handleChange} placeholder="Select district" required />
                                <datalist id="districtOptions">
                                    <option value="Prayagraj" />
                                    <option value="Jaunpur" />
                                    <option value="Azamgarh" />
                                    <option value="Mirzapur" />
                                </datalist>

                            </div>
                            <div className="col-md-3">
                                <label for="districtCode" className="form-label">District Code</label>
                                <input className="form-control" list="districtOptions" id="district" name="code" value={formData.code} onChange={handleChange} placeholder="Select district code" required />
                                <datalist id="DistrictcodeOptions">
                                    <option value="Pryg" />
                                    <option value="Jnpr" />
                                    <option value="Azmgr" />
                                    <option value="Mrzpr" />
                                </datalist>
                            </div>
                            <div className="col-md-3">
                                <label for="countryId" className="form-label">Country-Id</label>
                                <input type="text" name="countryId" value={formData.countryId} onChange={handleChange} className="form-control" id="countryId" placeholder="Enter Country Id" required />
                            </div>
                            <div className="col-md-3">
                                <label for="stateId" className="form-label">State-Id</label>
                                <input type="text" name="stateId" value={formData.stateId} onChange={handleChange} className="form-control" id="stateId" placeholder="Enter State Id" required />

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
                                            setFormData({name: '', code: '', countryId: '', stateId: '' });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary w-100">
                                    Add District
                                </button>
                            </div>
                        )}
                    </div>
                    </form>
                </div>
                <div className="table-container">
                    <h3 className="table-title">District Records</h3>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>District Name</th>
                                    <th>District Code</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {districts.map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.id}</td>
                                        <td>{d.name}</td>
                                        <td>{d.code}</td>
                                        <td>{d.countryId}</td>
                                        <td>{d.stateId}</td>
                                        <td className="action-btns">
                                            <button className="btn btn-sm btn-warning" onClick={() => hndledit(d)}>Edit</button>&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-sm btn-danger" onClick={() => hndldlt(d.id)}>Delete</button>
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
export default ManageDistrict
