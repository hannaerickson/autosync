import { useEffect, useState } from "react";

function ModelForm() {

    const noData = {
        name: "",
        picture_url: "",
        manufacturer_id: "",
    }

    const [modelData, setModelData] = useState(noData);
    const [manufacturers, setManufacturers] = useState([]);

    const getManufacturers = async () => {
        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(manufacturerUrl);
        if (response.ok) {
            const manufacturerData = await response.json();
            setManufacturers(manufacturerData.manufacturers);
        } else {
            alert("Something went wrong!");
        }
    }

    useEffect(() => {
        getManufacturers();
    }, [])

    const handleChange = (event) => {
        setModelData({...modelData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const modelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify({...modelData}),
            headers: {"Content-Type": "application/json"},
        }
        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();
            setModelData(noData);
            alert(`created model: ${newModel.name}`)
        }

    }

    return(
            <form onSubmit={handleSubmit} id="sale-form">
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={modelData.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={modelData.picture_url} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="name">Picture url</label>
            </div>
            <div className="mb-3">
                <select onChange={handleChange} value={modelData.manufacturer_id} required id="manufacturer_id" name="manufacturer_id" className="form-select">
                  <option value="">Select a manufacturer</option>
                  {manufacturers?.map(manufacturer => {
                    return(
                        <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                        </option>
                    )
                  })}
                </select>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>

    )

}

export default ModelForm;
