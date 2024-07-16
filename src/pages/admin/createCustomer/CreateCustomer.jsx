import React, { useState } from "react";
import { useCreateCustomerMutation } from "../../../context/api/customerApi";
import "./customerRegistration.scss";

const initialCustomerState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    residentialAddress: "",
    budgetAmount: "",
};

const CreateCustomer = () => {
    const [createCustomer] = useCreateCustomerMutation();
    const [formData, setFormData] = useState(initialCustomerState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        createCustomer(formData);
        console.log(formData);
        setFormData(initialCustomerState);
    };

    return (
        <div className="customer-registration-wrapper">
            <h2 className="page-title">Register New Customer</h2>
            <form className="customer-registration-form" onSubmit={handleFormSubmit}>
                <div className="form-fields">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="residentialAddress"
                        placeholder="Address"
                        value={formData.residentialAddress}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="budgetAmount"
                        placeholder="Budget"
                        value={formData.budgetAmount}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default CreateCustomer;
