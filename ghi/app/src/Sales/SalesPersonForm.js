import { useState, useEffect } from "react";


function SalesPersonForm() {

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a sales person</h1>
            <form onSubmit={handleSubmit} id="employee-form">
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={salesPersonData.name} placeholder="Enter your full name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChange} value={salesPersonData.employee_number} placeholder="Please enter an employee PIN" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>
    )

}

export default SalesPersonForm;
