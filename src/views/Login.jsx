import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toggleLoading } from "../utils/loaderSlice";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmailId] = useState('geet@coupler.com');
    const [password, setPassword] = useState('geet123');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        dispatch(toggleLoading(true));
        try{
            const res = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true });
            dispatch(addUser(res?.data?.user));
            dispatch(toggleLoading(false));
            return navigate("/");
        } catch(error){
            dispatch(toggleLoading(false));
            setError(error?.response?.data || error?.message);
        }
    }

    return <div className="flex justify-center items-center">
        <div className="card bg-base-200 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Sign In to Coupler!</h2>
                <div className="py-4">
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input type="text" 
                            className="input" 
                            value={email} 
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Password</legend>
                        <input 
                            type="password" 
                            className="input" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;