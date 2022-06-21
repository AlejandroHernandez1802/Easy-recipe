import './Styles/RecipesTable.css';
import MUIDataTable from "mui-datatables";
import {useState, useEffect} from 'react';
import { createTheme, ThemeProvider} from "@mui/material/styles";
import axios from 'axios';

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    }
})

const RecipesTable = () => {

    //States config
    const[recipes, setRecipes] = useState([]);


    //Function to get data from database
    const getRecipes = async () => {
        await axios.get("http://localhost:3001/api/getAllRecipes").then((response) => {
            const data = response.data;
            console.log(data);
            setRecipes(data);
        })
    }

    //UseEffect to run the function once the component is rendered. Just one time.
    useEffect( () => {
        getRecipes()
    }, [])


    //Columns and data definition

    const columns =[
        {
            name:"IdRecipe",
            label:"Id"
        },
        {
            name:"Name",
            label:"Nombre de la receta"
        },
        {
            name:"Nacionality",
            label:"Nacionalidad"
        },
        {
            name:"Difficulty",
            label:"Dificultad de preparación"
        },
        {
            name:"Time",
            label:"Tiempo de preparación"
        }
    ]

    return (
        <>
            <div className="table-container">
                <ThemeProvider theme={darkTheme}>
                    <MUIDataTable title={"Administración de recetas"} columns={columns} data={recipes}/>
                </ThemeProvider>
            </div>
        </>
    )
}

export default RecipesTable;