import { useState } from "react";

function ManufacturerForm() {

    const noData = {name: ""};

    const [manufacturer, setManufacturer] = useState(noData);

    const handleChange = (event) => {setManufacturer({...manufacturer, [event.target.name]: event.target.value})}

    const handleSubmit = async (event) => {
        event.preventDefault();
        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(manufacturer),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            setManufacturer(noData);
            alert(`added manufacturer: ${newManufacturer.name}`);
        } else {
            alert("Something went wrong!");
        }
    }


    return(

        <form onSubmit={handleSubmit} id="manufacturer-form">
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={manufacturer.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
        </form>

    )

}

export default ManufacturerForm;
