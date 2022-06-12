import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './index.css';
import Grid from '@mui/material/Grid';
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import OutlinedInput from '@mui/material/OutlinedInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CardMedia from '@mui/material/CardMedia'
import { FaRupeeSign } from 'react-icons/fa';
import { Formik } from "formik";
import { ReactDOM } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Input } from "@mui/material";



export default function App() {
  return (

    // Router used for navigation through pages

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/LoginAuth" element={<LoginAuth />} />
          <Route path="/userlogin" element={<Userlogin />} />
          <Route path="/Verificationmail" element={<Verification />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/setnewpassword" element={<Setnewpassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/url" element={<URL />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// function used for login page

function Login() {

  const Navigate = useNavigate()


  return (
    <>
      {/* Top-Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "200px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Short Your URL Here ..!
              </div>
              <div className="fontstyle2">
                keep it short & sweet....
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/*User Login & New User Button */}

      <div>
        <button id="loginBTNu" class="btn btn-info" onClick={() => Navigate("/userlogin")}>User Login</button>
      </div>
      <div>
        <button id="loginBTNu" class="btn btn-secondary" onClick={() => Navigate("/LoginAuth")}>New User!</button>
      </div>
    </>

  );
}

// Function for Login Authentication

function LoginAuth() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    First_Name: "",
    Last_Name: "",
    E_mail: "",
    Password: ""
  })

  // Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.First_Name == "") errors.First_Name = "First Name is Required";
    if (formData.Last_Name == "") errors.Last_Name = "Last Name is Required";
    if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
    if (formData.Password == "") errors.Password = "Password is Required";
    return errors;
  }

  // On Submit Function

  var Register = async (formData) => {
    var response = await axios.post("http://localhost:3002/register", {
      firstName: formData.First_Name,
      lastName: formData.Last_Name,
      email: formData.E_mail,
      password: formData.Password,
    })

    await setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })

    if (response.statusText === "Created") {
      alert("Registered Successfully")
      Navigate('/')
    }

    else if (response.data === "User Already Exist. Please Login") {
      alert("User Already Exist. Please Login")
      setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })
    }
  }


  return (
    <>

      {/* Top Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "150px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Register Your Details
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Formik
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Register(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* First_Name Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > First_Name </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your First_Name"
                    type="text"
                    name="First_Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.First_Name}
                  /> &nbsp; &nbsp; <span className="errors">{errors.First_Name && touched.First_Name && errors.First_Name}</span> </div>
              </div>
            </div> <br></br>

            {/* Last_Name Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > Last_Name </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your Last_Name"
                    type="text"
                    name="Last_Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Last_Name}
                  /> &nbsp; &nbsp; <span className="errors">  {errors.Last_Name && touched.Last_Name && errors.Last_Name}</span> </div>
              </div>
            </div> <br></br>

            {/* Email Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > E_mail </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your E_mail"
                    type="email"
                    name="E_mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.E_mail}
                  /> &nbsp; &nbsp;<span className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail}</span> </div>
              </div>
            </div> <br></br>

            {/* Password Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > Password </label> </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your Password"
                    type="password"
                    name="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Password}
                  /> &nbsp; &nbsp; <span className="errors"> {errors.Password && touched.Password && errors.Password}</span> </div>
              </div>
            </div> <br></br>

            {/* Register Button */}

            <div id="FnameR" class="container">
              <div class="row">
                <div class="col-4">
                  <button id="Ippassbutn" class="btn btn-info" type="submit" disabled={isSubmitting}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}



function Userlogin() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    E_mail: "",
    Password: ""
  })

  // Formik error validation

  const validate = (formData) => {
    var errors = {};
    if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
    if (formData.Password == "") errors.Password = "Password is Required";
    return errors;
  }

  // On Submit Function

  const Login = async (formData) => {
    var response = await axios.post("http://localhost:3002/login", {
      email: formData.E_mail,
      password: formData.Password,
    })

    if (response.data === "Loggedin") {
      alert("Step-1 Verification Success")
      Navigate('/Verificationmail')
    }

    if (response.data === "Invalid") {
      alert("Invalid creditional")
    }
  }

  return (
    <>

      {/* Top Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "150px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Step-1 Verification - Log In
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Formik
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Login(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* E-mail Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > E-mail Id </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your Email-Id"
                    type="email"
                    name="E_mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.E_mail}
                  /> &nbsp; &nbsp; <span className="errors">{errors.E_mail && touched.E_mail && errors.E_mail}</span>  </div>
              </div>
            </div> <br></br>

            {/* Password Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > Password </label> </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your Password"
                    type="password"
                    name="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Password}
                  /> &nbsp; &nbsp;<span className="errors">{errors.Password && touched.Password && errors.Password}</span>   </div>
              </div>
            </div> <br></br>

            {/* Login &  Forgot Password Button */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <button id="Ippassbutn" class="btn btn-info" type="submit" disabled={isSubmitting}>
                    Log In
                  </button>
                  <button id="IppassbutnR" class="btn btn-secondary" type="button" onClick={() => Navigate('/forgotpassword')} disabled={isSubmitting}>
                    Forgot password
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}


function Verification() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    E_mail: "",
  })

  //  Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
    return errors;
  }

  // On submit Function

  var Verification = async (formData) => {
    var response = await axios.post("http://localhost:3002/verification", {
      email: formData.E_mail,

    })

    if (response.data.message === "Sorry Email does not Exist!") {
      alert("Sorry Email does not Exist!")
    }

    if (response.data === "mail_sent") {
      alert("mail sent")
      Navigate('/dashboard')
    }
  }
  return (
    <>

      {/* Top Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "150px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Step-2 Email Verification
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Formik
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Verification(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (

          <form onSubmit={handleSubmit}>

            {/* Email Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > E_mail </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your E_mail"
                    type="email"
                    name="E_mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.E_mail}
                  /> &nbsp; &nbsp;<span className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail}</span> </div>
              </div>
            </div> <br></br>

            {/* Send Verification E-mail button */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <button id="Ippassbutns" class="btn btn-info" type="submit" disabled={isSubmitting}>
                    Send Verification E-mail
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik> <br></br>
      <span class="verifymail">* Click the link sent to your registered mail to activate your account</span>
    </>
  )
}

