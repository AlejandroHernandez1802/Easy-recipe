const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());


app.listen(3001, () => {
    console.log("Server running on port 3001");
});

const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password:'1234',
    database:'easyrecipe'
})


//Routes

//Admin pages
//Create a new admin
app.post("/api/adminRegister", (req, res) => {
    const name = req.body.AdminName;
    const email = req.body.AdminEmail;
    const password = req.body.AdminPassword;

    console.log(name, email, password);

    const createAdminQ = "INSERT INTO admins (AdminName, AdminEmail, AdminPassword) VALUES (?,?,?);";
    db.query(createAdminQ, [name, email, password], (err, result) => {
        if(err) throw err;
        res.send("Admin successfully created.");
    })
})

//Admin login
app.get("/api/adminLogin", (req, res)=>{
    const adminEmail = req.query.email;
    const adminPassword = req.query.password;

    getAdminInfoQ = "SELECT * FROM admins WHERE AdminEmail = ? AND AdminPassword = ?;"
    db.query(getAdminInfoQ, [adminEmail, adminPassword], (err, result) => {
        if(err){
            console.log(error);
        }
        else{
            res.send(result);
        }
    })
}),

//Homepage
app.get(("/api/getCategories" ),(req,res) => {
    const selectCategoryQ = "SELECT * FROM categories;";
    db.query(selectCategoryQ, (err, result) => {
        res.send(result);
    });
});

app.get(("/api/getFoods" ),(req,res) => {
    const selectFoodsQ = "SELECT * FROM foods;";
    db.query(selectFoodsQ, (err, result) => {
        res.send(result);
    });
});


//Possible recipes page
app.get(("/api/getPossibleRecipesId"), (req, res) => {
    let foodsId = Object.values(req.query);
    const getRecipesIdQ = "SELECT IdRecipe FROM foodsbyrecipe WHERE IdFood = ?;"
    let finalResponse = [];

    foodsId.map((food, i) => {
        db.query(getRecipesIdQ, [food], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                finalResponse = [...finalResponse, result];
                if(foodsId.length === i+1){
                    getRecipes(finalResponse, res)
                }
            }
        });
    });
});


const getRecipes = (finalResponse, res) => {
    arrayIds = [];
    finalData = [];

    finalResponse.map((item, i) => {
        item.map((item2) => {
            arrayIds = [...arrayIds, item2.IdRecipe];
            arrayIds = arrayIds.filter((item3, index) => {
                return arrayIds.indexOf(item3) === index;
            });
        });
        if(finalResponse.length === i+1){
            getFinalRecipes(arrayIds, res);
        }

    });
}

const getFinalRecipes = (arrayIds, res) => {

    const getRecipesQ = "SELECT Name, IconPath, GeneralDescription FROM recipes WHERE IdRecipe = ?;";
    let finalResponse = [];

    arrayIds.map((item, i) => {
        db.query(getRecipesQ, [item], (err,result) => {
            if(err){
                console.log(err);
            }
            else{
                finalResponse = [...finalResponse, result];

                if(arrayIds.length === i+1){
                    res.send(finalResponse);
                }
            }
        })
    })

}


//Selected recipe page
app.get(("/api/selected-recipe"), (req, res) => {

    const Name = req.query.Name;   
    const selectRecipeQ = "SELECT * FROM recipes WHERE Name = ?;"
    
    db.query(selectRecipeQ, [Name],(err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});



