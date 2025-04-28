import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from "reactstrap";

const BidViewModal = ({ isOpen, toggle, viewData }) => {
    return (
        <Modal id="viewModal" isOpen={isOpen} toggle={toggle} centered size="lg">
            <ModalHeader className="bg-light p-3" toggle={toggle}>
                Bid Details
            </ModalHeader>
            <ModalBody className="py-2">
                <Row className="g-2">
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Bid No.</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.bidNo}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Route No.</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.routeNo}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Bid Start Time</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.bidStartTime}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">From Location</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.fromLocation}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">To Location</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.toLocation}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Distance</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.distance}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Time</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.time}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Material</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.material}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Quantity</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.quantity}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Ceiling Price</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.ceilingPrice}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Interval Price</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.intervalPrice}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">City Name</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.cityName}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Line No.</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.lineNo}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Last Bid</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.lastBid}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Multiple Order</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.multipleOrder}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-2">
                            <Label className="form-label fw-semibold mb-1">Status</Label>
                            <p className="form-control form-control-sm bg-light py-1">{viewData.status}</p>
                        </div>
                    </Col>
                    {viewData.rank && (
                        <Col md={4}>
                            <div className="mb-2">
                                <Label className="form-label fw-semibold mb-1">Rank</Label>
                                <p className="form-control form-control-sm bg-light py-1">{viewData.rank}</p>
                            </div>
                        </Col>
                    )}
                    {viewData.transporterName && (
                        <Col md={4}>
                            <div className="mb-2">
                                <Label className="form-label fw-semibold mb-1">Transporter Name</Label>
                                <p className="form-control form-control-sm bg-light py-1">{viewData.transporterName}</p>
                            </div>
                        </Col>
                    )}
                </Row>
            </ModalBody>
            <ModalFooter className="pt-0">
                <button type="button" className="btn btn-light" onClick={toggle}>Close</button>
            </ModalFooter>
        </Modal>
    );
};

export default BidViewModal;