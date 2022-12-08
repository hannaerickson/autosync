import React, { useState, useEffect } from 'react';

function AppointmentHistory() {
    const [list, setList] = useState(null);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setList(data.appointments)
        }
    }

    const [query, setQuery] = useState('')

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <br/>
            <input type="text" placeholder="Search by VIN" className="search" onChange={(e)=>setQuery(e.target.value)} />
            <br/>
            <br/>
            <h1>Service History</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="table-success">
                        <th>VIN</th>
                        <th>CUSTOMER NAME</th>
                        <th>VIP STATUS</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>TECHNICIAN</th>
                        <th>REASON</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.filter((appointment) =>
                    appointment.vin.includes(query)
                    ).map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.vip_status}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AppointmentHistory
