import React, { useState } from 'react';

/**
 * TransporterViewer Component
 * Shows a view icon that opens a popup displaying all selected transporters
 * 
 * @param {Array} selectedTransporters - Array of selected transporter names
 * @param {Function} onRemove - Optional callback when a transporter is removed from the list
 */
const TransporterViewer = ({ selectedTransporters = [], onRemove = null }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Toggle the popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Handle remove transporter from the list
  const handleRemoveTransporter = (transporter) => {
    if (onRemove) {
      onRemove(transporter);
    }
  };

  return (
    <>
      {/* View Icon Button */}
      <div 
        onClick={togglePopup}
        style={{ 
          marginLeft: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "38px",
          height: "38px",
          border: "1px solid #ced4da",
          borderRadius: "4px",
          backgroundColor: "#f8f9fa"
        }}
      >
        <i className="ri-eye-line" style={{ fontSize: "20px", color: "#4361ee" }}></i>
      </div>

      {/* Popup Modal to show all selected transporters */}
      {showPopup && (
        <div className="modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1050
        }}>
          <div className="modal-content" style={{
            width: "500px",
            maxWidth: "90%",
            backgroundColor: "#fff",
            borderRadius: "6px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh"
          }}>
            <div className="modal-header" style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              borderBottom: "1px solid #e0e0e0"
            }}>
              <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "500" }}>Selected Transporters</h4>
              <button onClick={togglePopup} style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                borderRadius: "50%"
              }}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <div className="modal-body" style={{
              padding: "20px",
              overflow: "auto",
            }}>
              {selectedTransporters.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  No transporters selected
                </div>
              ) : (
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px"
                }}>
                  {selectedTransporters.map((transporter, index) => (
                    <div 
                      key={index} 
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#e8f0fe",
                        border: "1px solid #4361ee",
                        borderRadius: "16px",
                        padding: "4px 12px",
                        margin: "4px",
                        fontSize: "13px",
                        color: "#333"
                      }}
                    >
                      {transporter}
                      {onRemove && (
                        <span 
                          style={{
                            marginLeft: "6px",
                            cursor: "pointer",
                            color: "#666",
                            fontSize: "14px"
                          }}
                          onClick={() => handleRemoveTransporter(transporter)}
                        >
                          <i className="ri-close-line"></i>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="modal-footer" style={{
              padding: "12px 20px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <button onClick={togglePopup} style={{
                padding: "8px 16px",
                backgroundColor: "#4361ee",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500"
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransporterViewer;