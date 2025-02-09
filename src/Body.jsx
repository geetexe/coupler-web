import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);
  const fetchUser = async () => {
    try{
      const user = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      console.log({user});
      dispatch(addUser(user.data));
    }
    catch(error){
      if(error.status === 401){
        navigate('/login');
      }
      console.error(error);
    }
  }
  useEffect(() => {
    !userData && fetchUser();
  }, []);
  return (<>
    <NavBar />
    <Outlet />
    <Footer />
  </>)
}

export default Body;