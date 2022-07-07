import './Styles/FoodsTable.css';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, TablePagination, Select} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
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
    icons:{
        cursor: 'pointer'
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

        //Table paging
        const pages = [7, 14, 21];
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


    //Function to bring the data from the database
    const [avFoods, setAvFoods] = useState([]);
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



    //States configuration

        //Insert modal
        //State to control the insert modal
        const [openInsertModal, setOpenInsertModal] = useState(false);
        //Satate to handle the food insertion
        const [foodToInsert, setFoodToInsert] = useState({
            name:'',
            iconPath:'',
            categoryId:0
        })

    
    //Functions to control the modals
        
        //Handle input changes
        const handleChange = (e) => {
            const {name, value} = e.target;
            setFoodToInsert(prevState => ({
                ...prevState, [name]:value
            }))
        }

        //Insert modal
        const handleInsertModal = () => {
            setOpenInsertModal(!openInsertModal);
        }


    //Function to handle the food that is being selected.
    const handleSelectedFood = () => {

    }

    //Functions for the CRUD operations.
    const insertFood = async() => {
        await axios.post("http://localhost:3001/api/createNewFood", foodToInsert).then((response) => {
            handleInsertModal();
            swal({
                title:"Alimento creado",
                text:"El alimento fue correctamente creado",
                icon:"success",
                buttons:"Cerrar"
            })
        })
    }



    //Modals implementation
    const insertModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Nuevo alimento</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre del alimento" onChange={handleChange}/>
            <br />
            <TextField name="iconPath" className={styles.inputMaterial} label="URL de imagen" onChange={handleChange}/>
            <br />
            <TextField name="categoryId" className={styles.inputMaterial} label="Categoría a la que pertenece" onChange={handleChange}/>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={insertFood}>Insertar</Button>
                <Button onClick={handleInsertModal}>Cancelar</Button>
            </div>
        </div>
    )

    return(
        <>
            <div className='foods-table-title'><h1>Administración alimentos</h1></div>
            <Button variant="contained" className={styles.buttonInsert} onClick={handleInsertModal}>Agregar un nuevo alimento</Button>
            <div className="table-zone">
                <TableContainer>
                        <Table className={styles.table}>
                            <TableHead className={styles.tHead}>
                                <TableRow>
                                    {tableHeads.map((tableHead) => {
                                        return (
                                            <TableCell key={tableHead.id} className={styles.tHeadFont}>{tableHead.label}</TableCell>
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
                <Modal open={openInsertModal} onClose={handleInsertModal}>{insertModalBody}</Modal>
            </div>
        </>
    )
}

export default FoodsTable;