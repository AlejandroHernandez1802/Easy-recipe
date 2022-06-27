import logo from "../Images/logo.png";
import '../Css/Global/AlterNavAdminMain.css';

import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";

const AlterNavAdminMain = () => {

  let history = useHistory();
  let location = useLocation();

  const confirmLogout = async (e) => {
      e.preventDefault();

      swal({
        title:"Confirmación de cierre de sesión",
        text:"¿Estás seguro de que quieres cerrar tu sesión?",
        icon:"warning",
        buttons:["No", "Sí"]
      }).then(response => {
        if(response){
          logOut();
        }
      })
  }

  const logOut = async () => {
    await axios.put("http://localhost:3001/api/logOutAdmin", {email:location.state.email}).then(() => {
          history.push("/login-admin");
        })
  }

    return (

        <div style={{height:"70px"}}>
          <header className="nav">
            <div className="left">
              <img  className="logo" src={logo} onClick={() => {history.push('/role-selection')}}/>
              <div className="title-container"><span className="title">Easy Recipe</span></div>
            </div>
            <div className="right">
                <button className="logout-button" onClick={confirmLogout}>Cerrar sesión</button>
            </div>
          </header>
        </div>
     );
}
 
export default AlterNavAdminMain;