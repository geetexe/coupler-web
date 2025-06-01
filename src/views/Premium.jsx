import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../utils/loaderSlice";

const Premium = () => {

    const dispatch = useDispatch();
    const [isPaymentDone, setIsPaymentDone] = useState(null);

    const verifyPayment = async (orderId) => {
        dispatch(toggleLoading(true));
        const res = await axios.get(`${BASE_URL}/verifyPayment/${orderId}`, { withCredentials: true });
        setIsPaymentDone(res.data.isPaymentDone);
        dispatch(toggleLoading(false));
    }

    const handleBuyAction = async (membershipType) => {
        const _order = await axios.post(`${BASE_URL}/createOrder`, { membershipType }, { withCredentials: true });
        const { rzpKeyId: key, amount, currency, notes, orderId:order_id } = _order.data || {};
        const { firstName, lastName, emailId:email } = notes || {};
        const options = {
            key, amount, currency, order_id, notes, 
            name: 'Coupler',
            description: 'get COUPLED up!',
            prefill: {
                name: `${firstName} ${lastName}`,
                email,
                contact: ''
            },
            theme: {
                color: '#1d232a'
            },
            handler: verifyPayment.bind(null, order_id)
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return isPaymentDone ? 
        <>
            <div className="h-dvh flex justify-center items-center text-center flex-col">
                <img src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png" className="h-[200px] w-auto" />
                <span className="mt-10 mb-30">
                    <h3 className="text-xl font-bold mb-2">Payment Successful</h3>
                    Congratulations, you are a premium user now!
                </span>
            </div>
        </> : <>
            <div className="m-10">
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="card bg-base-300 rounded-box grid grow place-items-center pb-5 pt-5">
                        <h2 className="mb-5 mt-2 text-2xl font-bold">Silver Membership</h2>
                        <ul className="mb-5 list-disc">
                            <li>Chat with your matches!</li>
                            <li>100 connection requests per day!</li>
                            <li>Premium badge</li>
                        </ul>
                        <button onClick={() => handleBuyAction('silver') } className="btn btn-primary">Buy Silver</button>
                    </div>
                    <div className="divider lg:divider-horizontal">OR</div>
                    <div className="card bg-base-300 rounded-box grid grow place-items-center pb-5 pt-5">
                        <h2 className="mb-5 mt-2 text-2xl font-bold">Gold Membership</h2>
                        <ul className="mb-5 list-disc">
                            <li>Chat with your matches!</li>
                            <li>Infinite connection requests per day!</li>
                            <li>Premium badge</li>
                        </ul>
                        <button onClick={() => handleBuyAction('gold') } className="btn btn-secondary">Buy Gold</button>
                    </div>
                </div>
            </div>
        </>
}

export default Premium;