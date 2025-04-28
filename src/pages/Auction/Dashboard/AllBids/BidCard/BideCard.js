import React from "react";
import { Link } from "react-router-dom";

const BidCard = ({ bid, handleViewClick }) => {
    // Function to determine status button color
    const getStatusButtonColor = (status) => {
        switch (status) {
            case "Completed":
                return "danger";
            case "Running":
                return "warning";
            case "To Be Started":
                return "info";
            default:
                return "secondary";
        }
    };

    return (
        <div className="mb-3">
            {/* Header with status, bid number, start time and route number */}
            <div className="rounded-top p-2 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#3a4ca4", color: "white" }}>
                <div className="d-flex align-items-center">
                    <span className={`btn btn-${getStatusButtonColor(bid.status)} btn-sm me-3 py-1 px-3`}
                        style={{ borderRadius: "4px", fontSize: "0.9rem" }}>
                        {bid.status}
                    </span>
                    <span className="me-3">Bid No.: {bid.bidNo}</span>
                    <span className="me-3">Bid Start Time: {bid.bidStartTime}</span>
                </div>
                <div>
                    <span>Route No.: {bid.routeNo}</span>
                </div>
            </div>

            {/* Content area with clear column separators */}
            <div className="border border-top-0 rounded-bottom p-0">
                <div className="row g-0">
                    {/* Winner/Transporter section with special styling for "Winner" badge */}
                    <div className="col-md-2 text-center p-3 border-end" style={{ backgroundColor: "#fff" }}>
                        {bid.status === "Completed" && bid.rank === "Winner" ? (
                            <div className="position-relative">
                                <div className="position-relative mb-2" style={{ height: "60px" }}>
                                    <div style={{
                                        position: "absolute",
                                        top: "0",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "100px",
                                        height: "30px",
                                        backgroundColor: "#e74c3c",
                                        borderRadius: "4px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <span className="text-white">Winner</span>
                                    </div>
                                </div>
                                <div className="text-primary fw-bold">{bid.transporterName}</div>
                            </div>
                        ) : bid.status === "Running" && bid.rank ? (
                            <div className="py-2">
                                <div className="text-info fw-medium mb-1">Rank {bid.rank}</div>
                                <div>{bid.transporterName}</div>
                            </div>
                        ) : (
                            <div className="py-3">
                                <div className="text-secondary">Not Started</div>
                            </div>
                        )}
                    </div>

                    {/* From/To Location section */}
                    <div className="col-md-2 border-end p-3">
                        <div className="mb-1">
                            <div className="fw-medium">From Location</div>
                            <div>{bid.fromLocation}</div>
                        </div>
                        <div className="mb-1">
                            <div className="fw-medium">To Location</div>
                            <div>{bid.toLocation}</div>
                        </div>
                        <div className="mb-1">
                            <div className="fw-medium">Distance</div>
                            <div>{bid.distance}</div>
                        </div>
                        <div>
                            <div className="fw-medium">Time</div>
                            <div>{bid.time}</div>
                        </div>
                    </div>

                    {/* Material section */}
                    <div className="col-md-1 border-end p-3">
                        <div className="mb-1">
                            <div className="fw-medium">Material</div>
                            <div>{bid.material}</div>
                        </div>
                        <div className="mb-1">
                            <div className="fw-medium">Quantity</div>
                            <div>{bid.quantity}</div>
                        </div>
                        <div>
                            <div className="fw-medium">Multiple Order</div>
                            <div>{bid.multipleOrder}</div>
                        </div>
                    </div>

                    {/* Price section */}
                    <div className="col-md-2 border-end p-3">
                        <div className="mb-1">
                            <div className="fw-medium">Ceiling Price</div>
                            <div>{bid.ceilingPrice}</div>
                        </div>
                        <div className="mb-1">
                            <div className="fw-medium">Interval Price</div>
                            <div>{bid.intervalPrice}</div>
                        </div>
                        <div>
                            <div className="fw-medium">Last Bid</div>
                            <div>{bid.lastBid}</div>
                        </div>
                    </div>

                    {/* City/Line section */}
                    <div className="col-md-2 border-end p-3">
                        <div className="mb-2">
                            <div className="fw-medium">City Name</div>
                            <div>{bid.cityName}</div>
                        </div>
                        <div>
                            <div className="fw-medium">Line No.</div>
                            <div>{bid.lineNo}</div>
                        </div>
                    </div>

                    {/* Time Remaining section */}
                    <div className="col-md-1 border-end p-3 d-flex flex-column justify-content-center align-items-center" style={{ width: '120px' }}>
                        <div className="text-center w-100">
                            <div className="bg-light rounded-full w-20 h-20 mx-auto shadow-md flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-secondary text-sm mb-1">Time Remaining</div>
                                    <div className="text-primary font-medium">00:00</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons in separate column */}
                    <div className="col-md-1 p-3 d-flex flex-column justify-content-center ">
                        <Link
                            to="#"
                            className="btn btn-success btn-sm mb-2"
                            style={{ backgroundColor: "#00C4AA", borderColor: "#00C4AA", width: "100px", }}
                            onClick={() => handleViewClick(bid.id)}
                        >
                            VIEW DETAIL
                        </Link>
                        <Link
                            to="#"
                            className="btn btn-secondary btn-sm"
                            style={{ backgroundColor: "#4D5499", borderColor: "#4D5499", width: "100px" }}
                            onClick={() => handleViewClick(bid.id)}
                        >
                            BID HISTORY
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BidCard;