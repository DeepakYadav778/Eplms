


import React, { useState, useEffect } from "react"; 
import { Form, Input, Label } from "reactstrap";
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './SOBasedOrder.css'; // Make sure to create this CSS file

// Create a custom connector with withStyles (Material-UI v4 approach)
const GreenConnector = withStyles({
  alternativeLabel: {
    top: 22, // Align with circle center
  },
  active: {
    '& $line': {
      borderColor: '#00A389',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#00A389',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

// Custom StepIcon component for Material-UI v4
const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;
  
  return (
    <div
      className={`custom-step-icon ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: completed ? '#00A389' : active ? '#4361ee' : '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: active || completed ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
    >
      {completed ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        icon
      )}
    </div>
  );
};

const SOBasedOrder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false); // State for accordion
  const [searchTerm, setSearchTerm] = useState(""); // State for search functionality
  const [selectedOrders, setSelectedOrders] = useState([]); // State for selected orders
 

  const [values, setValues] = useState({
    // SO Details
    bidStartingFrom: "",
    bidStartTo: "",
    ceilingAmount: "",
    intervalAmount: "",
    uom: "",
    lastMinutesExtension: "",

    // Material and Transporter
    extensionQuantity: "",
    displayToTransporter: "",
    selectTransporter: "",

    // Delivery and Allocation
    autoAllocateTo: "",
    intervalTimeForAllocatingVehicle: "",
    intervalTimeToReachPlant: "",
    gracePeriodToReachPlant: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleBackPage = () => {
    // Navigate to previous step
    setActiveStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    console.log("Selected Sales Orders:", selectedOrders);
    
    // If we're at the Delivery and Allocation step (index 2)
    if (activeStep === 2) {
      // Go to Preview (which is not in the stepper)
      setActiveStep(3); // This will be Preview
    } else if (activeStep === 3) {
      // If we're at Preview, submit to API
      // In a real implementation, you would submit to API here
      console.log("Submitting to API:", { values, selectedOrders });
      
      // Simulate API call
      setIsSubmitting(true);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // After successful submission, go to Finish
        setActiveStep(4);
        // Show success modal
        setShowSuccessModal(true);
      } catch (error) {
        setSubmitError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // For other steps, just go to next step
      setActiveStep(prevStep => Math.min(prevStep + 1, steps.length));
    }
  };

  // Handle order selection
  const handleOrderSelect = (orderNo) => {
    if (selectedOrders.includes(orderNo)) {
      setSelectedOrders(selectedOrders.filter(item => item !== orderNo));
    } else {
      setSelectedOrders([...selectedOrders, orderNo]);
    }
  };

  useEffect(() => {
    document.title = "SO Based Order | EPLMS";
  }, []);

  const steps = [
    'Bid Details',
    'Material and Transporter',
    'Delivery and Allocation',
    'Finish'
  ];

  const autoAllocateToOptions = [
    "Select",
    "Yes",
    "No"
  ];

  const uomOptions = [
    "Select",
    "Yes",
    "Metric Ton",
    "Kilogram",
    "Pound",
    "Liter"
  ];

  const transporterOptions = [
    { id: "0916005637", name: "Jaya Roadways" },
    { id: "0916003431", name: "R & B Transport" }
  ];

  const displayToTransporterOptions = [
    "Select",
    "All"
  ];

  // Sample sales order data
  const salesOrders = [
    { orderNo: "SO34534", validity: "19Jun", material: "Iron", quantity: "10 Tan" },
    { orderNo: "SO93744", validity: "10Jan", material: "Steel", quantity: "20 Tan" },
    { orderNo: "SO88345", validity: "15Feb", material: "Titanium", quantity: "15 Tan" },
    { orderNo: "SO98234", validity: "25Feb", material: "Steel", quantity: "12 Tan" },
    { orderNo: "SO83473", validity: "18Mar", material: "Coal", quantity: "14 Tan" }
  ];

  // Filter sales orders based on search term
  const filteredOrders = salesOrders.filter(order =>
    order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to reset the form and go back to the first step
  const handleBackToCreateBid = () => {
    // Reset form and go back to first step
    setActiveStep(0);
    setShowSuccessModal(false);
    setValues({
      bidStartingFrom: "",
      bidStartTo: "",
      ceilingAmount: "",
      intervalAmount: "",
      uom: "",
      lastMinutesExtension: "",
      extensionQuantity: "",
      displayToTransporter: "",
      selectTransporter: "",
      autoAllocateTo: "",
      intervalTimeForAllocatingVehicle: "",
      intervalTimeToReachPlant: "",
      gracePeriodToReachPlant: ""
    });
    setSelectedOrders([]);
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div className="so-based-order-modal-overlay">
      <div className="so-based-order-modal-content">
        <div className="so-based-order-modal-icon">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            colors="primary:#0ab39c,secondary:#405189"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
        </div>
        <h3 className="so-based-order-modal-title">
          Your SO Based Bid has been created!
        </h3>
        <button
          type="button"
          className="so-based-order-modal-button"
          onClick={handleBackToCreateBid}
        >
          Back to Create Bid
        </button>
      </div>
    </div>
  );

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  return (
    <>
      {/* Material UI Stepper with custom connector for green lines */}
      <div className="so-based-order-stepper-container">
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          connector={<GreenConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      
      <Form onSubmit={handleSubmit}>
        {/* Bid Details Step */}
        {activeStep === 0 && (
          <div className="so-based-order-container">
            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Bid Starting From <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="bidStartingFrom"
                    value={values.bidStartingFrom}
                    onChange={handleInputChange}
                    required
                    className="so-based-order-input"
                  />
                </div>
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Bid Start To
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="bidStartTo"
                    value={values.bidStartTo}
                    onChange={handleInputChange}
                    className="so-based-order-input"
                  />
                </div>
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Ceiling Amount
                </Label>
                <Input
                  type="text"
                  placeholder="Add Amount"
                  name="ceilingAmount"
                  value={values.ceilingAmount}
                  onChange={handleInputChange}
                  className="so-based-order-input"
                />
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Interval Amount
                </Label>
                <Input
                  type="text"
                  placeholder="Add Amount"
                  name="intervalAmount"
                  value={values.intervalAmount}
                  onChange={handleInputChange}
                  className="so-based-order-input"
                />
              </div>
            </div>

            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  UOM
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="uom"
                    value={values.uom}
                    onChange={handleInputChange}
                    className="so-based-order-select"
                  >
                    {uomOptions.map((uom, index) => (
                      <option key={index} value={uom}>
                        {uom}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Last Minutes Extension
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="lastMinutesExtension"
                    value={values.lastMinutesExtension}
                    onChange={handleInputChange}
                    className="so-based-order-input"
                  />
                  <span style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none"
                  }}>
                    <i className="ri-calendar-line"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="so-based-order-button-container">
              <button
                type="button"
                className={`so-based-order-button so-based-order-back-button ${activeStep === 0 ? 'disabled' : ''}`}
                onClick={handleBackPage}
                disabled={activeStep === 0}
                style={{ opacity: activeStep === 0 ? "0.6" : "1" }}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="so-based-order-button so-based-order-next-button"
              >
                Save & Next <i className="ri-arrow-right-line ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* Material and Transporter Step with Improved Accordion Table */}
        {activeStep === 1 && (
          <div className="so-based-order-container">
            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Extension Quantity
                </Label>
                <Input
                  type="text"
                  placeholder="Add Quantity"
                  name="extensionQuantity"
                  value={values.extensionQuantity}
                  onChange={handleInputChange}
                  className="so-based-order-input"
                />
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Display To Transporter
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="displayToTransporter"
                    value={values.displayToTransporter}
                    onChange={handleInputChange}
                    className="so-based-order-select"
                  >
                    {displayToTransporterOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Select Transporter
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="selectTransporter"
                    value={values.selectTransporter}
                    onChange={handleInputChange}
                    className="so-based-order-select"
                  >
                    <option value="">Select</option>
                    {transporterOptions.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>
            </div>

            {/* Improved Accordion Sales Order Selection */}
            <div className="so-based-order-accordion">
              <div 
                className="so-based-order-accordion-header" 
                onClick={toggleAccordion}
              >
                <span>Select Sales Order Details</span>
                <i className={`ri-arrow-${accordionOpen ? 'up' : 'down'}-s-line`}></i>
              </div>
              
              <div 
                className={`so-based-order-accordion-content ${accordionOpen ? 'open' : ''}`}
                style={{ 
                  display: accordionOpen ? 'block' : 'none', // Use display instead of maxHeight for reliable showing/hiding
                }}
              >
                <div className="so-based-order-search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    className="so-based-order-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <table className="so-based-order-table">
                  <thead>
                    <tr>
                      <th style={{ width: "40px" }}></th>
                      <th>Sales Order No.</th>
                      <th>Validity</th>
                      <th>Material</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.orderNo)}
                            onChange={() => handleOrderSelect(order.orderNo)}
                          />
                        </td>
                        <td>{order.orderNo}</td>
                        <td>{order.validity}</td>
                        <td>{order.material}</td>
                        <td>{order.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="so-based-order-pagination">
                  <div className="so-based-order-pagination-count">Total Results: 20</div>
                  <div className="so-based-order-pagination-controls">
                    <button type="button" className="so-based-order-pagination-prev">
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <div className="so-based-order-pagination-info">
                      Page 1 of 4
                    </div>
                    <button type="button" className="so-based-order-pagination-next">
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="so-based-order-button-container">
              <button
                type="button"
                className="so-based-order-button so-based-order-back-button"
                onClick={handleBackPage}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="so-based-order-button so-based-order-next-button"
              >
                Save & Next <i className="ri-arrow-right-line ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* Delivery and Allocation Step */}
        {activeStep === 2 && (
          <div className="so-based-order-container">
            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Auto Allocate To L1 <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="autoAllocateTo"
                    value={values.autoAllocateTo}
                    onChange={handleInputChange}
                    required
                    className="so-based-order-select"
                  >
                    {autoAllocateToOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Interval time for Allocating Vehicle <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="intervalTimeForAllocatingVehicle"
                    value={values.intervalTimeForAllocatingVehicle}
                    onChange={handleInputChange}
                    required
                    className="so-based-order-input"
                  />
                </div>
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Interval time for to reach plant <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="intervalTimeToReachPlant"
                    value={values.intervalTimeToReachPlant}
                    onChange={handleInputChange}
                    required
                    className="so-based-order-input"
                  />
                </div>
              </div>

              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">
                  Grace Period to reach plant <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="gracePeriodToReachPlant"
                    value={values.gracePeriodToReachPlant}
                    onChange={handleInputChange}
                    required
                    className="so-based-order-input"
                  />
                </div>
              </div>
            </div>

            <div className="so-based-order-button-container">
              <button
                type="button"
                className="so-based-order-button so-based-order-back-button"
                onClick={handleBackPage}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="so-based-order-button so-based-order-next-button"
              >
                Save & Next <i className="ri-arrow-right-line ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* Preview Step (not in stepper but comes after Delivery and Allocation) */}
        {activeStep === 3 && (
          <div className="so-based-order-container">
            <div className="so-based-order-preview-header">
              <h3>Review your bid details</h3>
            </div>

            {/* Bid Details Section */}
            <div className="so-based-order-section-title">Bid Details</div>
            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Bid Starting From</Label>
                <div className="so-based-order-value">{values.bidStartingFrom || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Bid Start To</Label>
                <div className="so-based-order-value">{values.bidStartTo || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Ceiling Amount</Label>
                <div className="so-based-order-value">{values.ceilingAmount || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Interval Amount</Label>
                <div className="so-based-order-value">{values.intervalAmount || "—"}</div>
              </div>
            </div>
            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">UOM</Label>
                <div className="so-based-order-value">{values.uom || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Last Minutes Extension</Label>
                <div className="so-based-order-value">{values.lastMinutesExtension || "—"}</div>
              </div>
            </div>

            {/* Material and Transporter Section */}
            <div className="so-based-order-section-title">Material and Transporter</div>
            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Extension Quantity</Label>
                <div className="so-based-order-value">{values.extensionQuantity || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Display To Transporter</Label>
                <div className="so-based-order-value">{values.displayToTransporter || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Select Transporter</Label>
                <div className="so-based-order-value">{values.selectTransporter || "—"}</div>
              </div>
            </div>

            {/* Selected Sales Orders Section */}
            <div className="so-based-order-section-title">Selected Sales Orders</div>
            {selectedOrders.length > 0 ? (
              <table className="so-based-order-preview-table so-based-order-table">
                <thead>
                  <tr>
                    <th>Sales Order No.</th>
                    <th>Validity</th>
                    <th>Material</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrders.map((orderNo, index) => {
                    const orderDetails = salesOrders.find(order => order.orderNo === orderNo);
                    return orderDetails ? (
                      <tr key={index}>
                        <td>{orderDetails.orderNo}</td>
                        <td>{orderDetails.validity}</td>
                        <td>{orderDetails.material}</td>
                        <td>{orderDetails.quantity}</td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            ) : (
              <div className="so-based-order-no-data">No sales orders selected</div>
            )}

            {/* Delivery and Allocation Section */}
            <div className="so-based-order-section-title">Delivery and Allocation</div>
            <div className="so-based-order-row">
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Auto Allocate To L1</Label>
                <div className="so-based-order-value">{values.autoAllocateTo || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Interval time for Allocating Vehicle</Label>
                <div className="so-based-order-value">{values.intervalTimeForAllocatingVehicle || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Interval time to reach plant</Label>
                <div className="so-based-order-value">{values.intervalTimeToReachPlant || "—"}</div>
              </div>
              <div className="so-based-order-form-group">
                <Label className="so-based-order-label">Grace Period to reach plant</Label>
                <div className="so-based-order-value">{values.gracePeriodToReachPlant || "—"}</div>
              </div>
            </div>

            <div className="so-based-order-button-container">
              <button
                type="button"
                className="so-based-order-button so-based-order-back-button"
                onClick={handleBackPage}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="so-based-order-button so-based-order-next-button"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? (
                  <span>
                    <i className="ri-loader-4-line spin me-1"></i> Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Finish Step */}
        {activeStep === 4 && (
          <div className="so-based-order-finish-container">
            <div className="so-based-order-finish-icon">
              {submitError ? (
                <div style={{ color: "#EF4444", fontSize: "80px" }}>
                  <i className="ri-error-warning-line"></i>
                </div>
              ) : (
                <lord-icon
                  src="https://cdn.lordicon.com/lupuorrc.json"
                  trigger="loop"
                  colors="primary:#0ab39c,secondary:#405189"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              )}
            </div>
            <h3 className={`so-based-order-finish-title ${submitError ? 'so-based-order-finish-title-error' : 'so-based-order-finish-title-success'}`}>
              {submitError 
                ? "Error submitting your bid" 
                : "Your SO Based Bid has been created!"}
            </h3>
            {submitError && (
              <p className="so-based-order-error-message">
                {submitError}
              </p>
            )}
            <button
              type="button"
              className="so-based-order-finish-button"
              onClick={handleBackToCreateBid}
            >
              Back to Create Bid
            </button>
          </div>
        )}
      </Form>

      {/* Show success modal */}
      {showSuccessModal && <SuccessModal />}
    </>
  );
};

export default SOBasedOrder;

