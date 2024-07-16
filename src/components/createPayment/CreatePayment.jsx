import React, { useState } from "react";
import { useCreatePaymentMutation } from "../../context/api/paymentApi";

const CreatePayment = ({ id, setPayment }) => {
    console.log(id);
    const initialState = {
        customerId: id,
        amount: "",
        comment: "",
    };
    const [cusPay, setCusPay] = useState(initialState);

    const [createPayment] = useCreatePaymentMutation(id);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setCusPay((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaySubmit = (e) => {
        e.preventDefault();
        createPayment(cusPay);
        setPayment(false);
    };

    return (
        <div>
            <form className="payment-form" onSubmit={handlePaySubmit}>
                <h2 className="payment-form-title">Payment</h2>
                <input
                    type="number"
                    className="payment-form-input"
                    placeholder="amount"
                    name="amount"
                    value={cusPay.amount}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="payment-form-input"
                    placeholder="comment"
                    name="comment"
                    value={cusPay.comment}
                    onChange={handleChange}
                />
                <button className="payment-form-button">Save</button>
            </form>
        </div>
    );
};

export default CreatePayment;