function Forgotpassword() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    E_mail: "",
  })

  //  Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
    return errors;
  }

  // On submit Function

  var Forgotpassword = async (formData) => {
    var response = await axios.post("http://localhost:3002/forgotpass", {
      email: formData.E_mail,

    })

    if (response.data.message === "Sorry Email does not Exist!") {
      alert("Sorry Email does not Exist!")
    }

    if (response.data === "mail_sent") {
      alert("mail sent")
      Navigate('/setnewpassword')
    }
  }


  return (
    <>

      {/* Top Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "150px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Change Your Password
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Formik
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Forgotpassword(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* Email Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > E_mail </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your E_mail"
                    type="email"
                    name="E_mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.E_mail}
                  /> &nbsp; &nbsp;<span className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail}</span> </div>
              </div>
            </div> <br></br>

            {/* Send Verification E-mail button */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <button id="Ippassbutns" class="btn btn-info" type="submit" disabled={isSubmitting}>
                    Send Verification E-mail
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}

// Function for set new password

function Setnewpassword() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    E_mail: "",
    New_Password: ""
  })

  // Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
    if (formData.New_Password == "") errors.New_Password = "New_Password is Required";
    return errors;
  }

  // Onsubmit Function

  var Forgotpassword = async (formData) => {

    var response = await axios.post("http://localhost:3002/setnewpassword", {
      email: formData.E_mail,
      password: formData.New_Password

    })

    if (response.data.message === "Sorry Email does not Exist!") {
      alert("Sorry Email does not Exist!")
      return;
    }

    alert('Password changed successfully')
    Navigate('/')
  }


  return (
    <>

      {/* Top Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "150px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Set Your New Password
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Formik
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Forgotpassword(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* E_mail Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div class="col-4">
                  <label for="email" > E_mail </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your E_mail"
                    type="email"
                    name="E_mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.E_mail}
                  /> &nbsp; &nbsp; <span className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail} </span></div>
              </div>
            </div> <br></br>

            {/* New_Password Input */}

            <div id="Fname" class="container">
              <div class="row">
                <div id="FnameC" class="col-3">
                  <label for="New_Password" > New_Password </label>
                </div>
                <div id="Ippass">
                  <OutlinedInput
                    placeholder="Enter Your New_Password"
                    type="text"
                    name="New_Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.New_Password}
                  /> &nbsp; &nbsp; <span className="errors">  {errors.New_Password && touched.New_Password && errors.New_Password}</span> </div>
              </div>
            </div> <br></br>

            {/* Change password Button */}

            <div class="container">
              <div class="row">
                <div class="col-12">
                  <button id="IppassbutnCh" class="btn btn-info" type="submit" disabled={isSubmitting}>
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}


// Function used for Dashboard Page

