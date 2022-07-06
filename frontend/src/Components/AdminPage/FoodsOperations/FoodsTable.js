import './Styles/FoodsTable.css';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, TablePagination, TableSortLabel } from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme)=> ({
    buttonInsert:{
        margin: '20px',
    },
    table:{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px 10px 10px 10px"
    },
    tHead:{
        backgroundColor:'#5F5AA2'
    },
    tHeadFont:{
        color: 'white',
        fontWeight: 'bold',
    },
    modal: {
        position:'absolute',
        width:400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top:'5%',
        left:'40%'
    },
    icons:{
        cursor: 'pointer'
    },
    inputMaterial:{
        width:'100%'
    },
    modalTitle:{
        color:'black'
    }
}));


const FoodsTable = () => {

    const styles = useStyles();


    //Table configuration(paging, filtering)

    //Table paging
    const pages = [10, 20, 30];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const recordsAfterPagingAndSorting = () => {
        return (
            avFoods.slice(page*rowsPerPage, (page+1)*rowsPerPage)
        )
    }

    //Table ordering

    //Object to define table head cells
    const tableHeads = [
        {
            id: 1, 
            label:"Nombre de la receta"
        },
        {
            id: 2, 
            label:"Categoría"
        },
        {
            id: 3, 
            label:"Operaciones"
        }
    ]
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();






    //States configuration
    const [avFoods, setAvFoods] = useState([]);

    //Function to bring the data from the database
    const getAvailableFoods = async () => {
        await axios.get("http://localhost:3001/api/getAvailableFoods").then((response) => {
            const data = response.data;
            setAvFoods(data)
        })
    }

    //useEffect to bring the foods every time the module is loaded.
    useEffect(() => {
        getAvailableFoods();
    }, [])


    //Function to handle the food that is being selected.
    const handleSelectedFood = () => {

    }

    //Functions for the CRUD operations.
    const insertFood = () => {

    }

    return(
        <>
            <div className='foods-table-title'><h1>Foods operations</h1></div>
            <Button variant="contained" className={styles.buttonInsert} onClick={insertFood}>Agregar un nuevo alimento</Button>
            <div className="table-zone">
                <TableContainer>
                        <Table className={styles.table}>
                            <TableHead className={styles.tHead}>
                                <TableRow>
                                    {tableHeads.map((tableHead) => {
                                        return (
                                            <TableCell key={tableHead.id} className={styles.tHeadFont}><TableSortLabel>{tableHead.label}</TableSortLabel></TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {recordsAfterPagingAndSorting().map(foods => (
                                    <TableRow key={foods.IdFood}>
                                        <TableCell>{foods.Name}</TableCell>
                                        <TableCell>{foods.Category}</TableCell>
                                        <TableCell><Edit className={styles.icons}/> &nbsp;&nbsp;&nbsp; <Delete className={styles.icons}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
                <TablePagination component="div" page={page} rowsPerPageOptions={pages}
                 rowsPerPage={rowsPerPage} count={avFoods.length} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
            </div>
        </>
    )
}

export default FoodsTable;