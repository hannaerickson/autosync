import { useState, useEffect } from "react";
import AutomobileForm from "./AutomobileForm";


function AutomobilesList() {
const [list, setList] = useState([]);

const fetchData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setList(data.autos)
        console.log("autos", data.autos)
    }
}

useEffect(() => {
    fetchData()
}, []);

return (
    <div>
        <br/>
        <h1>Automobiles</h1>
        <AutomobileForm list={list} setList={setList}></AutomobileForm>
        <br/>
        <table className="table table-striped">
            <thead>
                <tr className="table-success">
                    <th>MANUFACTURER</th>
                    <th>MODEL</th>
                    <th>VIN</th>
                    <th>YEAR</th>
                    <th>COLOR</th>
                </tr>
            </thead>
            <tbody>
                {list?.map(auto => {
                    return (
                        <tr key={auto.id} value={auto.id}>
                            <td>{auto.model.manufacturer.name}</td>
                            <td>{auto.model.name}</td>
                            <td>{auto.vin}</td>
                            <td>{auto.year}</td>
                            <td>{auto.color}</td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
)
}

export default AutomobilesList;
