import { useState } from "react";

function ManufacturerForm({list, setList}) {

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
            setList([...list, newManufacturer]);
            setManufacturer(noData);
            alert(`added manufacturer: ${newManufacturer.name}`);
        } else {
            alert("Something went wrong creating manufacturer!");
        }
    }


    return(

        <form onSubmit={handleSubmit} id="manufacturer-form">
            <input onChange={handleChange} value={manufacturer.name} placeholder="Name" required type="text" name="name" id="name" className="mb-3 form-control" />
            <button className="btn btn-primary">Add manufacturer</button>
        </form>

    )

}

export default ManufacturerForm;
