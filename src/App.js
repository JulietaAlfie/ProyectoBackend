import './App.css';
import React, { Component } from 'react';
import { OdontologoService } from './service/OdontologoService';
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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      odontologos: [],
      visible: false,
      odontologo: {
        id: null,
        nombre: null,
        apellido: null,
        matricula: null
      },
      selectedOdontologo: {},
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
    this.odontologoService = new OdontologoService();
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
    this.odontologoService.getAll().then(data => {
      this.setState({ odontologos: data })
    })
  }

  save() {
    this.odontologoService.save(this.state.odontologo).then(data => {
      this.setState({
        visible: false,
        odontologo: {
          id: null,
          nombre: null,
          apellido: null,
          direccion: null,
          telefono: null
        }
      });
      this.toast.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' });
      this.odontologoService.getAll().then(data => this.setState({ odontologos: data }))

    })
  }
  update(){
    this.odontologoService.update(this.state.odontologo).then(data => {
      this.setState({
        visible: false,
        odontologo: {
          id: null,
          nombre: null,
          apellido: null,
          direccion: null,
          telefono: null
        }
      });
      this.toast.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' });
      this.odontologoService.getAll().then(data => this.setState({ odontologos: data }))

    })
  }

  delete(){
    if(window.confirm("Realmente desea eliminar el registro?")){
      this.odontologoService.delete(this.state.selectedOdontologo.id).then(data => {
        this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.odontologoService.getAll().then(data => this.setState({Odontologos: data}));
      });
    }
  }
  render() {
    return (
      <div style={{ width: '80%', marginTop: '20px', margin: '0 auto' }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Clinica odontologica">
          <DataTable value={this.state.odontologos} paginator={true} rows="5" selectionMode="single" selection={this.state.selectedOdontologo} onSelectionChange={e => this.setState({selectedOdontologo: e.value})}>
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="apellido" header="Apellido"></Column>
            <Column field="matricula" header="Matricula"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Crear odontologo" visible={this.state.visible} style={{ width: '400px' }} footer={this.state.footer} modal={true} onHide={() => this.setState({ visible: false })}>
        <form id="odontologo-form">
          <span className="p-float-label">
            <InputText value={this.state.odontologo.nombre} style={{ width: '100%' }} id="nombre" onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let odontologo = Object.assign({}, prevState.odontologo);
                odontologo.nombre = val;

                return { odontologo };
              })
            }} />
            <label htmlFor="nombre">Nombre</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText value={this.state.odontologo.apellido} style={{ width: '100%' }} id="apellido" onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let odontologo = Object.assign({}, prevState.odontologo);
                odontologo.apellido = val

                return { odontologo };
              })
            }
            } />
            <label htmlFor="apellido">Apellido</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText value={this.state.odontologo.matricula} style={{ width: '100%' }} id="matricula" onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let odontologo = Object.assign({}, prevState.odontologo);
                odontologo.matricula = val

                return { odontologo };
              })
            }
            } />
            <label htmlFor="matricula">Matricula</label>
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
      odontologo: {
        id: null,
        nombre: null,
        apellido: null,
        matricula: null
      },
      footer: this.footer1
    })
  }


  showEditDialog = () => {
    this.setState({
      visible : true,
      odontologo : {
        id: this.state.selectedOdontologo.id,
        nombre: this.state.selectedOdontologo.nombre,
        apellido: this.state.selectedOdontologo.apellido,
        matricula: this.state.selectedOdontologo.matricula
      },
      footer: this.footer2
    })
  }
}