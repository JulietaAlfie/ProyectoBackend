import './App.css';
import React, { Component } from 'react';
import { PacienteService } from './service/PacienteService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/nova-alt/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Pacientes extends Component {
  constructor() {
    super();
    this.state = {
      pacientes: [],
      visible: false,
      paciente: {
        id: null,
        nombre: "",
        apellido: "",
        dni: "",
        domicilio: {
          calle: "",
          numero: "",
          localidad: "",
          provincia: ""
        }
      },
      selectedPaciente: {},
      footer: this.footer1

    }
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => { this.showSaveDialog() }
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => { this.showEditDialog() }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.delete() }
      }
    ];
    this.pacienteService = new PacienteService();
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
    this.pacienteService.getAll().then(data => {
      this.setState({ pacientes: data })
    })
  }

  save() {
    this.pacienteService.save(this.state.paciente).then(data => {
      this.setState({
        visible: false,
        paciente: {
          id: null,
          nombre: "",
          apellido: "",
          dni: "",
          domicilio: {
            calle: "",
            numero: "",
            localidad: "",
            provincia: ""
          }
        }
      });
      this.toast.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' });
      this.pacienteService.getAll().then(data => this.setState({ pacientes: data }))

    })
  }
  update() {
    this.pacienteService.update(this.state.paciente).then(data => {
      this.setState({
        visible: false,
        paciente: {
          id: null,
          nombre: "",
          apellido: "",
          dni: "",
          domicilio: {
            calle: "",
            numero: "",
            localidad: "",
            provincia: ""
          }
        }
      });
      this.toast.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' });
      this.pacienteService.getAll().then(data => this.setState({ pacientes: data }))

    })
  }

  delete() {
    if (window.confirm("Realmente desea eliminar el registro?")) {
      this.pacienteService.delete(this.state.selectedPaciente.id).then(data => {
        this.toast.show({ severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.' });
        this.pacienteService.getAll().then(data => this.setState({ Pacientes: data }));
      });
    }
  }
  render() {
    return (
      <div style={{ width: '80%', marginTop: '20px', margin: '0 auto' }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Pacientes">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" value={this.state.globalFilter} onChange={(e) =>
            this.pacienteService.search(e.target.value).then(data =>{
              this.setState({pacientes: data})
           })
          } 
            placeholder="Busqueda por id" />
          </span>
          <DataTable value={this.state.pacientes} paginator={true} rows="5" selectionMode="single" selection={this.state.selectedPaciente} onSelectionChange={e => this.setState({ selectedPaciente: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="apellido" header="Apellido"></Column>
            <Column field="dni" header="DNI"></Column>
            <Column field="domicilio.calle" header="Calle"></Column>
            <Column field="domicilio.numero" header="Numero"></Column>
            <Column field="domicilio.localidad" header="Localidad"></Column>
            <Column field="domicilio.provincia" header="Provincia"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Crear paciente" visible={this.state.visible} style={{ width: '400px' }} footer={this.state.footer} modal={true} onHide={() => this.setState({ visible: false })}>
          <form id="paciente-form">
            <span className="p-float-label">
              <InputText value={this.state.paciente.nombre} style={{ width: '100%' }} id="nombre" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let paciente = Object.assign({}, prevState.paciente);
                  paciente.nombre = val;

                  return { paciente };
                })
              }} />
              <label htmlFor="nombre">Nombre</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.paciente.apellido} style={{ width: '100%' }} id="apellido" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let paciente = Object.assign({}, prevState.paciente);
                  paciente.apellido = val

                  return { paciente };
                })
              }
              } />
              <label htmlFor="apellido">Apellido</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.paciente.dni} style={{ width: '100%' }} id="dni" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let paciente = Object.assign({}, prevState.paciente);
                  paciente.dni = val

                  return { paciente };
                })
              }
              } />
              <label htmlFor="dni">DNI</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.paciente.domicilio.calle} style={{ width: '100%' }} id="calle" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  return { paciente: { ...prevState.paciente, domicilio: { ...prevState.paciente.domicilio, calle: val } } };
                })
              }
              } />
              <label htmlFor="calle">Calle</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.paciente.domicilio.numero} style={{ width: '100%' }} id="numero" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  return { paciente: { ...prevState.paciente, domicilio: { ...prevState.paciente.domicilio, numero: val } } };
                })
              }
              } />
              <label htmlFor="numero">Numero</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.paciente.domicilio.localidad} style={{ width: '100%' }} id="localidad" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  return { paciente: { ...prevState.paciente, domicilio: { ...prevState.paciente.domicilio, localidad: val } } };
                })
              }
              } />
              <label htmlFor="localidad">Localidad</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText value={this.state.paciente.domicilio.provincia} style={{ width: '100%' }} id="provincia" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  return { paciente: { ...prevState.paciente, domicilio: { ...prevState.paciente.domicilio, provincia: val } } };
                })
              }
              } />
              <label htmlFor="provincia">Provincia</label>
            </span>
          </form>
        </Dialog>
        <Toast ref={(el) => this.toast = el} />
      </div>
    )
  }

  showSaveDialog = () => {
    this.setState({
      visible: true,
      paciente: {
        id: null,
        nombre: "",
        apellido: "",
        dni: "",
        domicilio: {
          calle: "",
          numero: "",
          localidad: "",
          provincia: ""
        }
      },
      footer: this.footer1
    })
  }


  showEditDialog = () => {
    this.setState({
      visible: true,
      paciente: {
        id: this.state.selectedPaciente.id,
        nombre: this.state.selectedPaciente.nombre,
        apellido: this.state.selectedPaciente.apellido,
        dni: this.state.selectedPaciente.dni,
        domicilio: {
          calle: this.state.selectedPaciente.domicilio.calle,
          numero: this.state.selectedPaciente.domicilio.numero,
          localidad: this.state.selectedPaciente.domicilio.localidad,
          provincia: this.state.selectedPaciente.domicilio.provincia
        }
      },
      footer: this.footer2
    })
  }
}