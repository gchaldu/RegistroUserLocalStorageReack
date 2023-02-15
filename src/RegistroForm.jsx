import React from 'react'
import { useForm } from './Hooks/useForm'
import { useEffect, useReducer } from 'react'
import { userReducer } from './Hooks/userReducer';

//parse los datos que se encuentran en el local storage para mostrar en la lista.
const init = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export const RegistroForm = () => {

    const { formState, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
        direccion: '',
        ciudad: '',
        provincia: ''
    })
    const { email, password, direccion, ciudad, provincia } = formState;

    const [users, dispatchTodos] = useReducer(userReducer, [], init);

    //Agrega una nueva tarea al arreglo
    const handleNewTodo = (users) => {
        const actionAddTodo = {
            type: '[USERS] Agregar Usuario',
            payload: users
        }
        dispatchTodos(actionAddTodo);
    }

    const onFormSubmit = (event) => {
        // el evento al enviar el formulario para evitar una recarga / actualización del navegador
        event.preventDefault();
        const newUser = {
            email,
            password,
            direccion,
            ciudad,
            provincia
        }
        console.log(newUser);
        handleNewTodo(newUser);
        onResetForm();
    }

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users) || []);
    }, [users])



    return (
        <div className="container">
            <h1>Registro de Usuario</h1>
            <br />
            <form className="row g-3" onSubmit={onFormSubmit}>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name='email' value={email} onChange={onInputChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={password} onChange={onInputChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name='direccion' value={direccion} onChange={onInputChange} placeholder="1234 Main St" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Ciudad</label>
                    <input type="text" className="form-control" name='ciudad' value={ciudad} onChange={onInputChange} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Provincia</label>
                    <select name='provincia' className="form-select" onChange={onInputChange} defaultValue={provincia}>
                        <option value={'Choose...'}>Choose...</option>
                        <option value={'Buenos Aires'}>Buenos Aires</option>
                        <option value={'Cordoba'}>Cordoba</option>
                        <option value={'Santa Fe'}>Santa Fe</option>
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
            </form>
            {
                users.map((user) => (
                    <div className="row mt-2" key={user.email}>
                        <label> {user.email} </label>
                    </div>
                ))
            }
        </div>
    )
}
