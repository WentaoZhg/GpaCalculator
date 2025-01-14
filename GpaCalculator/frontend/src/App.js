import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import Header from "./pages/header/Header";
import Footer from "./pages/footer/Footer";
import LoginPage from "./pages/login/SignIn";
import SignUpPage from "./pages/login/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import {Navigation} from "./components/Navigation";
import Help from "./components/Help";
import Fqa from "./components/Fqa";
import CourseList from "./components/CourseList";
import AddCourse from "./components/CourseManagement";
import GpaCalculator from "./components/GpaCalculator";
import Contact from "./components/Contact";
import './css/App.css';

function App() {
    //const [clickItem, setClickItem] = useState('');
    //const handleItemClick = (e, { name }) => this.setClickItem({ activeItem: name })

    return (
        <Router>
            <Header/>
            <Navigation/>

            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    {/* <Route path="/" element={<GpaPage/>}></Route> */}
                    <Route path="/courselist" element={<CourseList/>} />
                    <Route path="/addcourse" element={<AddCourse/>} />
                    <Route path="/help" element={<Help/>} />
                    <Route path="/fqa" element={<Fqa/>} />
                </Route>
                <Route path="/" element={<GpaCalculator/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/signup" element={<SignUpPage/>}></Route>
            </Routes>

            <Footer/>
        </Router>
    );
}

export default App;