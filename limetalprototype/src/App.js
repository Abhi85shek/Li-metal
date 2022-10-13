import {useState,useCallback,useEffect} from "react";
import './App.css';
import Navbar from './component/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import CreateOrder from './Pages/CreateOrder';
import SignIn from './Pages/SignIn';
import {AuthContext} from "./shared/context/auth-context";
import {useRecoilValue,useRecoilState} from 'recoil';
import AllProducts from './Pages/AllProducts';
import AddService from './Pages/AddService';
import Suppliers from './Pages/Suppliers';
import PageNotFound from "./Pages/PageNotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewAllPos from "./Pages/ViewAllPos";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import AllOrders from "./component/AllOrders";
import SuperAdminOrdersView from "./Pages/SuperAdminOrdersView";


let logoutTimer;

function App() {

  const initalToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  const initialUserEmail = localStorage.getItem('email') ? localStorage.getItem('email') : null;
  const initialUserName = localStorage.getItem('name') ? localStorage.getItem('name') : null;
  const [token,setToken] = useState(initalToken);
  const [userName,setUserName]=useState(initialUserName)
  const [userId,setUserId] =useState(null);
  const [userEmail,setUserEmail] = useState(initialUserEmail);
  const [userType,setUserType]=useState();
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [tokenExpirationDate,setTokenExpirationDate]=useState();

  let routes

  const login = useCallback((uid,token,uType,email,userName,expirationDate)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('uType',uType);
    localStorage.setItem('email',email)
    localStorage.setItem('name',userName)
    localStorage.setItem('uid',uid)
    setUserId(uid);
    setToken(token);
    setUserType(uType)
    setUserEmail(email);
    setUserName(userName)
    setIsLoggedIn(true)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime()+ 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({userId:uid,token:token,userType:uType,userEmail:email,uname:userName,expiration:tokenExpirationDate.toISOString()}));
    
  },[]);

  const logout =useCallback(()=>{
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    setUserType(null);
    setUserName(null)
    setUserEmail(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('uType');
    localStorage.removeItem('name');
    localStorage.removeItem('userType');
    localStorage.removeItem('quickbooksCredentials')
    localStorage.removeItem('quickbooksAuthCode')
    localStorage.removeItem('qbConnectVisible')
  },[]);

  useEffect(()=>{
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();  
      logoutTimer= setTimeout(logout,remainingTime);
    }
    else
    {
      clearTimeout(logoutTimer);
    }

  },[token,logout,tokenExpirationDate]);

  useEffect(()=>{
    const storedData= JSON.parse(JSON.stringify(localStorage.getItem('userData')));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId,storedData.token,new Date(storedData.expiration));

    };
 },[login]);

 if(token) {
  console.log(token)
      routes=(
       <BrowserRouter>
       <Navbar/>
       <ToastContainer />
        <Routes>    
        
            <Route path="/" exact element={<Home />} />
                <Route exact path="/login" element={<Home />} />  
                <Route exact path="/home" element={<Home />} />   
                <Route exact path="/dashboard" element={<Dashboard />} /> 
                <Route exact path="/allProducts" element={<AllProducts />} /> 
               
                <Route exact path="/createOrder" element={<AddService />} /> 
                <Route exact path="/viewallorders" element={<AllOrders />} /> 

                <Route exact path="/allSuppliers" element={<Suppliers />} /> 
                {localStorage.getItem('quickbooksCredentials')!=null?
                <Route exact path="/viewallqbpo" element={<ViewAllPos/>}/>
                :null}
                {localStorage.getItem('uType')=='admin'?
                 <Route exact path="/viewadminallorders" element={<SuperAdminOrdersView/>}/>:null
                }
                <Route path="*" element={<PageNotFound />} exact/>

        </Routes>  
    </BrowserRouter> 
  )
    }
   
else 
{
routes=(  
    <BrowserRouter>
      <Routes>       
        <Route path="*" element={<SignIn />} exact/>
      </Routes>
    </BrowserRouter>  
    
);
}

  return (
    <>
         <AuthContext.Provider 
        value={{
          isLoggedIn:!!token,
          userId: userId,
          token:token,
          userName:userName,
          login: login,
          logout: logout,
          userEmail:userEmail
        }}>
            {routes} 
        </AuthContext.Provider>
    </>

  );
}

export default App;





   

   



   
   