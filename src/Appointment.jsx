import React, { useEffect, useRef, useState } from "react";
import { AppointmentService } from "./service/AppointmentService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DentistService } from "./service/DentistService";
import { PatientService } from "./service/PatientService";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "./FormDemo.css";

const Appointments = () => {
  const [turnos, setAppointments] = useState([]);
  const [odontologos, setDentists] = useState([]);
  const [patients, setPatients] = useState([]);

  const [visible, setVisible] = useState(false);
  const [turno, setAppointment] = useState({
    id: null,
    date: "",
    patientId: null,
    odontologoId: null
  });
  const [patient, setPatient] = useState();
  const [odontologo, setDentist] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState({
    id: null,
    date: null,
    patientId: null,
    odontologoId: null
  });
  const [date, setDate] = useState("");
  const toast = useRef(null);

  let items = [
    {
      label: "Editar",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        showEditDialog();
      }
    },
    {
      label: "Eliminar",
      icon: "pi pi-fw pi-trash",
      command: () => {
        eliminar();
      }
    }
  ];
  const turnoService = new AppointmentService();
  const odontologoService = new DentistService();
  const patientService = new PatientService();

  const footer = (
    <Button label="Actualizar" icon="pi pi-check" onClick={update} />
  );

  useEffect(() => {
    turnoService.getAll().then((data) => {
      setAppointments(data);
      // console.log(data)
    });
    odontologoService.getAll().then((data) => {
      setDentists(
        data.map((odontologo) => {
          let id = odontologo.id;
          let nombre = odontologo.nombre;
          let apellido = odontologo.apellido;
          return { label: id + "- " + nombre + " " + apellido, value: id };
        })
      );
    });
    patientService.getAll().then((data) => {
      setPatients(
        data.map((patient) => {
          let id = patient.id;
          let nombre = patient.nombre;
          let apellido = patient.apellido;
          return { label: id + "- " + nombre + " " + apellido, value: id };
        })
      );
    });
  }, []);

  function save() {
    turnoService
      .save(turno)
      .then(
        setVisible(false),
        setAppointment({
          id: null,
          date: null,
          patientId: null,
          odontologoId: null
        }),
        setDate(null),
        setDentist(null),
        setPatient(null)
      )
      .then(turnoService.getAll().then((data) => setAppointments(data)));
    toast.current.show({
      severity: "success",
      summary: "Atención!",
      detail: "Se guardó el registro correctamente."
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAppointment({
      id: null,
      date: date,
      patientId: patient,
      odontologoId: odontologo
    });
    if (turno) {
      save();
    }
  }

  let handleAppointments = turnos.map((turn) => {
    let patientTransitorio = patients.find(
      (pac) => pac.value === turn.patientId
    );
    let patientOk;
    if (patientTransitorio) {
      patientOk =
        patientTransitorio.label.split(" ")[1] +
        " " +
        patientTransitorio.label.split(" ")[2];
    }
    let odontologoTransitorio = odontologos.find(
      (odonto) => odonto.value === turn.odontologoId
    );
    let odontologoOk;
    if (odontologoTransitorio) {
      odontologoOk =
        odontologoTransitorio.label.split(" ")[1] +
        " " +
        odontologoTransitorio.label.split(" ")[2];
    }
    return {
      id: turn.id,
      date: turn.date ? turn.date.slice(0, 10) : null,
      patientId: patientOk,
      odontologoId: odontologoOk
    };
  });

  function update() {
    turnoService
      .update(selectedAppointment)
      .then(
        setVisible(false),
        setSelectedAppointment({
          id: null,
          date: null,
          patientId: null,
          odontologoId: null
        }),
        setAppointment(null),
        setDate(null),
        setDentist(null),
        setPatient(null)
      )
      .then(turnoService.getAll().then((data) => setAppointments(data)));
    toast.current.show({
      severity: "info",
      summary: "Atención!",
      detail: "Se guardó el registro correctamente."
    });
  }

  function eliminar() {
    if (window.confirm("Realmente desea eliminar el registro?")) {
      turnoService
        .delete(selectedAppointment.id)
        .then(
          toast.current.show({
            severity: "warn",
            summary: "Atención!",
            detail: "Se eliminó el registro correctamente."
          })
        )
        .then(turnoService.getAll().then((data) => setAppointments(data)));
    }
  }

  function showEditDialog() {
    setAppointment({
      id: selectedAppointment.id,
      date: selectedAppointment.date,
      patient: selectedAppointment.patientId,
      odontologo: selectedAppointment.odontologoId
    });
    setVisible(true);
  }
  function formatDateToString(date) {
    // 01, 02, 03, ... 29, 30, 31
    var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = date.getFullYear();

    // create the format you want
    return yyyy + "-" + MM + "-" + dd;
  }

  return (
    <>
      <div style={{ width: "80%", marginTop: "20px", margin: "0 auto" }}>
        <Dialog
          header="Actualizar turno"
          visible={visible}
          style={{ width: "400px" }}
          footer={footer}
          modal={true}
          onHide={() => setVisible(false)}
        >
          <form id="turno-form">
            <div className="p-field">
              <span className="p-float-label">
                <Calendar
                  id="date1"
                  name="date1"
                  value={date}
                  onChange={(e) => {
                    setSelectedAppointment((prevState) => {
                      return {
                        ...prevState,
                        date: formatDateToString(e.value)
                      };
                    });
                    setDate(formatDateToString(e.value));
                  }}
                  dateFormat="dd-mm-yy"
                  mask="99/99/9999"
                  showIcon
                />
                <label htmlFor="date">Fecha</label>
              </span>
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Dropdown
                  id="dropdown1"
                  value={odontologo}
                  onChange={(e) => {
                    setSelectedAppointment((prevState) => {
                      return { ...prevState, odontologoId: e.value };
                    });
                    setDentist(e.value);
                  }}
                  options={odontologos}
                />
                <label htmlFor="odontologo">Dentists</label>
              </span>
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Dropdown
                  id="dropdown2"
                  value={patient}
                  onChange={(e) => {
                    setSelectedAppointment((prevState) => {
                      return { ...prevState, patientId: e.value };
                    });
                    setPatient(e.value);
                  }}
                  options={patients}
                />
                <label htmlFor="patient">Patients</label>
              </span>
            </div>
          </form>
        </Dialog>
      </div>
      <div className="p-d-flex p-jc-center">
        <div className="card">
          <fieldset>
            <legend className="p-text-center">Registrar turno</legend>
            <form className="p-fluid" onSubmit={handleSubmit}>
              <div className="p-field">
                <span className="p-float-label">
                  <Calendar
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => {
                      setAppointment((prevState) => {
                        return {
                          ...prevState,
                          date: formatDateToString(e.value)
                        };
                      });
                      setDate(formatDateToString(e.value));
                    }}
                    dateFormat="dd-mm-yy"
                    mask="99/99/9999"
                    showIcon
                  />
                  <label htmlFor="date">Fecha</label>
                </span>
              </div>
              <div className="p-field">
                <span className="p-float-label">
                  <Dropdown
                    value={odontologo}
                    onChange={(e) => {
                      setAppointment((prevState) => {
                        return { ...prevState, odontologoId: e.value };
                      });
                      setDentist(e.value);
                    }}
                    options={odontologos}
                  />
                  <label htmlFor="odontologo">Dentists</label>
                </span>
              </div>
              <div className="p-field">
                <span className="p-float-label">
                  <Dropdown
                    value={patient}
                    onChange={(e) => {
                      setAppointment((prevState) => {
                        return { ...prevState, patientId: e.value };
                      });
                      setPatient(e.value);
                    }}
                    options={patients}
                  />
                  <label htmlFor="patient">Patients</label>
                </span>
              </div>
              <Button type="submit" label="Submit" className="p-mt-2" />
            </form>
          </fieldset>
        </div>
      </div>
      <br />
      <br />
      <div style={{ width: "80%", marginTop: "20px", margin: "0 auto" }}>
        <Menubar model={items} />
        <br />
        <Panel header="Appointments">
          <DataTable
            value={handleAppointments.sort()}
            paginator={true}
            rows="10"
            selectionMode="single"
            selection={selectedAppointment}
            onSelectionChange={(e) => setSelectedAppointment(e.value)}
          >
            <Column field="id" header="ID" sortable></Column>
            <Column field="date" header="Fecha" sortable></Column>
            <Column field="patientId" header="Patient"></Column>
            <Column field="odontologoId" header="Dentist"></Column>
          </DataTable>
        </Panel>
      </div>
      <Toast ref={toast}></Toast>
    </>
  );
};

export default Appointments;
