import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toggleLoading } from "../utils/loaderSlice";
import { removeConnections } from "../utils/connectionsSlice";
import { removeFeed } from "../utils/feedSlice";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isSignUpFlow, setIsSignUpFlow] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        dispatch(toggleLoading(true));
        try{
            const res = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true });
            dispatch(removeConnections());
            dispatch(removeFeed());
            dispatch(addUser(res?.data?.user));
            dispatch(toggleLoading(false));
            setError('');
            return navigate("/");
        } catch(error){
            dispatch(toggleLoading(false));
            setError(error?.response?.data || error?.message);
        }
    }
    
    const handleSignup = async () => {
        dispatch(toggleLoading(true));
        try{
            const res = await axios.post(`${BASE_URL}/signUp`, { email, password, firstName, lastName, age, gender, photoUrl }, { withCredentials: true });
            dispatch(toggleLoading(false));
            setIsSignUpFlow(false);
            setError('');
        } catch(error){
            dispatch(toggleLoading(false));
            setError(error?.response?.data || error?.message);
        }
    }

    const handleFormSubmission = () => {
        isSignUpFlow ? handleSignup() : handleLogin();
    }

    return <div className="flex justify-center items-center h-full">
        <div className="card bg-base-200 w-96 shadow-sm" onKeyDown={e => {
            if(e.key === 'Enter'){
                handleFormSubmission();
            }
        }}>
            <div className="card-body">
                <h2 className="card-title">Sign {isSignUpFlow ? 'Up' : 'In'} to Coupler!</h2>
                <div className="py-4">

                    {
                        isSignUpFlow && 
                        <>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" 
                                    className="input" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" 
                                    className="input" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="text" 
                                    className="input" 
                                    value={age} 
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Gender</legend>
                                <input type="text" 
                                    className="input" 
                                    value={gender} 
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Photo URL</legend>
                                <input type="text" 
                                    className="input" 
                                    value={photoUrl} 
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </fieldset>
                        </>

                    }

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
                    <button className="btn btn-primary" onClick={handleFormSubmission}>
                        {isSignUpFlow ? 'Sign Up' : 'Login'}
                    </button>
                </div>
                <div className="mt-5">
                    {
                        isSignUpFlow 
                            ? <div className="text-center">Existing User? <span className="cursor-pointer text-primary" onClick={() => setIsSignUpFlow(false)}>Sign In</span></div>
                            : <div className="text-center">New User? <span className="cursor-pointer text-primary" onClick={() => setIsSignUpFlow(true)}>Sign Up</span></div>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Login;