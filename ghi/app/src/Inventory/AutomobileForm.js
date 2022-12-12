import { useState, useEffect } from "react";

function AutomobileForm({list, setList}) {
    const noData = {
        color: "",
        year: "",
        vin: "",
        model_id: "",
    }

    const [automobileData, setAutomobileData] = useState(noData);

    const [models, setModels] = useState([]);

    const getModels = async () => {
        const modelUrl = "http://localhost:8100/api/models/";
        const response = await fetch(modelUrl);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        } else {
            alert("Something went wrong retrieving models!");
        }
    }

    useEffect(() => {
        getModels();
    }, []);

    const handleChange = (event) => {
        setAutomobileData({...automobileData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const automobileUrl =  "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify({...automobileData}),
            headers: {"Content-Type": "application/json"},
        }
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();
            setList([...list, newAutomobile]);
            setAutomobileData(noData);
            alert(`Automobile: ${newAutomobile.vin} added to inventory`);
        } else {
            alert("Something went wrong creating automobile!")
        }
    }

    return (
        <form onSubmit={handleSubmit} id="automobile-form">
            <div className="row">
                <div className="col">
                    <input onChange={handleChange} value={automobileData.color} placeholder="Color" required type="text" name="color" id="color" className="mb-1 form-control" />
                </div>
                <div className="col">
                    <input onChange={handleChange} value={automobileData.year} placeholder="Year" required type="text" name="year" id="year" className="mb-1 form-control" />
                </div>
                <div className="col">
                    <input onChange={handleChange} value={automobileData.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="mb-1 form-control" />
                </div>
            </div>
            <div className="mb-3">
                <select onChange={handleChange} value={automobileData.model_id} required id="model_id" name="model_id" className="form-select">
                  <option value="">Select a model</option>
                  {models?.map(model => {
                    return(
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    )
                  })}
                </select>
            </div>
            <button className="btn btn-primary">Add to inventory</button>
        </form>
    )



}

export default AutomobileForm;
