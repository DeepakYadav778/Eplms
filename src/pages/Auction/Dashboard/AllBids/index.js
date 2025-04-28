import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../../Components/Common/Loader";
import ExportCSVModal from "../../../../Components/Common/ExportCSVModal";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../../Components/Common/DeleteModal";

// Import custom components
import BidCard from "./BidCard/BideCard";
import BidEditModal from "./BidEditModal/BidEditModal";
import BidViewModal from "./BideViewModal/BideViewModal";

// Import constants
import { 
    sampleData, 
    initialValues, 
    statusOptions,
    materialTypes, 
    multipleOrderOptions 
} from "./BidConstants/bidConstants";

const ViewAllBids = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [bids, setBids] = useState(sampleData); // Using sample data for UI testing
    const [modal, setModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [viewData, setViewData] = useState({});
    const [values, setValues] = useState(initialValues);
    const [CurrentID, setClickedRowId] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [latestHeader, setLatestHeader] = useState('');
    const [Plant_Code, setPlantCode] = useState('');
    // Export Modal
    const [isExportCSV, setIsExportCSV] = useState(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }, [modal]);

    const toggleView = useCallback(() => {
        if (viewModal) {
            setViewModal(false);
        } else {
            setViewModal(true);
        }
    }, [viewModal]);

    useEffect(() => {
        const HeaderName = localStorage.getItem("HeaderName");
        setLatestHeader(HeaderName);
    }, []);

    useEffect(() => {
        // In a real application, you would get the plant code from session storage
        // For UI testing, we'll use a dummy value
        try {
            const obj = JSON.parse(sessionStorage.getItem("authUser"));
            let plantcode = obj?.data?.plantCode || "PLANT001";
            setPlantCode(plantcode);
            // Using sample data directly
            setBids(sampleData);
        } catch (error) {
            // Fallback for testing
            setPlantCode("PLANT001");
            setBids(sampleData);
        }
    }, []);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        auth: {
            username: process.env.REACT_APP_API_USER_NAME,
            password: process.env.REACT_APP_API_PASSWORD,
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value || value.valueAsNumber,
            ['plantCode']: Plant_Code,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);

        try {
            // For UI testing - update the bids state directly
            if (isEdit) {
                const updatedBids = bids.map(bid =>
                    bid.id === CurrentID ? { ...bid, ...values } : bid
                );
                setBids(updatedBids);
                toast.success("Bid Updated Successfully", { autoClose: 3000 });
            } else {
                // For new entries, generate a sequential ID 
                const lastId = bids.length > 0 ? Math.max(...bids.map(bid => bid.id)) : 12344;
                const newBid = {
                    id: lastId + 1,
                    ...values
                };
                setBids([...bids, newBid]);
                toast.success("Bid Added Successfully.", { autoClose: 3000 });
            }
        } catch (e) {
            toast.error("Something went wrong!", { autoClose: 3000 });
        }
        toggle();
    };

    // Add Data
    const handleCustomerClicks = () => {
        setIsEdit(false);
        setValues(initialValues);
        toggle();
    };

    // Update Data
    const handleCustomerClick = useCallback((arg) => {
        setClickedRowId(arg);
        setIsEdit(true);
        toggle();

        // Find the bid in the sample data
        const selectedBid = bids.find(bid => bid.id === arg);
        if (selectedBid) {
            setValues({
                bidNo: selectedBid.bidNo,
                routeNo: selectedBid.routeNo,
                bidStartTime: selectedBid.bidStartTime,
                fromLocation: selectedBid.fromLocation,
                toLocation: selectedBid.toLocation,
                distance: selectedBid.distance,
                time: selectedBid.time,
                material: selectedBid.material,
                quantity: selectedBid.quantity,
                ceilingPrice: selectedBid.ceilingPrice,
                intervalPrice: selectedBid.intervalPrice,
                cityName: selectedBid.cityName,
                lineNo: selectedBid.lineNo,
                lastBid: selectedBid.lastBid,
                multipleOrder: selectedBid.multipleOrder,
                status: selectedBid.status,
                rank: selectedBid.rank,
                transporterName: selectedBid.transporterName,
                plantCode: Plant_Code,
            });
        }
    }, [toggle, bids, Plant_Code]);

    // View Data
    const handleViewClick = useCallback((id) => {
        // Find the bid in the sample data
        const selectedBid = bids.find(bid => bid.id === id);
        if (selectedBid) {
            setViewData(selectedBid);
            setViewModal(true);
        } else {
            toast.error("Bid details not found", { autoClose: 3000 });
        }
    }, [bids]);

    // Delete Data
    const onClickDelete = (id) => {
        setClickedRowId(id);
        setDeleteModal(true);
    };

    const handleDeleteCustomer = async (e) => {
        e.preventDefault();

        try {
            // For UI testing - update the bids state directly
            const updatedBids = bids.filter(bid => bid.id !== CurrentID);
            setBids(updatedBids);
            toast.success("Bid Deleted Successfully", { autoClose: 3000 });
            setDeleteModal(false);
        } catch (e) {
            toast.error("Something went wrong!", { autoClose: 3000 });
            setDeleteModal(false);
        }
    };

    document.title = "Bids Management | EPLMS";
    
    return (
        <React.Fragment>
            <div className="page-content">
                <ExportCSVModal
                    show={isExportCSV}
                    onCloseClick={() => setIsExportCSV(false)}
                    data={bids}
                />
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteCustomer}
                    onCloseClick={() => setDeleteModal(false)}
                />
                <Container fluid>
                    <BreadCrumb title={"Bids"} pageTitle="Transport" />
                    <Row>
                        <Col lg={12}>
                            <Card id="bidsList">
                                <CardHeader className="border-0">
                                    <Row className="g-4 align-items-center">
                                        <div className="col-sm">
                                            <div>
                                                <h5 className="card-title mb-0 bg-light p-2">Bids Management</h5>
                                            </div>
                                        </div>
                                     
                                    </Row>
                                </CardHeader>
                                <div className="card-body pt-0">
                                    <div>
                                        {/* Card view for bids */}
                                        <div className="bid-cards-container">
                                            {bids && bids.length ? (
                                                bids.map(bid => (
                                                    <BidCard key={bid.id} bid={bid} handleViewClick={handleViewClick} />
                                                ))
                                            ) : (
                                                <Loader />
                                            )}
                                        </div>
                                    </div>

                                    {/* Edit/Add Modal */}
                                    <BidEditModal 
                                        isOpen={modal}
                                        toggle={toggle}
                                        values={values}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                        isEdit={isEdit}
                                        statusOptions={statusOptions}
                                        materialTypes={materialTypes}
                                        multipleOrderOptions={multipleOrderOptions}
                                    />

                                    {/* View Modal */}
                                    <BidViewModal 
                                        isOpen={viewModal}
                                        toggle={toggleView}
                                        viewData={viewData}
                                    />
                                    
                                    <ToastContainer closeButton={false} limit={1} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ViewAllBids;