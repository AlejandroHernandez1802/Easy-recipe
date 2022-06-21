import MUIDataTable from "mui-datatables";
import {useState, useEffect} from 'react';
import { createTheme, ThemeProvider} from "@mui/material/styles";
import axios from 'axios';

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    }
})

const CategoriesTable = () => {

    //States configuration
    const[categories, setCategories] = useState([])


    //Function to get data from database
    const getCategories = async () => {
        await axios.get("http://localhost:3001/api/getCategories").then((response) => {
            const data = response.data;
            console.log(data);
            setCategories(data)
        })
    }

    //useEffect function to bring the data once the module is loaded. 
    useEffect(() => {
        getCategories();
    },[])


    //Columns and data definition
    const columns = [
        {
            name:"IdCategory",
            label:"Id"
        },
        {
            name:"Name",
            label:"Category"
        }
    ]


    return (
        <>
            <div className="table-container">
                <ThemeProvider theme={darkTheme}>
                    <MUIDataTable title={"Categories operations"} columns={columns} data={categories}/>
                </ThemeProvider>
            </div>
        </>
    )
}

export default CategoriesTable;