import MUIDataTable from "mui-datatables";
import {useState, useEffect} from 'react';
import { createTheme, ThemeProvider} from "@mui/material/styles";
import axios from 'axios';

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    }
})

const FoodsTable = () => {

    //States configuration
    const [avFoods, setAvFoods] = useState([]);

    //Function to bring the data from the database
    const getAvailableFoods = async () => {
        await axios.get("http://localhost:3001/api/getAvailableFoods").then((response) => {
            const data = response.data;
            console.log(data);
            setAvFoods(data)
        })
    }


    //useEffect function to get the data once the component is loaded.
    useEffect(() => {
        getAvailableFoods();
    }, [])


    //Columns configuration
    const columns  = [
        {
            name: "IdFood",
            label: "Id"
        }, 
        {
            name: "Name",
            label: "Food name"
        },
        {
            name: "Category",
            label: "Category"
        }
    ] 

    return(
        <>
            <div className="table-container">
                <ThemeProvider theme={darkTheme}>
                    <MUIDataTable title={"Available foods operations"} columns={columns} data={avFoods}/>
                </ThemeProvider>
            </div>
        </>
    )
}

export default FoodsTable;