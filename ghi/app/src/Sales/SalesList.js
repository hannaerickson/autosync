import { useState, useEffect } from "react";


function SalesList() {

    return(
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
          {sales?.map(sale => {
            return (
              <tr key={sale.id}>
                <td>{ sale.sales_person }</td>
                <td>{ sale.customer.name }</td>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.price }</td>
              </tr>
            );
          })}
          </tbody>
        </table>
    )

}

export default SalesList;
