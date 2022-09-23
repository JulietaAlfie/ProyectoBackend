import "./App.css";
import React, { Component } from "react";
import { PatientService } from "./service/PatientService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/nova-alt/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class Patients extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      visible: false,
      patient: {
        id: null,
        name: "",
        lastname: "",
        dni: "",
        residence: ""
      },
      selectedPatient: {},
      footer: this.footer1
    };
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        }
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          this.showEditDialog();
        }
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.delete();
        }
      }
    ];
    this.patientService = new PatientService();
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.footer1 = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    this.footer2 = (
      <div>
        <Button label="Actualizar" icon="pi pi-check" onClick={this.update} />
      </div>
    );
  }

  componentDidMount() {
    this.patientService.getAll().then((data) => {
      this.setState({ patients: data });
    });
  }

  save() {
    this.patientService.save(this.state.patient).then((data) => {
      this.setState({
        visible: false,
        patient: {
          id: null,
          name: "",
          lastname: "",
          dni: "",
          residence: ""
        }
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente."
      });
      this.patientService
        .getAll()
        .then((data) => this.setState({ patients: data }));
    });
  }
  update() {
    this.patientService.update(this.state.patient).then((data) => {
      this.setState({
        visible: false,
        patient: {
          id: null,
          name: "",
          lastname: "",
          dni: "",
          residence: ""
        }
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente."
      });
      this.patientService
        .getAll()
        .then((data) => this.setState({ patients: data }));
    });
  }

  delete() {
    if (window.confirm("Realmente desea eliminar el registro?")) {
      this.patientService.delete(this.state.selectedPatient.id).then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se eliminó el registro correctamente."
        });
        this.patientService
          .getAll()
          .then((data) => this.setState({ Patients: data }));
      });
    }
  }
  render() {
    return (
      <div style={{ width: "80%", marginTop: "20px", margin: "0 auto" }}>
        <br />
        <Menubar model={this.items} />
        <br />
        <Panel header="Patients">
          {/* <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" value={this.state.globalFilter} onChange={(e) =>
            this.patientService.search(e.target.value).then(data =>{
              this.setState({patients: data})
           })
          } 
            placeholder="Busqueda por id" />
          </span> */}
          <DataTable
            value={this.state.patients}
            paginator={true}
            rows="5"
            selectionMode="single"
            selection={this.state.selectedPatient}
            onSelectionChange={(e) =>
              this.setState({ selectedPatient: e.value })
            }
          >
            <Column field="id" header="ID" sortable></Column>
            <Column field="name" header="Name"></Column>
            <Column field="lastname" header="Lastname"></Column>
            <Column field="dni" header="DNI"></Column>
            <Column field="residence" header="Residence"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Crear patient"
          visible={this.state.visible}
          style={{ width: "400px" }}
          footer={this.state.footer}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="patient-form">
            <span className="p-float-label">
              <InputText
                value={this.state.patient.name}
                style={{ width: "100%" }}
                id="name"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let patient = Object.assign({}, prevState.patient);
                    patient.name = val;

                    return { patient };
                  });
                }}
              />
              <label htmlFor="name">Name</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.patient.lastname}
                style={{ width: "100%" }}
                id="lastname"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let patient = Object.assign({}, prevState.patient);
                    patient.lastname = val;

                    return { patient };
                  });
                }}
              />
              <label htmlFor="lastname">Lastname</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.patient.dni}
                style={{ width: "100%" }}
                id="dni"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let patient = Object.assign({}, prevState.patient);
                    patient.dni = val;

                    return { patient };
                  });
                }}
              />
              <label htmlFor="dni">DNI</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.patient.residence}
                style={{ width: "100%" }}
                id="calle"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let patient = Object.assign({}, prevState.patient);
                    patient.residence = val;
                    return { patient };
                  });
                }}
              />
              <label htmlFor="residence">Residence</label>
            </span>
          </form>
        </Dialog>
        <Toast ref={(el) => (this.toast = el)} />
      </div>
    );
  }

  showSaveDialog = () => {
    this.setState({
      visible: true,
      patient: {
        id: null,
        name: "",
        lastname: "",
        dni: "",
        residence: ""
      },
      footer: this.footer1
    });
  };

  showEditDialog = () => {
    this.setState({
      visible: true,
      patient: {
        id: this.state.selectedPatient.id,
        name: this.state.selectedPatient.name,
        lastname: this.state.selectedPatient.lastname,
        dni: this.state.selectedPatient.dni,
        residence: this.state.selectedPatient.residence
      },
      footer: this.footer2
    });
  };
}
