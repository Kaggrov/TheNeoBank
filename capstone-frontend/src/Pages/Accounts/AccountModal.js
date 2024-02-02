import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AccountModal({
    showModal,
    handleCloseModal,
    accountNo,
    isValidAccountNo,
    handleAccountNoChange,
    accountType,
    setAccountType,
    selectedBank,
    setSelectedBank,
    addAccountSuccess,
    addAccountError,
    handleSave,
    bankOptions,
}) {
    return (
        <Modal className="accountModal" show={showModal} onHide={handleCloseModal} centered>
            <div style={{ backgroundColor: "#FFDBEC" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Request to Link new Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="accountNo">
                            <Form.Label>Account Number:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter account number"
                                value={accountNo}
                                onChange={(e) => handleAccountNoChange(e)}
                                isInvalid={!isValidAccountNo}
                                name="account-Number"
                            />
                            {!isValidAccountNo && (
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid account number in the format "xxxx-xxxx-xxxx".
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="accountType">
                            <Form.Label>Account Type:</Form.Label>
                            <Form.Control
                                as="select"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                                name="account-Type"
                            >
                                <option value="">Select type of account</option>
                                <option value="Savings">Savings</option>
                                <option value="Current">Current</option>
                                <option value="Fixed Deposit">Fixed Deposit</option>
                            </Form.Control>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="bankName">
                            <Form.Label>Bank Name:</Form.Label>
                            <Form.Control
                                as="select"
                                name="bank_id"
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                required
                            >
                                <option value="">Select a bank</option>
                                {bankOptions.map((bank) => (
                                    <option key={bank.bankId} value={bank.bankId}>
                                        {bank.bankName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <br></br>
                    {addAccountSuccess && <div className="alert alert-warning">{addAccountSuccess}</div>}
                    {addAccountError && <div className="alert alert-danger">{addAccountError}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button name="save-button" variant="primary" onClick={handleSave}>
                        Add
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default AccountModal;
