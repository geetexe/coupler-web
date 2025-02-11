import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';
import Loader from './components/Loader';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);
  const isLoading = useSelector(store => store.loader);
  const fetchUser = async () => {
    try{
      const user = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
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
    {isLoading && <Loader />}
    <NavBar />
    <div className='mb-40'>
      <Outlet />
    </div>
    <Footer />
  </>)
}

export default Body;