function Dashboard() {
  const Navigate = useNavigate();
  // to store datas array used

  const [array, setarray] = useState({ Product: [] })

  // to store cartvalue  

  const [cartvalue, setcartvalue] = useState(0)

  // to disable add to cart button on click

  const [disable1, setDisable1] = React.useState(false);

  // using useEffect to get data on page load

  useEffect(
    () => {
      cartcount();
    }, [])

  var cartcount = async () => {
    var response = await axios.get('http://localhost:3002/gettotalproductcount')
    var res = response.data.map((row) => {
      setcartvalue(row.Totalcount)
    })
  }

  //formik 

  const [formvalue, setformvalue] = useState({
    URL: ""
  })

  const validate = (formData) => {
    var errors = {};
    if (formData.URL == "") errors.URL = "URL is Required";
    return errors;
  }

  // below function used for posting datas during Add to cart button pressed

  const shorturl = async (formData) => {

    // Posting datas on database

    var post = await axios.post('http://localhost:3002/urlshortner', {
      url: formData.URL,
    })

    // Pushing fetched data to Product Array

    console.log(post)
    var Product = [...array.Product];
    Product.push(post.data);
    setarray({ Product });

    // to make add to Short URl button disable

    setDisable1(true)
    setformvalue({ URL: "" })


    //to get number of url shorterned till date

    var response = await axios.get('http://localhost:3002/gettotalproductcount')
    var res = response.data.map((row) => {
      setcartvalue(row.Totalcount)
    })
  }

  // to enable get short url button on clicking input field

  const enablebutton = () => {
    setDisable1(false)
  }

  return (
    <>

      {/* Log Out button */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <div className="topgrid">
              <Grid container spacing={2}>
                <div className="cart">
                  <button class="btn btn-outline-secondary" id="cartbtn" onClick={() => Navigate('/')} >  Log Out </button>
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <br></br>

      {/* Top Grid */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ height: "150px" }} className="color">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className="fontstyle1">
                      Short your URL here !<br></br>
                    </div>
                    <div className="fontstyle2">
                      Keep It Short & Sweet ..
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>
      <br></br>

      {/* Total Number of URL's created till date card */}

      <div id="grid" class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Grid container spacing={1}  >
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 250 }}>
                  <CardContent className="cardcolor" style={{ height: "300px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Total Number of URL's created till date
                      </div> <br></br>
                      <div className="fontstyle4">
                        <span className="numbers">{cartvalue}</span>
                      </div><br></br>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/*  Number of URL's created per day card */}

              <Grid item xs={3}>
                <Card sx={{ maxWidth: 250 }}>
                  <CardContent className="cardcolor" style={{ height: "300px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Number of URL's created per day
                      </div> <br></br>
                      <div className="fontstyle4">
                        <span className="numbers"> 2 </span>
                      </div><br></br>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/*  Backdrop Stand card */}

              <Grid item xs={5}>
                <Formik
                  enableReinitialize
                  initialValues={formvalue}
                  validate={(formData) => validate(formData)}
                  onSubmit={(formData) => shorturl(formData)}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>

                      {/* URL Input */}

                      <div class="container">
                        <div class="row">
                          <div class="col-12">
                            <label for="email" className="fontstyle3" > URL </label> &nbsp;&nbsp;&nbsp;
                            <Input
                              placeholder="Enter Your URL"
                              type="text"
                              name="URL"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.URL}
                              onClick={() => enablebutton()}
                            />  </div>
                        </div>
                      </div> <br></br>
                      <br></br>

                      {/* Get Short URL Button */}

                      <div class="container">
                        <div class="row">
                          <div class="col-12">
                            <button id="Ippassbutnsurl" disabled={disable1} class="btn btn-secondary" type="submit" >
                              Get Short URL
                            </button>   &nbsp;  &nbsp;
                            <span className="errors">  {errors.URL && touched.URL && errors.URL} </span>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik> <br></br>

                <div class="URLtable">
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <Table striped bordered hover table-responsive variant="primary" border='1'>
                          <thead>
                            <tr>
                              <td> Original url </td>
                              <td> short url </td>
                            </tr>
                          </thead>
                          <tbody>
                            {array.Product.map((row) => (
                              <tr key={row.id}>
                                <td> <a href={row.url} target='_blank'> {row.url} </a>  </td>
                                <td> <a href={row.shorturl} target='_blank'> {row.shorturl} </a>  </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                  <span class="clickhere" onClick={() => Navigate("/url")}>Click Here.. to get all your URL's</span>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <br></br>

      {/* Bottom Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "100px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle2">
                Copyright © URL Shortner Website 2022
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

// Function to get all url's

function URL() {
  const Navigate = useNavigate();
  // to store datas array used

  const [array, setarray] = useState({ Product: [] })

  useEffect(
    () => {
      cartcount();
    }, [])


  var cartcount = async () => {
    var response = await axios.get('http://localhost:3002/getdatas')
    var res = response.data
    console.log(res)
    setarray({ Product: res })
  }

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <div className="topgrid">
              <Grid container spacing={2}>

                {/* Home button */}

                <div className="cart">
                  <button class="btn btn-outline-secondary" id="cartbtn" onClick={() => Navigate('/dashboard')} > Home </button>
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <br></br>

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ height: "150px" }} className="color">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className="fontstyle1">
                      Shorterned URL's Till Date<br></br>
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>
      <br></br>

      <div class="container">
        <div class="row">
          <div class="col-12">
            <Table striped bordered hover variant="primary" border='1'>
              <thead>
                <tr>
                  <td> <b> Original url  </b> </td>
                  <td> <b> short url </b> </td>
                </tr>
              </thead>
              <tbody>
                {array.Product.map((row) => (
                  <tr key={row.id}>
                    <td> <a href={row.url} target='_blank'> {row.url} </a></td>
                    <td><a href={row.shorturl} target='_blank'> {row.shorturl} </a> </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )

}
