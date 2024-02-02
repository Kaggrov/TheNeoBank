import React from 'react'
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

function TransactionHistory({ transactions, searchName, currentPage, onPageChange }) {

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedTransactions = transactions.slice(startIndex, endIndex);

    return (
        <div>
            <div className="table-responsive">

                {pagedTransactions.length > 0 ? (
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Paid To</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Debit from Account No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedTransactions.map((x) => {
                                let icon = (
                                    <FontAwesomeIcon
                                        icon={faArrowTrendUp}
                                        style={{ color: "#3C1053", marginRight: "5px" }}
                                    />
                                );

                                return (
                                    <tr key={x.id}>
                                        <td>
                                            {icon}
                                            {x.receiver.payeeName}
                                        </td>
                                        <td>{x.timeStamp}</td>
                                        <td>₹{x.amount}</td>
                                        <td>{x.description}</td>
                                        <td>{x.account}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <div className="text-center mb-5">
                        <h5>"Sorry, no record found."</h5>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionHistory