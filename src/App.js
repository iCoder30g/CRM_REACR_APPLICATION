
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
import NotFound from './component/NotFound';
import Unauthorised from "./component/Unauthorised"
import RequireAuth from './component/RequireAuth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';




const ROLES = {
  "CUSTOMER": "CUSTOMER",
  "ENGINEER": "ENGINEER",
  "ADMIN": "ADMIN",
}



function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        } />

        {/* unauthorised page */}
        <Route path="unauthorised" element={<Unauthorised />} />

        {/* anmin page  */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}> */}
          <Route path="/admin" exact element={<Admin />} />
        {/* </Route> */}

        {/*  customer page */}
        <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path="/customer" element={<Customer />} />
        </Route>

        {/* engineer page */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}> */}
          <Route path="/engineer" element={<Engineer />} />
        {/* </Route> */}

        {/* not found page */}
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </Router>
    
  );
}

export default App;
