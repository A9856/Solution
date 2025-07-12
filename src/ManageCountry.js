import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ManageCountry() {
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({ name: '', code: '' });
    const [editId,setEditId]=useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // update mode
        await axios.put(`https://s-solution-1.onrender.com/api/Countries/${editId}`, {
          id: editId,
          name: formData.name,
          code: formData.code,
        });
        alert('Country updated successfully!');
        setEditId(null); // out upadte mode
      } else {
        // ADD MODE
        await axios.post('https://s-solution-1.onrender.com/api/Countries', formData);
        alert('Country added successfully!');
      }

      setFormData({ name: '', code: '' }); //blank form
       fetchCountries(); // Refresh form data
    } catch (error) {
      console.error('Error saving country:', error);
    }
  };


  const hndldlt = async (id) => {
    const confirmDelete = window.confirm('Are you sure delete country data...?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://s-solution-1.onrender.com/api/Countries/${id}`);
      alert('Country deleted successfully!');
     fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };
    const hndledit = (country) => {
    setEditId(country.id);
    setFormData({ name: country.name, code: country.code });
  };

    function fetchCountries() {
        axios.get("https://s-solution-1.onrender.com/api/Countries")
            .then((res) => setCountries(res.data))
    }


    useEffect(() => {
        fetchCountries();
    }, [])

    return (
        <>
            <div className="container">
                <div className="form-container">
                    <h2 className="form-title">Country & Country Information</h2>
                    <form id="countryStateForm"onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label for="countryName" className="form-label">Country Name</label>
                                <input type="text" className="form-control"name="name"value={formData.name}onChange={handleChange} id="countryName" placeholder="Enter Country Name" required />
                            </div>
                            <div className="col-md-6">
                                <label for="countryCode" className="form-label">Country Code</label>
                                <input type="text" className="form-control"name="code"value={formData.code}onChange={handleChange} id="countryCode" placeholder="Enter Country Code" required />
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
                                            setFormData({name: '', code: '' });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary w-100">
                                    Add Country
                                </button>
                            </div>
                        )}
                    </div>
                    </form>
                </div>
                <div className="table-container">
                    <h3 className="table-title">Country Records</h3>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Sr. Number</th>
                                    <th>Country Name</th>
                                    <th>Country Code</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countries.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.code}</td>
                                        <td className="action-btns">
                                            <button className="btn btn-sm btn-warning"onClick={()=>hndledit(c)}>Edit</button>&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-sm btn-danger"onClick={() => hndldlt(c.id)}>Delete</button>
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
export default ManageCountry
