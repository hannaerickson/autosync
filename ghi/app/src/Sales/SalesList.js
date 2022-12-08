import { useState, useEffect } from "react";


function SalesList() {

    const [salesData, setSalesData] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);


    const getSalesPersons = async () => {
        const salesPersonsUrl = "http://localhost:8090/api/salespersons/";
        const response = await fetch(salesPersonsUrl);
        const data = await response.json()
        setSalesPersons(data.sales_persons);
    }

    const getSales = async () => {
        const salesUrl = "http://localhost:8090/api/sales/";
        const response = await fetch(salesUrl);
        const data = await response.json();
        setSalesData(data.sales)
    }

    const handleChange = (event) => {
        getSales();
        setSalesData(salesData.filter(sale => sale.sales_person.id === event.target.value));
    }


    useEffect(() => {
        getSalesPersons();
        // getSales();
    }, []);




    return(
        <div>
            <h1>Sales Person History</h1>
            <br/>
            <h6>Select a sales person</h6>
            <div className="mb-3">
                <select onChange={handleChange} required id="sales_person" name="sales_person" className="form-select">
                  <option value="">Select a sales person</option>
                  {salesPersons?.map(salesPerson => {
                    return(
                        <option key={salesPerson.id} value={salesPerson.id}>
                            {salesPerson.name}
                        </option>
                    )
                  })}
                </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                {salesData?.map(sale => {
                    return (
                    <tr key={sale.id}>
                        <td>{ sale.sales_person.name }</td>
                        <td>{ sale.customer.name }</td>
                        <td>{ sale.automobile.vin }</td>
                        <td>{ sale.price }</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        </div>
    )

}

export default SalesList;
