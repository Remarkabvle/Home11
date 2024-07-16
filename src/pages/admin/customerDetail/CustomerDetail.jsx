import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetCustomerByIdQuery,
    useUpdateCustomerMutation,
} from "../../../context/api/customerApi";
import Modal from "../../../components/model/Model";
import PaymentForm from "../../../components/paymentForm/PaymentForm";
import { useGetPaymentsQuery } from "../../../context/api/paymentApi";
import "./customerDetails.scss";

const CustomerDetails = () => {
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [updateCustomer] = useUpdateCustomerMutation();
    const { id } = useParams();
    const { data: customerData } = useGetCustomerByIdQuery(id);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const { data: paymentHistory } = useGetPaymentsQuery();

    const startEditing = (customer) => {
        setEditingCustomer(customer);
    };

    const handleCustomerUpdate = (event) => {
        event.preventDefault();
        const updatedCustomer = {
            firstName: editingCustomer.firstName,
            lastName: editingCustomer.lastName,
            phoneNumber: editingCustomer.phoneNumber,
            residentialAddress: editingCustomer.residentialAddress,
            pinCode: editingCustomer.pinCode,
            budgetAmount: editingCustomer.budgetAmount,
        };
        updateCustomer({ body: updatedCustomer, id: editingCustomer._id });
        setEditingCustomer(null);
    };

    const paymentHistoryItems = paymentHistory?.innerData?.map((payment) => (
        <div key={payment._id} className="payment-history-item">
            <p>{payment.amount}</p>
            <p>{new Date(payment.updatedAt).toLocaleString()}</p>
        </div>
    ));

    return (
        <>
            <div className="customer-details">
                <div className="customer-info">
                    <p><strong>Name:</strong> {customerData?.innerData?.firstName} {customerData?.innerData?.lastName}</p>
                    <p><strong>ID:</strong> {customerData?.innerData?._id}</p>
                    <p><strong>Budget:</strong> {customerData?.innerData?.budgetAmount}</p>
                    <p><strong>Address:</strong> {customerData?.innerData?.residentialAddress}</p>
                    <p><strong>Phone:</strong> {customerData?.innerData?.phoneNumber}</p>
                </div>
                <div className="customer-actions">
                    <button onClick={() => setShowPaymentForm(customerData?.innerData)}>Add Payment</button>
                    <button onClick={() => startEditing(customerData?.innerData)}>Edit</button>
                </div>
                <div className="payment-history">
                    <h3>Payment History</h3>
                    {paymentHistoryItems}
                </div>
            </div>

            {editingCustomer && (
                <Modal onClose={() => setEditingCustomer(null)}>
                    <form className="edit-customer-form" onSubmit={handleCustomerUpdate}>
                        <h2>Edit Customer</h2>
                        <input
                            type="text"
                            name="firstName"
                            value={editingCustomer.firstName}
                            onChange={(e) => setEditingCustomer({ ...editingCustomer, firstName: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={editingCustomer.lastName}
                            onChange={(e) => setEditingCustomer({ ...editingCustomer, lastName: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={editingCustomer.phoneNumber}
                            onChange={(e) => setEditingCustomer({ ...editingCustomer, phoneNumber: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="residentialAddress"
                            value={editingCustomer.residentialAddress}
                            onChange={(e) => setEditingCustomer({ ...editingCustomer, residentialAddress: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="budgetAmount"
                            value={editingCustomer.budgetAmount}
                            onChange={(e) => setEditingCustomer({ ...editingCustomer, budgetAmount: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="pinCode"
                            value={editingCustomer.pinCode}
                            onChange={(e) => setEditingCustomer({ ...editingCustomer, pinCode: e.target.value })}
                            required
                        />
                        <button type="button" onClick={() => setEditingCustomer(null)}>Cancel</button>
                        <button type="submit">Save</button>
                    </form>
                </Modal>
            )}
            {showPaymentForm && (
                <Modal onClose={() => setShowPaymentForm(null)}>
                    <PaymentForm customerId={showPaymentForm._id} onClose={() => setShowPaymentForm(null)} />
                </Modal>
            )}
        </>
    );
};

export default CustomerDetails;
