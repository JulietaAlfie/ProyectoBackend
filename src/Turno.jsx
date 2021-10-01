import React, { useEffect, useRef, useState } from 'react';
import { TurnoService } from './service/TurnoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { OdontologoService } from './service/OdontologoService';
import { PacienteService } from './service/PacienteService';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import "./FormDemo.css"


const Turnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [odontologos, setOdontologos] = useState([]);
    const [pacientes, setPacientes] = useState([])

    const [visible, setVisible] = useState(false);
    const [turno, setTurno] = useState({
        id: null,
        date: "",
        pacienteId: null,
        odontologoId: null
    })
    const [paciente, setPaciente] = useState()
    const [odontologo, setOdontologo] = useState()
    const [selectedTurno, setSelectedTurno] = useState({
        id: null,
        date: null,
        pacienteId: null,
        odontologoId: null
    });
    const [date, setDate] = useState("")
    const toast = useRef(null);

    let items = [
        {
            label: 'Editar',
            icon: 'pi pi-fw pi-pencil',
            command: () => { showEditDialog() }
        },
        {
            label: 'Eliminar',
            icon: 'pi pi-fw pi-trash',
            command: () => { eliminar() }
        }
    ]
    const turnoService = new TurnoService();
    const odontologoService = new OdontologoService;
    const pacienteService = new PacienteService;

    const footer = <Button label="Actualizar" icon="pi pi-check" onClick={update} />

    useEffect(() => {
        turnoService.getAll().then(data => {
            setTurnos(data)
            // console.log(data)
        })
        odontologoService.getAll().then(data => {
            setOdontologos(data.map(odontologo => {
                let id = odontologo.id
                let nombre = odontologo.nombre
                let apellido = odontologo.apellido
                return { label: id + '- ' + nombre + ' ' + apellido, value: id }
            }))
        })
        pacienteService.getAll().then(data => {
            setPacientes(data.map(paciente => {
                let id = paciente.id
                let nombre = paciente.nombre
                let apellido = paciente.apellido
                return { label: id + '- ' + nombre + ' ' + apellido, value: id }
            })
            )
        })
    }, [])

    function save() {
        turnoService.save(turno)
            .then(
                setVisible(false),
                setTurno({
                    id: null,
                    date: null,
                    pacienteId: null,
                    odontologoId: null
                }),
                setDate(null),
                setOdontologo(null),
                setPaciente(null),
            )
            .then(turnoService.getAll().then(data => setTurnos(data)))
        toast.current.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' })
    }


    function handleSubmit(e) {
        e.preventDefault()
        setTurno({ id: null, date: date, pacienteId: paciente, odontologoId: odontologo })
        if (turno) { save() }
    }

    let handleTurnos = turnos.map(turn => {
        let pacienteTransitorio = pacientes.find(pac => pac.value == turn.pacienteId)
        let pacienteOk
        if (pacienteTransitorio) {
            pacienteOk = pacienteTransitorio.label.split(" ")[1] + " " + pacienteTransitorio.label.split(" ")[2]
        }
        let odontologoTransitorio = odontologos.find(odonto => odonto.value == turn.odontologoId)
        let odontologoOk
        if (odontologoTransitorio) {
            odontologoOk = odontologoTransitorio.label.split(" ")[1] + " " + odontologoTransitorio.label.split(" ")[2]
        }
        return {
            id: turn.id,
            date: turn.date ? turn.date.slice(0, 10) : null,
            pacienteId: pacienteOk,
            odontologoId: odontologoOk
        }
    })



    function update() {
        turnoService.update(selectedTurno).then(
            setVisible(false),
            setSelectedTurno({
                id: null,
                date: null,
                pacienteId: null,
                odontologoId: null
            }),
            setTurno(null),
            setDate(null),
            setOdontologo(null),
            setPaciente(null),
        )
            .then(turnoService.getAll().then(data => setTurnos(data)))
        toast.current.show({ severity: 'info', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' })
    }

    function eliminar() {
        if (window.confirm("Realmente desea eliminar el registro?")) {
            turnoService.delete(selectedTurno.id)
                .then(
                    toast.current.show({ severity: 'warn', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.' }),
                )
                .then(turnoService.getAll().then(data => setTurnos(data)))

        }
    }

    function showEditDialog() {
        setTurno({
            id: selectedTurno.id,
            date: selectedTurno.date,
            paciente: selectedTurno.pacienteId,
            odontologo: selectedTurno.odontologoId
        })
        setVisible(true)
    }
    function formatDateToString(date) {
        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();

        // create the format you want
        return (yyyy + "-" + MM + "-" + dd);
    }

    return (
        <>
            <div style={{ width: '80%', marginTop: '20px', margin: '0 auto' }}>
                <Dialog header="Actualizar turno" visible={visible} style={{ width: '400px' }} footer={footer} modal={true} onHide={() => setVisible(false)}>
                    <form id="turno-form">
                        <div className="p-field">
                            <span className="p-float-label">
                                <Calendar id="date1" name="date1" value={date} onChange={(e) => {
                                    setSelectedTurno(prevState => {
                                        return { ...prevState, date: formatDateToString(e.value) }
                                    })
                                    setDate(formatDateToString(e.value))
                                }
                                } dateFormat="dd-mm-yy" mask="99/99/9999" showIcon />
                                <label htmlFor="date">Fecha</label>
                            </span>
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Dropdown id="dropdown1" value={odontologo} onChange={(e) => {
                                    setSelectedTurno(prevState => {
                                        return { ...prevState, odontologoId: e.value }
                                    })
                                    setOdontologo(e.value)
                                }} options={odontologos} />
                                <label htmlFor="odontologo">Odontologos</label>
                            </span>
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Dropdown id="dropdown2" value={paciente} onChange={(e) => {
                                    setSelectedTurno(prevState => {
                                        return { ...prevState, pacienteId: e.value }
                                    })
                                    setPaciente(e.value)
                                }
                                } options={pacientes} />
                                <label htmlFor="paciente">Pacientes</label>
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
                                    <Calendar id="date" name="date" value={date} onChange={(e) => {
                                        setTurno(prevState => {
                                            return { ...prevState, date: formatDateToString(e.value) }
                                        })
                                        setDate(formatDateToString(e.value))
                                    }
                                    } dateFormat="dd-mm-yy" mask="99/99/9999" showIcon />
                                    <label htmlFor="date">Fecha</label>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-float-label">
                                    <Dropdown value={odontologo} onChange={(e) => {
                                        setTurno(prevState => {
                                            return { ...prevState, odontologoId: e.value }
                                        })
                                        setOdontologo(e.value)
                                    }} options={odontologos} />
                                    <label htmlFor="odontologo">Odontologos</label>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-float-label">
                                    <Dropdown value={paciente} onChange={(e) => {
                                        setTurno(prevState => {
                                            return { ...prevState, pacienteId: e.value }
                                        })
                                        setPaciente(e.value)
                                    }
                                    } options={pacientes} />
                                    <label htmlFor="paciente">Pacientes</label>
                                </span>
                            </div>
                            <Button type="submit" label="Submit" className="p-mt-2" />
                        </form>
                    </fieldset>
                </div>
            </div>
            <br />
            <br />
            <div style={{ width: '80%', marginTop: '20px', margin: '0 auto' }}>
                <Menubar model={items} />
                <br />
                <Panel header="Turnos">
                    <DataTable value={handleTurnos.sort()} paginator={true} rows="10" selectionMode="single" selection={selectedTurno} onSelectionChange={e => setSelectedTurno(e.value)}>
                        <Column field="id" header="ID" sortable></Column>
                        <Column field="date" header="Fecha" sortable></Column>
                        <Column field="pacienteId" header="Paciente"></Column>
                        <Column field="odontologoId" header="Odontologo"></Column>
                    </DataTable>
                </Panel>
            </div>
            <Toast ref={toast}></Toast>

        </>
    )

}

export default Turnos