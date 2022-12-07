import React, { useState, useEffect } from 'react';

function TechnicianForm(props) {
    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Enter a Technician</h1>
                <form onSubmit={handleSubmit} id="create-technician">
                <div className="form-floating mb-3">
                    <input onChange={} value={} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={} value={} placeholder="Employee number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                    <label htmlFor="employee_number">Employee Number</label>
                </div>
                <br></br>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default TechnicianForm
