import './Styles/RecipesTable.css';
// import MUIDataTable from "mui-datatables";
// import { createTheme, ThemeProvider} from "@mui/material/styles";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';
import axios from 'axios';

// const darkTheme = createTheme({
//     palette:{
//         mode:'dark'
//     }
// })

const useStyles = makeStyles((theme)=> ({
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

const RecipesTable = () => {

    //Calling the function to work with the styles
    const styles = useStyles();

    //States config
        //State to bring all recipes
        const[recipes, setRecipes] = useState([]);
        

        //States to handle the insert modal
        const[openInsertModal, setOpenInsertModal] = useState(false);
        const[recipeToInsert, setRecipeToInsert] = useState({
            name:'',
            iconPath:'',
            generalDescription:'',
            nacionality:'',
            difficulty:'',
            time:'',
            ingredientList:'',
            recipeContent:'',
            videoUrl:''
        })

        //States to handle the update modal
        const[openUpdateModal, setOpenUpdateModal] = useState(false);

    
    //Function to know what recipe has been selected
    const recipeSelected = (recipe, modal) => {
        setRecipeToInsert(recipe);
        (modal === 'Editar') ? openUpdateModal(true):''  
    }

    //Functions to make requests to the backend
        //Get all recipes
        const getRecipes = async () => {
            await axios.get("http://localhost:3001/api/getAllRecipes").then((response) => {
                const data = response.data;
                setRecipes(data);
            })
        }
        //Insert a new recipe
        const insertRecipe = async () => {
            await axios.post("http://localhost:3001/api/createRecipe", recipeToInsert).then(() => {
                handleOpenInsertModal();
            })
        }
        //Update a recipe
        const updateRecipe = async () => {
            await axios.put().then(() => {
                handleOpenUpdateModal();
            })
        }
        //Delete a recipe
        


    //UseEffect to run the function once the component is rendered. Just one time.
    useEffect( () => {
        getRecipes()
    }, [])


    //Modals manipulation

        //Function to save the modal inputs values
        const handleChange = (e) =>{
            const {name, value} = e.target;
            setRecipeToInsert(prevState => ({
                ...prevState,
                [name]:value
            }))
        }

        //Insert modal manipulation
            //Function to open or close the insert modal
            const handleOpenInsertModal = () => {
                setOpenInsertModal(!openInsertModal);
            }

        //Update modal manipulation
            //Function to open or close the update modal
            const handleOpenUpdateModal = () => {
                setOpenUpdateModal(!openUpdateModal);
            }


    const insertBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Nueva receta</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre de la receta" onChange={handleChange}/>
            <br />
            <TextField name="iconPath" className={styles.inputMaterial} label="Url de imagen" onChange={handleChange}/>
            <br />
            <TextField name="generalDescription" className={styles.inputMaterial} label="Descripción general" onChange={handleChange}/>
            <br />
            <TextField name="nacionality" className={styles.inputMaterial} label="Nacionalidad de la receta" onChange={handleChange}/>
            <br />
            <TextField name="difficulty" className={styles.inputMaterial} label="Dificultad de preparación" onChange={handleChange}/>
            <br />
            <TextField name="time" className={styles.inputMaterial} label="Tiempo de preparación" onChange={handleChange}/>
            <br />
            <TextField name="ingredientList" className={styles.inputMaterial} label="Lista de ingredientes" onChange={handleChange}/>
            <br />
            <TextField name="recipeContent" className={styles.inputMaterial} label="Contenido de la receta" onChange={handleChange}/>
            <br />
            <TextField name="videoUrl" className={styles.inputMaterial} label="Url de video" onChange={handleChange}/>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={insertRecipe}>Insertar</Button>
                <Button onClick={handleOpenInsertModal}>Cancelar</Button>
            </div>
        </div>
    )

    const updateBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Actualizar receta</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre de la receta" onChange={handleChange} value={recipeToInsert && recipeToInsert.name}/>
            <br />
            <TextField name="iconPath" className={styles.inputMaterial} label="Url de imagen" onChange={handleChange} value={recipeToInsert && recipeToInsert.iconPath}/>
            <br />
            <TextField name="generalDescription" className={styles.inputMaterial} label="Descripción general" onChange={handleChange} value={recipeToInsert && recipeToInsert.generalDescription}/>
            <br />
            <TextField name="nacionality" className={styles.inputMaterial} label="Nacionalidad de la receta" onChange={handleChange} value={recipeToInsert && recipeToInsert.nacionality}/>
            <br />
            <TextField name="difficulty" className={styles.inputMaterial} label="Dificultad de preparación" onChange={handleChange} value={recipeToInsert && recipeToInsert.difficulty}/>
            <br />
            <TextField name="time" className={styles.inputMaterial} label="Tiempo de preparación" onChange={handleChange} value={recipeToInsert && recipeToInsert.time}/>
            <br />
            <TextField name="ingredientList" className={styles.inputMaterial} label="Lista de ingredientes" onChange={handleChange} value={recipeToInsert && recipeToInsert.ingredientList}/>
            <br />
            <TextField name="recipeContent" className={styles.inputMaterial} label="Contenido de la receta" onChange={handleChange} value={recipeToInsert && recipeToInsert.recipeContent}/>
            <br />
            <TextField name="videoUrl" className={styles.inputMaterial} label="Url de video" onChange={handleChange} value={recipeToInsert && recipeToInsert.videoUrl}/>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={updateRecipe}>Actualizar</Button>
                <Button onClick={handleOpenUpdateModal}>Cancelar</Button>
            </div>
        </div>
    )




    //Columns and data definition

    // const columns =[
    //     {
    //         name:"IdRecipe",
    //         label:"Id"
    //     },
    //     {
    //         name:"Name",
    //         label:"Nombre de la receta"
    //     },
    //     {
    //         name:"Nacionality",
    //         label:"Nacionalidad"
    //     },
    //     {
    //         name:"Difficulty",
    //         label:"Dificultad de preparación"
    //     },
    //     {
    //         name:"Time",
    //         label:"Tiempo de preparación"
    //     }
    // ]

    return (
        <>
            <div className='recipes-table-title'>
                <h1>Recipes operations</h1>
            </div>
            <Button onClick={handleOpenInsertModal}>Insertar nueva receta</Button>
            <div className="table-container">
                {/* <ThemeProvider theme={darkTheme}> */}
                    {/* <MUIDataTable title={"Administración de recetas"} columns={columns} data={recipes}/> */}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre de la receta</TableCell>
                                    <TableCell>Nacionalidad</TableCell>
                                    <TableCell>Dificultad de preparación</TableCell>
                                    <TableCell>Tiempo de preparación</TableCell>
                                    <TableCell>Operaciones</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {recipes.map(recipe => (
                                    <TableRow key={recipe.IdRecipe}>
                                        <TableCell>{recipe.Name}</TableCell>
                                        <TableCell>{recipe.Nacionality}</TableCell>
                                        <TableCell>{recipe.Difficulty}</TableCell>
                                        <TableCell>{recipe.Time}</TableCell>
                                        <TableCell><Edit className={styles.icons} onClick={recipeSelected(recipe, 'Editar')}/> &nbsp;&nbsp;&nbsp; <Delete className={styles.icons}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                {/* </ThemeProvider> */}

                    <Modal open={openInsertModal} onClose={handleOpenInsertModal}>
                        {insertBody}
                    </Modal>

                    <Modal open={openUpdateModal} onClose={handleOpenUpdateModal}>
                        {updateBody}
                    </Modal>
            </div>
        </>
    )
}

export default RecipesTable;