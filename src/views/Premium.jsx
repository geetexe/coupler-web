import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {

    const handleBuyAction = async (membershipType) => {
        const order = await axios.post(`${BASE_URL}/createOrder`, { membershipType }, { withCredentials: true });

        const { rzpKeyId: key, amount, currency, notes, orderId:order_id } = order.data || {};
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
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();


    }

    return <div className="m-10">
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
}

export default Premium;