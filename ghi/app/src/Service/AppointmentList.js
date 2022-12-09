import React, { useState, useEffect } from 'react';

function AppointmentList() {
    const [list, setList] = useState(null);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setList(data.appointments);
        }
    }
    const deleteAppointment = async (id) => {
        const deleteUrl = `http://localhost:8080/api/appointments/${id}/`;
        const response = await fetch(deleteUrl, {method: 'DELETE'});
        fetchData()
    }

    const finishAppointment = async (id) => {
        const finishedUrl = `http://localhost:8080/api/appointments/${id}/`;
        const status = {"status": "COMPLETE"}
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(status),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(finishedUrl, fetchConfig);
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <br/>
            <h1>Service Appointments</h1>
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list?.filter((appointment) => appointment.status !== "COMPLETE")
                    ?.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.vip_status}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                                <td><button onClick={() => deleteAppointment(appointment.id)} className="btn btn-danger">Cancel</button></td>
                                <td><button onClick={() => finishAppointment(appointment.id)} name="status" value={appointment.status} className="btn btn-success">Finished</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AppointmentList
