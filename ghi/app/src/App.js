import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './Sales/CustomerForm';
import SalesPersonForm from './Sales/SalesPersonForm';
import SalesList from './Sales/SalesList';
import SaleForm from './Sales/SaleForm';
import TechnicianForm from './Service/TechnicianForm';
import AppointmentForm from './Service/AppointmentForm';
import AppointmentList from './Service/AppointmentList';
import AppointmentHistory from './Service/AppointmentHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="/salesperson" element={<SalesPersonForm />} />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/technician" element={<TechnicianForm />} />
          <Route path="/appointments/new" element={<AppointmentForm />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/history" element={<AppointmentHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
