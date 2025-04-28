import React, { useState, useEffect } from "react";
import { Form, Input, Label } from "reactstrap";
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './BulkOrder.css'; // Import the CSS file
import TransporterViewer from "./TransporterViewer/TransporterViewer";

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
          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        icon
      )}
    </div>
  );
};

const BulkOrder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showTransporterDropdown, setShowTransporterDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectAllTransporters, setSelectAllTransporters] = useState(false);
  const [showTransporterModal, setShowTransporterModal] = useState(false);
  // Add validation state
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    // Bid Details
    bidStartingFrom: "",
    bidStartTo: "",
    city: "",
    ceilingAmount: "",
    intervalAmount: "",
    uom: "",
    lastMinutesExtension: "",

    // Material and Transporter
    multiMaterial: "",
    material: "",
    quantity: "",
    extensionQuantity: "",
    displayToTransporter: "",
    selectTransporter: [],

    // Delivery and Allocation
    fromLocation: "",
    toLocation: "",
    route: "",
    autoAllocateTo: "",
    intervalTimeForAllocatingVehicle: "",
    intervalTimeToReachPlant: "",
    gracePeriodToReachPlant: ""
  });

  // Updated handleInputChange to clear errors when input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));

    // Clear the error for this field if it exists
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTransporterSelect = (transporter) => {
    if (!values.selectTransporter.includes(transporter)) {
      setValues(prevValues => ({
        ...prevValues,
        selectTransporter: [...prevValues.selectTransporter, transporter]
      }));
    }
  };

  const handleRemoveTransporter = (transporter, e) => {
    if (e) e.stopPropagation();
    setValues(prevValues => ({
      ...prevValues,
      selectTransporter: prevValues.selectTransporter.filter(t => t !== transporter)
    }));
  };



  const handleSelectAllTransporters = (e) => {
    const isChecked = e.target.checked;
    setSelectAllTransporters(isChecked);

    if (isChecked) {
      // Select all transporters that match the current search filter
      const filteredNames = filteredTransporters.map(t => t.name);
      // Combine previously selected transporters that aren't in the current filter with newly selected ones
      const previouslySelected = values.selectTransporter.filter(
        name => !filteredTransporters.some(t => t.name === name)
      );
      setValues(prevValues => ({
        ...prevValues,
        selectTransporter: [...new Set([...previouslySelected, ...filteredNames])]
      }));
    } else {
      // Deselect all transporters that match the current search filter
      const filteredNames = filteredTransporters.map(t => t.name);
      setValues(prevValues => ({
        ...prevValues,
        selectTransporter: prevValues.selectTransporter.filter(
          name => !filteredNames.includes(name)
        )
      }));
    }
  };








  // Helper function for authentication headers
  const getAuthHeaders = () => {
    const username = process.env.REACT_APP_API_USER_NAME || 'amazin';
    const password = process.env.REACT_APP_API_PASSWORD || 'TE@M-W@RK';
    const base64Auth = btoa(`${username}:${password}`);

    return {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${base64Auth}`,
      'Accept': 'application/json'
    };
  };

  // Function to map form values to API payload
  const mapFormValuesToPayload = () => {
    // Format dates as needed
    const formatDate = (dateString) => {
      if (!dateString) return "";
      // Assuming dateString is in yyyy-MM-dd format
      return dateString;
    };

    return {
      transporterCode: values.selectTransporter.join(","),
      ceilingPrice: parseFloat(values.ceilingAmount) || 0,
      uom: values.uom,
      bidFrom: formatDate(values.bidStartingFrom),
      bidTo: formatDate(values.bidStartTo),
      // lastTimeExtension: values.lastMinutesExtension || "00:00:00",
      lastTimeExtension: 5,
      extentionQuantity: parseInt(values.extensionQuantity) || 0,
      bidUnit: 1,
      addOn: "EXTRA_COST",
      intervalAmount: parseFloat(values.intervalAmount) || 0,
      noOfInput: 3,
      // intervalAllocate: values.intervalTimeForAllocatingVehicle || "",
      intervalAllocate: 1,
      // intervalReach: values.intervalTimeToReachPlant || "",
      intervalReach: 1,
      // gracePeriod: values.gracePeriodToReachPlant || "",
      gracePeriod: 1,
      status: "A",
      autoAllocation: values.autoAllocateTo === "Yes" ? 1 : 0,
      bid: 1,
      bidType: "STANDARD",
      biddingOrderNo: `ORD-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      route: parseFloat(values.route) || 0,
      multiMaterial: values.multiMaterial === "Yes" ? 1 : 0,
      city: values.city,
      material: values.material,
      quantity: parseInt(values.quantity) || 0,
      extentionQty: parseInt(values.extensionQuantity) || 0,
      autoAllocationSalesOrder: 1,
      fromLocation: values.fromLocation,
      toLocation: values.toLocation
    };
  };

  // Function to submit the form data to the API
  const submitFormData = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = mapFormValuesToPayload();
      console.log("Submitting payload:", payload);

      const response = await fetch(`${process.env.REACT_APP_LOCAL_URL_8082}/biddingMaster`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API responded with status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Show success modal
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message);
      alert(`Failed to submit form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated handleSubmit with validation
  // Add this updated handleSubmit function to make validation work
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);

    // If we're at the Delivery and Allocation step (index 2)
    if (activeStep === 2) {
      // Initialize validation errors object
      const validationErrors = {};

      // Check required fields for Delivery and Allocation step
      if (!values.fromLocation || values.fromLocation === "Select") {
        validationErrors.fromLocation = "Please select from location";
      }

      if (!values.toLocation || values.toLocation === "Select") {
        validationErrors.toLocation = "Please select to location";
      }

      if (!values.route || values.route === "Select") {
        validationErrors.route = "Please select a route";
      }

      if (!values.intervalTimeForAllocatingVehicle) {
        validationErrors.intervalTimeForAllocatingVehicle = "Please select a date";
      }

      if (!values.intervalTimeToReachPlant) {
        validationErrors.intervalTimeToReachPlant = "Please select a date";
      }

      if (!values.gracePeriodToReachPlant) {
        validationErrors.gracePeriodToReachPlant = "Please select a date";
      }

      // Update the errors state
      setErrors(validationErrors);

      // If there are validation errors, don't proceed
      if (Object.keys(validationErrors).length > 0) {
        console.log("Validation errors:", validationErrors);
        return;
      }

      // If validation passes, proceed to Preview
      setActiveStep(3); // This will be Preview
    } else if (activeStep === 3) {
      // If we're at Preview, submit to API
      await submitFormData();
      // After successful submission, go to Finish
      if (!submitError) {
        setActiveStep(4);
      }
    } else {
      // For other steps, just go to next step
      setActiveStep(prevStep => Math.min(prevStep + 1, steps.length));
    }
  };

  const handleBackPage = () => {
    // Navigate to previous step
    setActiveStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const steps = [
    'Bid Details',
    'Material and Transporter',
    'Delivery and Allocation',
    'Finish'
  ];

  const locationOptions = [
    "Select",
    "Location A",
    "Location B",
    "Location C",
    "Location D",
    "Gurugram",
    "Mumbai"
  ];

  const routeOptions = [
    "Select",
    "Route 1",
    "Route 2",
    "Route 3",
    "RN9823"
  ];

  const autoAllocateToOptions = [
    "Select",
    "Yes",
    "No"
  ];

  const cityOptions = [
    "Select city",
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Gurugram"
  ];

  const uomOptions = [
    "Select",
    "Metric Ton",
    "Kilogram",
    "Pound",
    "Liter",
    "Yes"
  ];

  const multiMaterialOptions = [
    "Select",
    "Yes",
    "No"
  ];

  const materialOptions = [
    "Select",
    "Steel",
    "Cement",
    "Wood",
    "Copper",
    "Iron"
  ];

  const transporterOptions = [
    { id: "0916005637", name: "Jaya Roadways" },
    { id: "0916006094", name: "RAJ ENTERPRISE" },
    { id: "0916003431", name: "R & B Transport" },
    { id: "0916005708", name: "Jaya Roadways" },
    { id: "0916005858", name: "Laxmi Roadways" }
  ];

  const displayToTransporterOptions = [
    "Select",
    "All",
    "Selected Transporters"
  ];

  const handleBackToCreateBid = () => {
    // Reset form and go back to first step
    setActiveStep(0);
    setShowSuccessModal(false);
    setValues({
      bidStartingFrom: "",
      bidStartTo: "",
      city: "",
      ceilingAmount: "",
      intervalAmount: "",
      uom: "",
      lastMinutesExtension: "",
      multiMaterial: "",
      material: "",
      quantity: "",
      extensionQuantity: "",
      displayToTransporter: "",
      selectTransporter: [],
      fromLocation: "",
      toLocation: "",
      route: "",
      autoAllocateTo: "",
      intervalTimeForAllocatingVehicle: "",
      intervalTimeToReachPlant: "",
      gracePeriodToReachPlant: ""
    });
    // Clear any validation errors
    setErrors({});
  };

  // Filter transporters based on search term
  const filteredTransporters = transporterOptions.filter(
    t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.includes(searchTerm)
  );

  // Check if all filtered transporters are selected
  const areAllFilteredTransportersSelected = () => {
    return filteredTransporters.every(t =>
      values.selectTransporter.includes(t.name)
    );
  };

  useEffect(() => {
    setSelectAllTransporters(areAllFilteredTransportersSelected());
  }, [searchTerm, values.selectTransporter]);

  // Success Modal
  const SuccessModal = () => (
    <div className="bulk-order-modal-overlay">
      <div className="bulk-order-modal-content">
        <div className="bulk-order-modal-icon">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            colors="primary:#0ab39c,secondary:#405189"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
        </div>
        <h3 className="bulk-order-modal-title">
          Your Bid B930 has been created!
        </h3>
        <button
          type="button"
          className="bulk-order-modal-button"
          onClick={handleBackToCreateBid}
        >
          Back to Create Bid
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Material UI Stepper with custom connector for green lines */}
      <div className="bulk-order-stepper-container">
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
          <div className="bulk-order-container">
            {/* First row: 4 fields */}
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Bid Starting From <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="bidStartingFrom"
                    value={values.bidStartingFrom}
                    onChange={handleInputChange}
                    required
                    className="bulk-order-input"
                    style={{ color: "#000" }}
                  />
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Bid Start To  <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="date"
                    name="bidStartTo"
                    value={values.bidStartTo}
                    onChange={handleInputChange}
                    className="bulk-order-input"
                    style={{ color: "#000" }}
                  />
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  City
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="city"
                    value={values.city}
                    onChange={handleInputChange}
                    required
                    className="bulk-order-select"
                    style={{ color: "#000" }}
                  >
                    {cityOptions.map((city, index) => (
                      <option key={index} value={city} style={{ color: "#000" }}>
                        {city}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Ceiling Amount
                </Label>
                <Input
                  type="number"
                  placeholder="Add Amount"
                  name="ceilingAmount"
                  value={values.ceilingAmount}
                  onChange={handleInputChange}
                  required
                  className="bulk-order-input"
                  style={{ color: "#000" }}
                />
              </div>
            </div>

            {/* Second row: 3 fields */}
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Interval Amount <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="Add Amount"
                  name="intervalAmount"
                  value={values.intervalAmount}
                  onChange={handleInputChange}
                  required
                  className="bulk-order-input"
                  style={{ color: "#000" }}
                />
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  UOM <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="uom"
                    value={values.uom}
                    onChange={handleInputChange}
                    required
                    className="bulk-order-select"
                    style={{ color: "#000" }}
                  >
                    {uomOptions.map((uom, index) => (
                      <option key={index} value={uom} style={{ color: "#000" }}>
                        {uom}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Last Minutes Extension
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="number" // Changed from "text" to "number"
                    placeholder="Enter minutes"
                    min="0" // Ensure positive integers only
                    step="1" // Only allow whole numbers
                    name="lastMinutesExtension"
                    value={values.lastMinutesExtension}
                    onChange={(e) => {
                      // Only allow integer values
                      const value = e.target.value;
                      if (value === '' || /^[0-9]\d*$/.test(value)) {
                        handleInputChange(e);
                      }
                    }}
                    required
                    className="bulk-order-input"
                    style={{ color: "#000" }}
                  />
                  <span style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none"
                  }}>
                    <i className="ri-time-line"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="bulk-order-button-container">
              <button
                type="button"
                className={`bulk-order-button bulk-order-back-button ${activeStep === 0 ? 'disabled' : ''}`}
                onClick={handleBackPage}
                disabled={activeStep === 0}
                style={{ opacity: activeStep === 0 ? "0.6" : "1" }}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="bulk-order-button bulk-order-next-button"
              >
                Save & Next <i className="ri-arrow-right-line ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* Material and Transporter Step */}
        {activeStep === 1 && (
          <div className="bulk-order-container">
            {/* First row: 4 fields */}
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Multi Material <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="multiMaterial"
                    disabled
                    value={values.multiMaterial}
                    onChange={handleInputChange}
                    required
                    className="bulk-order-select"
                    style={{ color: "#000" }}
                  >
                    {multiMaterialOptions.map((option, index) => (
                      <option key={index} value={option} style={{ color: "#000" }}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Material <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="material"
                    value={values.material}
                    onChange={handleInputChange}
                    required
                    className="bulk-order-select"
                    style={{ color: "#000" }}
                  >
                    {materialOptions.map((option, index) => (
                      <option key={index} value={option} style={{ color: "#000" }}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Quantity <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Add Quantity"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleInputChange}
                  required
                  className="bulk-order-input"
                  style={{ color: "#000" }}
                />
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Extension Quantity <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Add Quantity"
                  name="extensionQuantity"
                  value={values.extensionQuantity}
                  onChange={handleInputChange}
                  required
                  className="bulk-order-input"
                  style={{ color: "#000" }}
                />
              </div>
            </div>

            {/* Second row: 2 fields */}
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Display To Transporter <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="displayToTransporter"
                    value={values.displayToTransporter}
                    onChange={handleInputChange}
                    required
                    className="bulk-order-select"
                    style={{ color: "#000" }}
                  >
                    {displayToTransporterOptions.map((option, index) => (
                      <option key={index} value={option} style={{ color: "#000" }}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Select Transporter <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <div
                      className="bulk-order-transporter-selector"
                      onClick={() => setShowTransporterDropdown(!showTransporterDropdown)}
                      style={{
                        height: "38px",
                        color: "#000",
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        padding: "0.375rem 0.75rem",
                        backgroundColor: "#fff"
                      }}
                    >
                      <span className="bulk-order-transporter-selector-placeholder" style={{ color: "#000" }}>
                        {values.selectTransporter.length > 0
                          ? `${values.selectTransporter.length} Selected`
                          : 'Select'}
                      </span>
                      <span style={{ marginLeft: "auto" }}>
                        <i className="ri-arrow-down-s-line"></i>
                      </span>
                    </div>

                    {/* Existing dropdown code */}
                    {showTransporterDropdown && (
                      <div className="bulk-order-dropdown" style={{
                        position: "absolute",
                        width: "100%",
                        zIndex: 10,
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        marginTop: "4px",
                        maxHeight: "300px",
                        overflowY: "auto"
                      }}>
                        {/* Search header with clean styling */}
                        <div className="bulk-order-dropdown-header" style={{
                          padding: "8px",
                          backgroundColor: "#fff",
                          borderBottom: "1px solid #ddd"
                        }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ flex: "0 0 40px", display: "flex", justifyContent: "center" }}>
                              <input
                                type="checkbox"
                                checked={selectAllTransporters}
                                onChange={handleSelectAllTransporters}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  cursor: "pointer"
                                }}
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="bulk-order-dropdown-search"
                              style={{
                                flex: 1,
                                padding: "8px 12px",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                color: "#000",
                                fontSize: "14px"
                              }}
                            />
                          </div>
                        </div>

                        {/* Transporter list items */}
                        <div className="bulk-order-dropdown-content">
                          {filteredTransporters.map((transporter, index) => (
                            <div
                              key={index}
                              className="bulk-order-dropdown-item"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px 8px",
                                borderBottom: "1px solid #eee",
                                color: "#000",
                                cursor: "pointer"
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!values.selectTransporter.includes(transporter.name)) {
                                  handleTransporterSelect(transporter.name);
                                } else {
                                  handleRemoveTransporter(transporter.name, e);
                                }
                              }}
                            >
                              <div style={{ flex: "0 0 40px", display: "flex", justifyContent: "center" }}>
                                <input
                                  type="checkbox"
                                  checked={values.selectTransporter.includes(transporter.name)}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    if (e.target.checked) {
                                      handleTransporterSelect(transporter.name);
                                    } else {
                                      handleRemoveTransporter(transporter.name, e);
                                    }
                                  }}
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer"
                                  }}
                                />
                              </div>
                              <div style={{
                                flex: "0 0 120px",
                                paddingRight: "15px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "14px"
                              }}>
                                {transporter.id}
                              </div>
                              <div style={{
                                flex: 1,
                                fontSize: "14px"
                              }}>
                                {transporter.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add the TransporterViewer component if there are any selected transporters */}
                  {values.selectTransporter.length > 0 && (
                    <TransporterViewer
                      selectedTransporters={values.selectTransporter}
                      onRemove={(transporter) => {
                        handleRemoveTransporter(transporter, new Event('click'));
                      }}
                    />
                  )}
                </div>
              </div>
            </div>




            <div className="bulk-order-button-container">
              <button
                type="button"
                className="bulk-order-button bulk-order-back-button"
                onClick={handleBackPage}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="bulk-order-button bulk-order-next-button"
                style={{
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px"
                }}
              >
                Save & Next <i className="ri-arrow-right-line ms-1" style={{ marginLeft: "8px" }}></i>
              </button>
            </div>
          </div>
        )}

        {/* Delivery and Allocation Step with Validation Added */}
        {/* Time selector fields for Delivery and Allocation step */}

        {activeStep === 2 && (
          <div className="bulk-order-container">
            {/* First row: 4 fields */}
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  From Location <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="fromLocation"
                    value={values.fromLocation}
                    onChange={handleInputChange}
                    required
                    className={`bulk-order-select ${errors.fromLocation ? "is-invalid" : ""}`}
                    style={{
                      color: "#000",
                      borderColor: errors.fromLocation ? "#dc3545" : "",
                      borderWidth: errors.fromLocation ? "2px" : ""
                    }}
                  >
                    {locationOptions.map((location, index) => (
                      <option key={index} value={location} style={{ color: "#000" }}>
                        {location}
                      </option>
                    ))}
                  </Input>
                  {errors.fromLocation && (
                    <div className="invalid-feedback" style={{ display: "block", color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
                      {errors.fromLocation}
                    </div>
                  )}
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  To Location <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="toLocation"
                    value={values.toLocation}
                    onChange={handleInputChange}
                    required
                    className={`bulk-order-select ${errors.toLocation ? "is-invalid" : ""}`}
                    style={{
                      color: "#000",
                      borderColor: errors.toLocation ? "#dc3545" : "",
                      borderWidth: errors.toLocation ? "2px" : ""
                    }}
                  >
                    {locationOptions.map((location, index) => (
                      <option key={index} value={location} style={{ color: "#000" }}>
                        {location}
                      </option>
                    ))}
                  </Input>
                  {errors.toLocation && (
                    <div className="invalid-feedback" style={{ display: "block", color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
                      {errors.toLocation}
                    </div>
                  )}
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Route <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="route"
                    value={values.route}
                    onChange={handleInputChange}
                    required
                    className={`bulk-order-select ${errors.route ? "is-invalid" : ""}`}
                    style={{
                      color: "#000",
                      borderColor: errors.route ? "#dc3545" : "",
                      borderWidth: errors.route ? "2px" : ""
                    }}
                  >
                    {routeOptions.map((route, index) => (
                      <option key={index} value={route} style={{ color: "#000" }}>
                        {route}
                      </option>
                    ))}
                  </Input>
                  {errors.route && (
                    <div className="invalid-feedback" style={{ display: "block", color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
                      {errors.route}
                    </div>
                  )}
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Auto Allocate To L1
                </Label>
                <div style={{ position: "relative" }}>
                  <Input
                    type="select"
                    name="autoAllocateTo"
                    value={values.autoAllocateTo}
                    onChange={handleInputChange}
                    className="bulk-order-select"
                    style={{ color: "#000" }}
                  >
                    {autoAllocateToOptions.map((option, index) => (
                      <option key={index} value={option} style={{ color: "#000" }}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>
            </div>


            {/* Second row: 3 fields with TIME inputs - with BLACK placeholder text */}
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Interval time for Allocating Vehicle <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: errors.intervalTimeForAllocatingVehicle ? "2px solid #dc3545" : "1px solid #ced4da",
                    borderRadius: "4px",
                    backgroundColor: "#fff"
                  }}>
                    <Input
                      type="number" // Changed from "text" to "number"
                      placeholder="Select Time"
                      min="0" // Ensure positive integers only
                      step="1" // Only allow whole numbers
                      name="intervalTimeForAllocatingVehicle"
                      value={values.intervalTimeForAllocatingVehicle}
                      onChange={(e) => {
                        // Only allow integer values
                        const value = e.target.value;
                        if (value === '' || /^[0-9]\d*$/.test(value)) {
                          handleInputChange(e);
                        }
                      }}
                      required
                      className={`bulk-order-input black-placeholder ${errors.intervalTimeForAllocatingVehicle ? "is-invalid" : ""}`}
                      style={{
                        color: "#000",
                        border: "none",
                        boxShadow: "none",
                        flex: 1
                      }}
                      innerRef={(input) => {
                        if (input) {
                          input.style.setProperty('--placeholderColor', '#000');
                        }
                      }}
                    />
                    <div style={{
                      padding: "0 10px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer"
                    }}>
                      <i className="ri-time-line" style={{ color: "#6c757d" }}></i>
                    </div>
                  </div>
                  {errors.intervalTimeForAllocatingVehicle && (
                    <div className="invalid-feedback" style={{ display: "block", color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
                      {errors.intervalTimeForAllocatingVehicle}
                    </div>
                  )}
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Interval time for to reach plant <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: errors.intervalTimeToReachPlant ? "2px solid #dc3545" : "1px solid #ced4da",
                    borderRadius: "4px",
                    backgroundColor: "#fff"
                  }}>
                    <Input
                      type="number" // Changed from "text" to "number"
                      placeholder="Select Time"
                      min="0" // Ensure positive integers only
                      step="1" // Only allow whole numbers
                      name="intervalTimeToReachPlant"
                      value={values.intervalTimeToReachPlant}
                      onChange={(e) => {
                        // Only allow integer values
                        const value = e.target.value;
                        if (value === '' || /^[0-9]\d*$/.test(value)) {
                          handleInputChange(e);
                        }
                      }}
                      required
                      className={`bulk-order-input black-placeholder ${errors.intervalTimeToReachPlant ? "is-invalid" : ""}`}
                      style={{
                        color: "#000",
                        border: "none",
                        boxShadow: "none",
                        flex: 1
                      }}
                      innerRef={(input) => {
                        if (input) {
                          input.style.setProperty('--placeholderColor', '#000');
                        }
                      }}
                    />
                    <div style={{
                      padding: "0 10px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer"
                    }}>
                      <i className="ri-time-line" style={{ color: "#6c757d" }}></i>
                    </div>
                  </div>
                  {errors.intervalTimeToReachPlant && (
                    <div className="invalid-feedback" style={{ display: "block", color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
                      {errors.intervalTimeToReachPlant}
                    </div>
                  )}
                </div>
              </div>

              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">
                  Grace Period to reach plant <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: errors.gracePeriodToReachPlant ? "2px solid #dc3545" : "1px solid #ced4da",
                    borderRadius: "4px",
                    backgroundColor: "#fff"
                  }}>
                    <Input
                      type="number" // Changed from "text" to "number"
                      placeholder="Select Time"
                      min="0" // Ensure positive integers only
                      step="1" // Only allow whole numbers
                      name="gracePeriodToReachPlant"
                      value={values.gracePeriodToReachPlant}
                      onChange={(e) => {
                        // Only allow integer values
                        const value = e.target.value;
                        if (value === '' || /^[0-9]\d*$/.test(value)) {
                          handleInputChange(e);
                        }
                      }}
                      required
                      className={`bulk-order-input black-placeholder ${errors.gracePeriodToReachPlant ? "is-invalid" : ""}`}
                      style={{
                        color: "#000",
                        border: "none",
                        boxShadow: "none",
                        flex: 1
                      }}
                      innerRef={(input) => {
                        if (input) {
                          input.style.setProperty('--placeholderColor', '#000');
                        }
                      }}
                    />
                    <div style={{
                      padding: "0 10px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer"
                    }}>
                      <i className="ri-time-line" style={{ color: "#6c757d" }}></i>
                    </div>
                  </div>
                  {errors.gracePeriodToReachPlant && (
                    <div className="invalid-feedback" style={{ display: "block", color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
                      {errors.gracePeriodToReachPlant}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bulk-order-button-container">
              <button
                type="button"
                className="bulk-order-button bulk-order-back-button"
                onClick={handleBackPage}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="bulk-order-button bulk-order-next-button"
              >
                Save & Next <i className="ri-arrow-right-line ms-1"></i>
              </button>
            </div>
          </div>
        )}
        {/* Preview Step (not in stepper but comes after Delivery and Allocation) */}
        {activeStep === 3 && (
          <div className="bulk-order-container">
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
              Review your bid details
            </h3>

            {/* Bid Details Section */}
            <div className="bulk-order-section-title">Bid Details</div>
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Bid Starting From</Label>
                <div className="bulk-order-value-text">{values.bidStartingFrom || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Bid Start TO</Label>
                <div className="bulk-order-value-text">{values.bidStartTo || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">City</Label>
                <div className="bulk-order-value-text">{values.city || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Ceiling Amount</Label>
                <div className="bulk-order-value-text">{values.ceilingAmount || "—"}</div>
              </div>
            </div>
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Interval Amount</Label>
                <div className="bulk-order-value-text">{values.intervalAmount || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">UOM</Label>
                <div className="bulk-order-value-text">{values.uom || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Last Minutes Extension</Label>
                <div className="bulk-order-value-text">{values.lastMinutesExtension || "—"}</div>
              </div>
            </div>

            {/* Material and Transporter Section */}
            <div className="bulk-order-section-title">Material and Transporter</div>
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Multi Material</Label>
                <div className="bulk-order-value-text">{values.multiMaterial || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Material</Label>
                <div className="bulk-order-value-text">{values.material || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Quantity</Label>
                <div className="bulk-order-value-text">{values.quantity || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Extension Quantity</Label>
                <div className="bulk-order-value-text">{values.extensionQuantity || "—"}</div>
              </div>
            </div>
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Display To Transporter</Label>
                <div className="bulk-order-value-text">{values.displayToTransporter || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Select Transporter</Label>
                <div className="bulk-order-value-text">
                  {values.selectTransporter.length > 0 ? (
                    values.selectTransporter.map((transporter, index) => (
                      <span key={index} className="bulk-order-tag">
                        {transporter}
                      </span>
                    ))
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </div>

            {/* Delivery and Allocation Section */}
            <div className="bulk-order-section-title">Delivery and Allocation</div>
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">From Location</Label>
                <div className="bulk-order-value-text">{values.fromLocation || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">To Location</Label>
                <div className="bulk-order-value-text">{values.toLocation || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Route</Label>
                <div className="bulk-order-value-text">{values.route || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Auto Allocate To L1</Label>
                <div className="bulk-order-value-text">{values.autoAllocateTo || "—"}</div>
              </div>
            </div>
            <div className="bulk-order-row">
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Interval time for Allocating Vehicle</Label>
                <div className="bulk-order-value-text">{values.intervalTimeForAllocatingVehicle || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Interval time to reach plant</Label>
                <div className="bulk-order-value-text">{values.intervalTimeToReachPlant || "—"}</div>
              </div>
              <div className="bulk-order-form-group">
                <Label className="bulk-order-label">Grace Period to reach plant</Label>
                <div className="bulk-order-value-text">{values.gracePeriodToReachPlant || "—"}</div>
              </div>
            </div>

            <div className="bulk-order-button-container">
              <button
                type="button"
                className="bulk-order-button bulk-order-back-button"
                onClick={handleBackPage}
              >
                <i className="ri-arrow-left-line me-1"></i> Back
              </button>
              <button
                type="submit"
                className="bulk-order-button bulk-order-submit-button"
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

        {/* Finish Step - This is shown in the stepper as step 4 */}
        {activeStep === 4 && (
          <div className="bulk-order-finish-container">
            <div className="bulk-order-finish-icon">
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
            <h3 className={`bulk-order-finish-title ${submitError ? 'bulk-order-finish-title-error' : 'bulk-order-finish-title-success'}`}>
              {submitError
                ? "Error submitting your bid"
                : "Your Bid B930 has been created!"}
            </h3>
            {submitError && (
              <p className="bulk-order-error-message">
                {submitError}
              </p>
            )}
            <button
              type="button"
              className="bulk-order-finish-button"
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

export default BulkOrder;



