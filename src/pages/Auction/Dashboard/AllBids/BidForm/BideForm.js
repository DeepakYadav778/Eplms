import React from "react";
import { Row, Col, Form, ModalBody, ModalFooter, Label, Input } from "reactstrap";
import Flatpickr from "react-flatpickr";

const BidForm = ({ 
    values, 
    handleInputChange, 
    handleSubmit, 
    isEdit, 
    toggle, 
    statusOptions, 
    materialTypes, 
    multipleOrderOptions 
}) => {
    return (
        <Form className="tablelist-form" onSubmit={handleSubmit}>
            <ModalBody>
                <Row className="g-3">
                    <Col md={4}>
                        <Label htmlFor="bidNo" className="form-label">Bid No.<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="bidNo"
                            id="bidNo"
                            placeholder="Enter Bid No."
                            maxLength="15"
                            value={values.bidNo}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="routeNo" className="form-label">Route No.<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="routeNo"
                            id="routeNo"
                            placeholder="Enter Route No."
                            maxLength="15"
                            value={values.routeNo}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="bidStartTime" className="form-label">Bid Start Time<span style={{ color: "red" }}>*</span></Label>
                        <Flatpickr
                            className="form-control"
                            options={{
                                enableTime: true,
                                dateFormat: "d/m/Y H:i K"
                            }}
                            value={values.bidStartTime}
                            onChange={date => handleInputChange({
                                target: {
                                    name: "bidStartTime",
                                    value: date[0]
                                }
                            })}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="fromLocation" className="form-label">From Location<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="fromLocation"
                            id="fromLocation"
                            placeholder="Enter From Location"
                            value={values.fromLocation}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="toLocation" className="form-label">To Location<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="toLocation"
                            id="toLocation"
                            placeholder="Enter To Location"
                            value={values.toLocation}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="distance" className="form-label">Distance<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="distance"
                            id="distance"
                            placeholder="Enter Distance"
                            value={values.distance}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="time" className="form-label">Time<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="time"
                            id="time"
                            placeholder="Enter Time"
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="material" className="form-label">Material<span style={{ color: "red" }}>*</span></Label>
                        <Input
                            name="material"
                            type="select"
                            className="form-select"
                            id="material"
                            value={values.material}
                            onChange={handleInputChange}
                            required
                        >
                            {materialTypes.map((item, key) => (
                                <React.Fragment key={key}>
                                    {item.options.map((item, subKey) => (
                                        <option value={item.value} key={subKey}>{item.label}</option>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Input>
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="quantity" className="form-label">Quantity<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="quantity"
                            id="quantity"
                            placeholder="Enter Quantity"
                            value={values.quantity}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="ceilingPrice" className="form-label">Ceiling Price<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="ceilingPrice"
                            id="ceilingPrice"
                            placeholder="Enter Ceiling Price"
                            value={values.ceilingPrice}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="intervalPrice" className="form-label">Interval Price<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="intervalPrice"
                            id="intervalPrice"
                            placeholder="Enter Interval Price"
                            value={values.intervalPrice}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="cityName" className="form-label">City Name<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="cityName"
                            id="cityName"
                            placeholder="Enter City Name"
                            value={values.cityName}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="lineNo" className="form-label">Line No.<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="lineNo"
                            id="lineNo"
                            placeholder="Enter Line No."
                            value={values.lineNo}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="lastBid" className="form-label">Last Bid<span style={{ color: "red" }}>*</span></Label>
                        <Input type="text" required className="form-control"
                            name="lastBid"
                            id="lastBid"
                            placeholder="Enter Last Bid"
                            value={values.lastBid}
                            onChange={handleInputChange} 
                        />
                    </Col>
                    <Col md={4}>
                        <Label htmlFor="multipleOrder" className="form-label">Multiple Order<span style={{ color: "red" }}>*</span></Label>
                        <Input
                            name="multipleOrder"
                            type="select"
                            className="form-select"
                            id="multipleOrder"
                            value={values.multipleOrder}
                            onChange={handleInputChange}
                            required
                        >
                            {multipleOrderOptions.map((item, key) => (
                                <React.Fragment key={key}>
                                    {item.options.map((item, subKey) => (
                                        <option value={item.value} key={subKey}>{item.label}</option>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Input>
                    </Col>
                    {isEdit && (
                        <Col md={4}>
                            <Label htmlFor="status" className="form-label">Status<span style={{ color: "red" }}>*</span></Label>
                            <Input
                                name="status"
                                type="select"
                                className="form-select"
                                id="status"
                                value={values.status}
                                onChange={handleInputChange}
                                required
                            >
                                {statusOptions.map((item, key) => (
                                    <React.Fragment key={key}>
                                        {item.options.map((item, subKey) => (
                                            <option value={item.value} key={subKey}>{item.label}</option>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </Input>
                        </Col>
                    )}
                    {isEdit && (
                        <Col md={4}>
                            <Label htmlFor="rank" className="form-label">Rank</Label>
                            <Input type="text" className="form-control"
                                name="rank"
                                id="rank"
                                placeholder="Enter Rank"
                                value={values.rank}
                                onChange={handleInputChange}
                            />
                        </Col>
                    )}
                    {isEdit && (
                        <Col md={4}>
                            <Label htmlFor="transporterName" className="form-label">Transporter Name</Label>
                            <Input type="text" className="form-control"
                                name="transporterName"
                                id="transporterName"
                                placeholder="Enter Transporter Name"
                                value={values.transporterName}
                                onChange={handleInputChange}
                            />
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col md={12} className="hstack gap-2 justify-content-end" style={{ marginTop: "45px" }}>
                        <button type="button" className="btn btn-light" onClick={toggle}>Close</button>
                        <button type="submit" className="btn btn-success">{!!isEdit ? "Update" : "Create Bid"}</button>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Form>
    );
};

export default BidForm;