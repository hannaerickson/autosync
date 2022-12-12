import { useEffect, useState } from "react";

function ModelForm({list, setList}) {
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
            alert("Something went wrong retrieving manufacturers!");
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
            setList([...list, newModel]);
            setModelData(noData);
            alert(`created model: ${newModel.name}`);
        } else {
            alert("Something went wrong creating model!");
        }

    }

    return(
        <form onSubmit={handleSubmit} id="sale-form">
            <div className="row">
                <div className="col-sm">
                    <input onChange={handleChange} value={modelData.name} placeholder="Name" required type="text" name="name" id="name" className="mb-1 form-control" />
                </div>
                <div className="col-sm-9">
                    <input onChange={handleChange} value={modelData.picture_url} placeholder="Image Address" required type="text" name="picture_url" id="picture_url" className="mb-1 form-control" />
                </div>
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
        <button className="btn btn-primary">Add model</button>
        </form>
    )

}

export default ModelForm;
