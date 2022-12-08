import { useState, useEffect } from "react";

function ModelsList() {
    const [list, setList] = useState(null);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setList(data.models)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <br/>
            <h1>All Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="table-success">
                        <th>NAME</th>
                        <th>IMAGE</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td><img className="list-images" src={model.picture_url}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ModelsList;
