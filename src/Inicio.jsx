import React from "react";
import "./inicio.css"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Odontologos from "./Odontologos";
import Pacientes from "./Pacientes";
import Turnos from "./Turno";
import { Button } from 'primereact/button';


const Index = () => {
    function handleLogout() {
        localStorage.removeItem("jwt")
        window.location.reload() 
    }
    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Button className="p-button-raised p-button-rounded ">
                        <Link to="/odontologos">Odontologos</Link>
                    </Button>
                    <Button className="p-button-raised p-button-rounded">
                        <Link to="/pacientes">
                            Pacientes
                        </Link>
                    </Button>
                    <Button className="p-button-raised p-button-rounded">
                        <Link to="/turnos">
                            Turnos
                        </Link>
                    </Button>
                </div>
                <Switch>
                    <Route path="/odontologos"><Odontologos /></Route>
                    <Route path="/pacientes"><Pacientes /></Route>
                    <Route path="/turnos"><Turnos /></Route>
                </Switch>
            </BrowserRouter>
            <Button onClick={handleLogout} label="logout" style={{position: "fixed", bottom: "5vh", right: "5vw"}}/>
        </>
    )
}
export default Index; 