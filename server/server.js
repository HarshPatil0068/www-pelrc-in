// Importing all the reuired dependencies.
const express = require('express');
const app = express(); // Express app creation
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config(); // loads variables from your .env file into process.env.
const dbConnection = require('./config/db.js');
const {registerUser, loginUser} = require('./controller/userController.js');
const { sendEnquiryMessage } = require('./controller/enquiryFormController.js')
const { sendWebDevRegForm } = require('./controller/webDevelopmentFormController.js')
const { sendMechEngRegForm } = require('./controller/mechanicalEngineeringFormController.js')
const { sendUserInterfaceRegForm } = require('./controller/userInterfaceFormController.js')
const checkUser = require('./middleware/authUser.js')


dbConnection(); // Connecting to the database.

// Ready Middlewares.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/public")));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "../client/views"));
app.use(checkUser)

// Made Middlewares.
const isLogged = require('./middleware/loggedInChecker.js');


// Routes.
app.get('/', (req, res)=>{
    res.render("index");
})
app.get('/about', (req, res)=>{
    res.render("about");
})
app.get('/mechanicalInternship', (req, res)=>{
    res.render("mechanicalInternship");
})
app.get('/webDevelopmentInternship', (req, res)=>{
    res.render("webDevelopementInternship");
})
app.get('/userInterfaceInternship', (req, res)=>{
    res.render("userInterfaceInternship");
})

app.get('/auth', (req, res) => {
    const formType = req.query.form || 'login'; // Default to login if no query param
    res.render("auth", { activeForm: formType });
});




app.post('/auth/api/register', registerUser);
app.post('/auth/api/login', loginUser);
app.post('/auth/api/send/inquiry', sendEnquiryMessage);
app.post('/auth/api/send/web-dev-registration', sendWebDevRegForm);
app.post('/auth/api/send/mech-eng-registration', sendMechEngRegForm);
app.post('/auth/api/user-interface-registration', sendUserInterfaceRegForm);

















// Starting the app on port
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running on port",process.env.PORT);   
});