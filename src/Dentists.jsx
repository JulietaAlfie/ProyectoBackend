import "./App.css";
import React, { Component } from "react";
import { DentistService } from "./service/DentistService";
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

export default class Dentists extends Component {
  constructor() {
    super();
    this.state = {
      dentists: [],
      visible: false,
      dentist: {
        id: null,
        name: null,
        lastname: null,
        license: null
      },
      selectedDentist: {},
      footer: this.guardar
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
    this.dentistService = new DentistService();
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.guardar = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    this.actualizar = (
      <div>
        <Button label="Actualizar" icon="pi pi-check" onClick={this.update} />
      </div>
    );
  }

  componentDidMount() {
    this.dentistService.getAll().then((data) => {
      this.setState({ dentists: data });
    });
  }

  save() {
    this.dentistService.save(this.state.dentist).then((data) => {
      this.setState({
        visible: false,
        dentist: {
          id: null,
          name: null,
          lastname: null,
          license: null
        }
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente."
      });
      this.dentistService
        .getAll()
        .then((data) => this.setState({ dentists: data }));
    });
  }
  update() {
    this.dentistService.update(this.state.dentist).then((data) => {
      this.setState({
        visible: false,
        dentist: {
          id: null,
          name: null,
          lastname: null,
          direccion: null,
          telefono: null
        }
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente."
      });
      this.dentistService
        .getAll()
        .then((data) => this.setState({ dentists: data }));
    });
  }

  delete() {
    if (window.confirm("Realmente desea eliminar el registro?")) {
      this.dentistService.delete(this.state.selectedDentist.id).then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se eliminó el registro correctamente."
        });

        this.dentistService
          .getAll()
          .then((data) => this.setState({ Dentists: data }));
      });
    }
  }

  render() {
    return (
      <div style={{ width: "80%", marginTop: "20px", margin: "0 auto" }}>
        <br />
        <Menubar model={this.items} />
        <br />
        <Panel header="Dentists">
          <DataTable
            value={this.state.dentists}
            paginator={true}
            rows="5"
            selectionMode="single"
            selection={this.state.selectedDentist}
            onSelectionChange={(e) =>
              this.setState({ selectedDentist: e.value })
            }
          >
            <Column field="id" header="ID" sortable></Column>
            <Column field="name" header="Name"></Column>
            <Column field="lastname" header="Lastname"></Column>
            <Column field="license" header="License"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Crear dentist"
          visible={this.state.visible}
          style={{ width: "400px" }}
          footer={this.state.footer}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="dentist-form">
            <span className="p-float-label">
              <InputText
                value={this.state.dentist.name}
                style={{ width: "100%" }}
                id="name"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let dentist = Object.assign({}, prevState.dentist);
                    dentist.name = val;

                    return { dentist };
                  });
                }}
              />
              <label htmlFor="name">Name</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.dentist.lastname}
                style={{ width: "100%" }}
                id="lastname"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let dentist = Object.assign({}, prevState.dentist);
                    dentist.lastname = val;

                    return { dentist };
                  });
                }}
              />
              <label htmlFor="lastname">Lastname</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                value={this.state.dentist.license}
                style={{ width: "100%" }}
                id="license"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    // let dentist = Object.assign({}, prevState.dentist);
                    // dentist.license = val

                    return { dentist: { ...prevState.dentist, license: val } };
                  });
                }}
              />
              <label htmlFor="license">License</label>
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
      dentist: {
        id: null,
        name: null,
        lastname: null,
        license: null
      },
      footer: this.guardar
    });
  };

  showEditDialog = () => {
    this.setState({
      visible: true,
      dentist: {
        id: this.state.selectedDentist.id,
        name: this.state.selectedDentist.name,
        lastname: this.state.selectedDentist.lastname,
        license: this.state.selectedDentist.license
      },
      footer: this.actualizar
    });
  };
}
