import React, { useState } from "react";
import {
    useGetCustomersQuery,
    useUpdateCustomerMutation,
} from "../../../context/api/customerApi";
import { Link } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import PaymentForm from "../../../components/paymentForm/PaymentForm";
import "./customersList.scss";

const CustomersList = () => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const { data: customersData } = useGetCustomersQuery();
    const [updateCustomer] = useUpdateCustomerMutation();

    const togglePinStatus = (customer) => {
        const updatedCustomer = { ...customer, pin: !customer.pin };
        updateCustomer({ body: updatedCustomer, id: customer._id });
    };

    const customerItems = customersData?.innerData.map((customer) => (
        <tr key={customer._id} className="customer-item">
            <td>{customer._id}</td>
            <td>{customer.firstName}</td>
            <td>{customer.residentialAddress}</td>
            <td>{customer.phoneNumber}</td>
            <td className={`budget ${customer.budgetAmount > 0 ? 'positive' : customer.budgetAmount === 0 ? 'neutral' : 'negative'}`}>
                {customer.budgetAmount}
            </td>
            <td>
                <Link to={`/customers/${customer._id}`}>Details</Link>
                <button onClick={() => togglePinStatus(customer)}>Toggle Pin</button>
                <button onClick={() => setShowPaymentForm(customer)}>Add Payment</button>
            </td>
        </tr>
    ));

    return (
        <>
            <section className="customer-list">
                <h2 className="page-title">Customers</h2>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Budget</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerItems}
                    </tbody>
                </table>
            </section>
            {showPaymentForm && (
                <Modal onClose={() => setShowPaymentForm(null)}>
                    <PaymentForm customerId={showPaymentForm._id} onClose={() => setShowPaymentForm(null)} />
                </Modal>
            )}
        </>
    );
};

export default CustomersList;
