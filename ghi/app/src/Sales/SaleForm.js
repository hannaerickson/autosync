import { useState, useEffect } from "react";


function SaleForm() {

    const noData = {
        "automobile": "",
        "sales_person": "",
        "customer": "",
        "price": "",
    }

    const [saleData, setSaleData] = useState(noData);
    const [automobiles, setAutomobiles] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [newSale, setNewSale] = useState(null)


    const getAutomobiles = async () => {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(automobileUrl);
        const autoData = await response.json();
        console.log(autoData);
        setAutomobiles(autoData.autos);
    }


    const getSalesPersons = async () => {
        const salesPersonsUrl = "http://localhost:8090/api/salespersons/";
        const response = await fetch(salesPersonsUrl);
        const salesPersonsData = await response.json();
        setSalesPersons(salesPersonsData.sales_persons);
    }

    const getCustomers = async () => {
        const customersUrl = "http://localhost:8090/api/customers/";
        const response = await fetch(customersUrl);
        const customersData = await response.json();
        setCustomers(customersData.customers);
    }

    useEffect(() => {
        getAutomobiles();
        getSalesPersons();
        getCustomers();
    }, []);


    const handleChange = (event) => {
        setSaleData({...saleData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event, vin) => {
        event.preventDefault();
        const salesUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify({...saleData}),
            headers: {"Content-Type": "application/json"},
        }
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            setSaleData(noData);
            setNewSale(newSale);
            alert(`Enjoy your new ride ${newSale.customer.name}!`)
        } else {
            console.log("error creating sale");
        }
        const autoUrl = `http://localhost:8100/api/automobiles/${saleData.automobile}/`
        const autoResponse = await fetch(autoUrl, {method: "DELETE"})
        if (autoResponse.ok) {
            alert(`deleted automobile ${saleData.automobile}`);
        } else {
            alert("Something went wrong!");
        }
        getAutomobiles();
    }


    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="sale-form">
            <div className="mb-3">
                <select onChange={handleChange} value={saleData.automobile} required id="automobile" name="automobile" className="form-select">
                  <option value="">Select an automobile</option>
                  {automobiles?.map(automobile => {
                    return(
                        <option key={automobile.id} value={automobile.vin}>
                            {automobile.vin}
                        </option>
                    )
                  })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={handleChange} value={saleData.sales_person} required id="sales_person" name="sales_person" className="form-select">
                  <option value="">Select a sales person</option>
                  {salesPersons?.map(salesPerson => {
                    return(
                        <option key={salesPerson.id} value={salesPerson.employee_number}>
                            {salesPerson.name}
                        </option>
                    )
                  })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={handleChange} value={saleData.customer} required id="customer" name="customer" className="form-select">
                  <option value="">Select a customer</option>
                  {customers?.map(customer => {
                    return(
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    )
                  })}
                </select>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={saleData.price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                <label htmlFor="city">Price</label>
            </div>
              <button className="btn btn-primary">Sell</button>
            </form>
          </div>
        </div>
        </div>
    )

}

export default SaleForm;
