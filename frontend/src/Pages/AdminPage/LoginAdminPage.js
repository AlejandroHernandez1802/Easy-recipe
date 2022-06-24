import './Css/Forms.css';
import FormInputs from '../../Components/AdminPage/RegisterForm/FormInputs';
import AlterNav from '../../Components/Global/AlterNav';
import{useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
const RegisterAdminPage = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        email:"",
        password:"",
    });

    const inputs = [
        {
            id:1,
            name:"email",
            type:"text",
            placeholder:"Email de registro",
            label:"Correo electrónico"
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Escribe tu contraseña",
            label:"Conttraseña"
        }
    ]

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    //Checking if the info that the admin provided is correct.
    const checkForLoginInfo = async (e) => {
        e.preventDefault();
        let loginValues;
        await axios.get("http://localhost:3001/api/adminLogin", {params:{email:values.email, password:values.password}}).then((response) => {
            loginValues = response.data
            if(loginValues.length === 0){
                alert("Lo sentimos, no hay perfiles de administrador registrados con tus credenciales.")
            }
            else{
                logAdmin();
            }
        })        
    }

    //Login the admin and updating the administrators table;
    const logAdmin = async () => {
        await axios.put("http://localhost:3001/api/updateAdminStatus", {email:values.email}).then(() => {
            history.push('/select-operation');
        })
    }

    //function and useEffect to check if a administrator is aleready logged.

    const isAdminLogged = async () => {
        await axios.get("http://localhost:3001/api/isAdminLogged").then((response) => {
            if(response.data.length != 0){
                let emailLogged = response.data[0].email;
                history.push({
                    pathname: '/admin-logged',
                    state: {email: emailLogged}
                });
            }
        });
    }

    useEffect(() => {
        isAdminLogged();
    }, [])

    return(
        <>
            <AlterNav />
            <div className="adminp-content">
                <div className='form-container'>   
                    <form>
                        <div className='form-content'>
                            <h1 className='form-title'>Iniciar sesión</h1>
                            {inputs.map(input => (
                                <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}
                            <div className='form-buttons'>
                                <button className='form-button' type='submit' onClick={checkForLoginInfo}>Iniciar sesión</button>
                                <Link to={{pathname: "/register-admin"}}><button className='form-button'>Registrarme</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default RegisterAdminPage;