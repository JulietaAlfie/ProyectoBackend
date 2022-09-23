import React from "react";
import "./inicio.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Dentists from "./Dentists";
import Patients from "./Patients";
import Appointments from "./Appointment";
import { Button } from "primereact/button";

const Index = () => {
  function handleLogout() {
    localStorage.removeItem("jwt");
    window.location.reload();
  }
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Button className="p-button-raised p-button-rounded ">
            <Link to="/dentists">Dentists</Link>
          </Button>
          <Button className="p-button-raised p-button-rounded">
            <Link to="/patients">Patients</Link>
          </Button>
          <Button className="p-button-raised p-button-rounded">
            <Link to="/appointments">Appointments</Link>
          </Button>
        </div>
        <Switch>
          <Route path="/dentists">
            <Dentists />
          </Route>
          <Route path="/patients">
            <Patients />
          </Route>
          <Route path="/appointments">
            <Appointments />
          </Route>
        </Switch>
      </BrowserRouter>
      <Button
        onClick={handleLogout}
        label="logout"
        style={{ position: "fixed", bottom: "5vh", right: "5vw" }}
      />
    </>
  );
};
export default Index;
