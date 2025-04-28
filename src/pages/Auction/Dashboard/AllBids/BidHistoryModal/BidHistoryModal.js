import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, Row, Col, Spinner } from "reactstrap";

const BidHistoryModal = ({ isOpen, toggle, bidNo, bidData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [bidHistory, setBidHistory] = useState([]);
    const [manualPage, setManualPage] = useState("");
    
    const itemsPerPage = 5;

    // Fetch bid history data when modal opens or bidNo changes
    useEffect(() => {
        if (isOpen && bidNo) {
            fetchBidHistory(bidNo);
        }
    }, [isOpen, bidNo]);

    // Simulated API call to fetch bid history
    const fetchBidHistory = (bidNumber) => {
        setLoading(true);
        
        // In a real application, this would be an API call
        // For now, we'll simulate a delay and use dummy data
        setTimeout(() => {
            // Sample data based on the image
            const historyData = [
                {
                    serialNo: 1,
                    time: "12 Jan, 2025 10:30 AM",
                    amount: "10,000",
                    material: "Iron",
                    quantity: "50 Tan"
                },
                {
                    serialNo: 2,
                    time: "12 Jan, 2025 10:24 AM",
                    amount: "8,000",
                    material: "Cement",
                    quantity: "45 Tan"
                },
                {
                    serialNo: 3,
                    time: "12 Jan, 2025 10:26 AM",
                    amount: "4,000",
                    material: "Steel",
                    quantity: "20 Tan"
                },
                {
                    serialNo: 4,
                    time: "12 Jan, 2025 10:45 AM",
                    amount: "6,000",
                    material: "Coal",
                    quantity: "22 Tan"
                },
                {
                    serialNo: 5,
                    time: "12 Jan, 2025 10:15 AM",
                    amount: "7,500",
                    material: "Copper",
                    quantity: "16 Tan"
                },
                // Additional items for pagination testing
                {
                    serialNo: 6,
                    time: "12 Jan, 2025 09:15 AM",
                    amount: "9,500",
                    material: "Aluminum",
                    quantity: "30 Tan"
                },
                {
                    serialNo: 7,
                    time: "12 Jan, 2025 09:30 AM",
                    amount: "11,200",
                    material: "Iron",
                    quantity: "55 Tan"
                }
            ];
            
            setBidHistory(historyData);
            setLoading(false);
        }, 500);
    };

    // Reset state when modal closes
    const handleClose = () => {
        setSearchTerm("");
        setCurrentPage(1);
        setManualPage("");
        toggle();
    };

    // Filter the bid history based on search term
    const filteredBidHistory = bidHistory.filter(bid =>
        Object.values(bid).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredBidHistory.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBidHistory.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            setManualPage(newPage.toString());
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
        setManualPage("1");
    };

    // Handle manual page input
    const handleManualPageChange = (e) => {
        setManualPage(e.target.value);
    };

    const handleManualPageSubmit = (e) => {
        if (e.key === 'Enter') {
            const page = parseInt(manualPage);
            if (!isNaN(page) && page > 0 && page <= totalPages) {
                setCurrentPage(page);
            } else {
                setManualPage(currentPage.toString());
            }
        }
    };

    // Export bid history as CSV
    const exportCSV = () => {
        const headers = ["Serial No", "Time", "Amount", "Material", "Quantity"];
        const csvData = filteredBidHistory.map(bid => 
            [bid.serialNo, bid.time, bid.amount, bid.material, bid.quantity]
        );
        
        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Bid_History_${bidNo}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Modal isOpen={isOpen} toggle={handleClose} centered size="lg">
            <ModalHeader toggle={handleClose} className="border-bottom p-3 bg-light">
                Bid No. - {bidNo || "B123"}
            </ModalHeader>
            <ModalBody className="p-3">
                {/* Search and Export */}
                <div className="d-flex justify-content-between mb-3">
                    <Button color="success" size="sm" onClick={exportCSV}>
                        <i className="ri-file-excel-line me-1"></i> Export to CSV
                    </Button>
                    <div style={{ width: "300px" }}>
                        <Input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner color="primary" />
                            <p className="mt-2">Loading bid history...</p>
                        </div>
                    ) : bidHistory.length === 0 ? (
                        <div className="text-center my-5">
                            <p>No bid history available for this bid.</p>
                        </div>
                    ) : (
                        <table className="table table-bordered table-striped mb-0">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="text-center" style={{ width: "10%" }}>Serial No</th>
                                    <th className="text-center" style={{ width: "25%" }}>Time</th>
                                    <th className="text-center" style={{ width: "20%" }}>Amount</th>
                                    <th className="text-center" style={{ width: "25%" }}>Material</th>
                                    <th className="text-center" style={{ width: "20%" }}>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((bid) => (
                                    <tr key={bid.serialNo}>
                                        <td className="text-center">{bid.serialNo}</td>
                                        <td className="text-center">{bid.time}</td>
                                        <td className="text-center">{bid.amount}</td>
                                        <td className="text-center">{bid.material}</td>
                                        <td className="text-center">{bid.quantity}</td>
                                    </tr>
                                ))}
                                {currentItems.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No matching records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {!loading && bidHistory.length > 0 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            Total Results: {filteredBidHistory.length}
                        </div>
                        <div className="d-flex align-items-center">
                            <Button
                                color="primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1 || totalPages === 0}
                            >
                                <i className="mdi mdi-chevron-left"></i>
                            </Button>
                            <span className="mx-2">Page {currentPage} of {totalPages || 1}</span>
                            <Button
                                color="primary"
                                size="sm"
                                className="ms-2 me-2"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                <i className="mdi mdi-chevron-right"></i>
                            </Button>
                            <Input
                                type="text"
                                name="page"
                                id="page"
                                placeholder="1"
                                style={{ width: "50px" }}
                                className="text-center"
                                value={manualPage}
                                onChange={handleManualPageChange}
                                onKeyPress={handleManualPageSubmit}
                            />
                        </div>
                    </div>
                )}
            </ModalBody>
        </Modal>
    );
};

export default BidHistoryModal;