import React, { useState, useEffect, useMemo } from "react";
import { Modal, ModalHeader, ModalBody, Input, Button, Nav, NavItem, NavLink } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";

const SalesOrderModal = ({ isOpen, toggle, bidNo }) => {
  // Initialize column visibility from localStorage or defaults
  const getInitialColumnVisibility = () => {
    const savedState = localStorage.getItem('soModalColumnVisibility');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      // Tab 1 columns
      salesOrderNo: true,
      validityStartDate: true,
      validityEndDate: true,
      orderQty: true,
      remainingQty: true,
      orderType: true,
      
      // Tab 2 columns
      routeCode: true,
      routeDesc: true,
      shipToParty: true,
      shipToPartyName: true,
      shipToRegion: true,
      division: true,
      
      // Tab 3 columns
      blockedSolnd: true,
      cityDesc: true,
      countryDesc: true,
      distributionChannel: true
    };
  };

  // Get last active tab from localStorage or default
  const getInitialActiveTab = () => {
    const savedTab = localStorage.getItem('soModalActiveTab');
    return savedTab || "tab1";
  };

  const [salesOrderData1, setSalesOrderData1] = useState([]);
  const [salesOrderData2, setSalesOrderData2] = useState([]);
  const [salesOrderData3, setSalesOrderData3] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(getInitialActiveTab());
  const [filteredData1, setFilteredData1] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [filteredData3, setFilteredData3] = useState([]);
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState(getInitialColumnVisibility());

  // Save column visibility to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('soModalColumnVisibility', JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  // Save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('soModalActiveTab', activeTab);
  }, [activeTab]);

  // Load sales order data based on bid number
  useEffect(() => {
    if (bidNo) {
      // This would typically be an API call
      // Sample data for first tab - Original columns
      const data1 = [
        {
          id: 1,
          salesOrderNo: "SO23456",
          validityStartDate: "18/02/2025 01:00",
          validityEndDate: "10/02/2025 05:00",
          orderQty: "100 Tan",
          remainingQty: "80 Tan",
          orderType: "Ship"
        },
        {
          id: 2,
          salesOrderNo: "SO45734",
          validityStartDate: "18/02/2025 01:00",
          validityEndDate: "10/02/2025 05:00",
          orderQty: "200 Tan",
          remainingQty: "134 Tan",
          orderType: "Ship"
        },
        {
          id: 3,
          salesOrderNo: "SO89342",
          validityStartDate: "18/02/2025 01:00",
          validityEndDate: "10/02/2025 05:00",
          orderQty: "250 Tan",
          remainingQty: "125 Tan",
          orderType: "Ship"
        },
        {
          id: 4,
          salesOrderNo: "SO87344",
          validityStartDate: "18/02/2025 01:00",
          validityEndDate: "10/02/2025 05:00",
          orderQty: "243 Tan",
          remainingQty: "143 Tan",
          orderType: "Ship"
        },
        {
          id: 5,
          salesOrderNo: "SO87344",
          validityStartDate: "18/02/2025 01:00",
          validityEndDate: "10/02/2025 05:00",
          orderQty: "243 Tan",
          remainingQty: "143 Tan",
          orderType: "Ship"
        }
      ];
      setSalesOrderData1(data1);
      setFilteredData1(data1);

      // Sample data for second tab - Route details
      const data2 = [
        {
          id: 1,
          routeCode: "RN102",
          routeDesc: "N/A",
          shipToParty: "Ship1",
          shipToPartyName: "ship name 1",
          shipToRegion: "India",
          division: "N/A"
        },
        {
          id: 2,
          routeCode: "RN103",
          routeDesc: "N/A",
          shipToParty: "Ship2",
          shipToPartyName: "ship name 2",
          shipToRegion: "Malaysia",
          division: "N/A"
        },
        {
          id: 3,
          routeCode: "RN108",
          routeDesc: "N/A",
          shipToParty: "Ship3",
          shipToPartyName: "ship name 3",
          shipToRegion: "UAE",
          division: "N/A"
        },
        {
          id: 4,
          routeCode: "RN104",
          routeDesc: "N/A",
          shipToParty: "Ship4",
          shipToPartyName: "ship name 4",
          shipToRegion: "US",
          division: "N/A"
        },
        {
          id: 5,
          routeCode: "RN104",
          routeDesc: "N/A",
          shipToParty: "Ship4",
          shipToPartyName: "ship name 4",
          shipToRegion: "US",
          division: "N/A"
        }
      ];
      setSalesOrderData2(data2);
      setFilteredData2(data2);

      // Sample data for third tab - Order details
      const data3 = [
        {
          id: 1,
          orderType: "Ship",
          blockedSolnd: "SO23456",
          cityDesc: "Mumbai",
          countryDesc: "India",
          distributionChannel: "Road",
          routeCode: "RN102"
        },
        {
          id: 2,
          orderType: "Ship",
          blockedSolnd: "SO45734",
          cityDesc: "Delhi",
          countryDesc: "China",
          distributionChannel: "Ship",
          routeCode: "RN103"
        },
        {
          id: 3,
          orderType: "Ship",
          blockedSolnd: "SO89342",
          cityDesc: "Chennai",
          countryDesc: "UAE",
          distributionChannel: "Flight",
          routeCode: "RN108"
        },
        {
          id: 4,
          orderType: "Ship",
          blockedSolnd: "SO87344",
          cityDesc: "Lucknow",
          countryDesc: "Malaysia",
          distributionChannel: "Road",
          routeCode: "RN104"
        },
        {
          id: 5,
          orderType: "Ship",
          blockedSolnd: "SO87344",
          cityDesc: "Lucknow",
          countryDesc: "Malaysia",
          distributionChannel: "Road",
          routeCode: "RN104"
        }
      ];
      setSalesOrderData3(data3);
      setFilteredData3(data3);
    }
  }, [bidNo]);

  // Search functionality
  useEffect(() => {
    if (searchText) {
      // Filter data for each tab based on search text
      const filtered1 = salesOrderData1.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredData1(filtered1);
      
      const filtered2 = salesOrderData2.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredData2(filtered2);
      
      const filtered3 = salesOrderData3.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredData3(filtered3);
    } else {
      // If search text is empty, reset to original data
      setFilteredData1(salesOrderData1);
      setFilteredData2(salesOrderData2);
      setFilteredData3(salesOrderData3);
    }
  }, [searchText, salesOrderData1, salesOrderData2, salesOrderData3]);

  // Toggle column visibility
  const toggleColumnVisibility = (column) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  // Toggle all columns for the current tab
  const toggleAllColumns = () => {
    const allColumns = { ...columnVisibility };
    const currentTabColumns = getCurrentTabColumns().map(col => col.accessor);
    
    const allEnabled = currentTabColumns.every(col => columnVisibility[col]);
    
    currentTabColumns.forEach(col => {
      allColumns[col] = !allEnabled;
    });
    
    setColumnVisibility(allColumns);
  };

  // Get the current tab's column definitions
  const getCurrentTabColumns = () => {
    switch(activeTab) {
      case "tab1": return allColumns1;
      case "tab2": return allColumns2;
      case "tab3": return allColumns3;
      default: return allColumns1;
    }
  };

  // Get visible columns for current tab
  const getVisibleColumns = (tabColumns) => {
    return tabColumns.filter(col => columnVisibility[col.accessor]);
  };

  // Columns for first tab table - Original columns
  const allColumns1 = useMemo(
    () => [
      {
        Header: "Sales Order No.",
        accessor: "salesOrderNo"
      },
      {
        Header: "Validity Start Date",
        accessor: "validityStartDate"
      },
      {
        Header: "Validity End Date",
        accessor: "validityEndDate"
      },
      {
        Header: "Order Qty.",
        accessor: "orderQty"
      },
      {
        Header: "Remaining Qty.",
        accessor: "remainingQty"
      },
      {
        Header: "Order Type",
        accessor: "orderType"
      }
    ],
    []
  );

  // Columns for second tab table - Route details
  const allColumns2 = useMemo(
    () => [
      {
        Header: "Route Code",
        accessor: "routeCode"
      },
      {
        Header: "Route Desc.",
        accessor: "routeDesc"
      },
      {
        Header: "Ship to Party",
        accessor: "shipToParty"
      },
      {
        Header: "Ship to Party Name",
        accessor: "shipToPartyName"
      },
      {
        Header: "Ship to Region",
        accessor: "shipToRegion"
      },
      {
        Header: "Division",
        accessor: "division"
      }
    ],
    []
  );

  // Columns for third tab table - Order details
  const allColumns3 = useMemo(
    () => [
      {
        Header: "Order Type",
        accessor: "orderType"
      },
      {
        Header: "BlockedSolnd",
        accessor: "blockedSolnd"
      },
      {
        Header: "City Desc.",
        accessor: "cityDesc"
      },
      {
        Header: "Country Desc.",
        accessor: "countryDesc"
      },
      {
        Header: "Distribution Channel",
        accessor: "distributionChannel"
      },
      {
        Header: "Route Code",
        accessor: "routeCode"
      }
    ],
    []
  );

  // Get visible columns for current tab
  const columns1 = useMemo(() => getVisibleColumns(allColumns1), [allColumns1, columnVisibility]);
  const columns2 = useMemo(() => getVisibleColumns(allColumns2), [allColumns2, columnVisibility]);
  const columns3 = useMemo(() => getVisibleColumns(allColumns3), [allColumns3, columnVisibility]);

  // Toggle between tabs
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Toggle column filter visibility
  const toggleColumnFilter = () => {
    setShowColumnToggle(!showColumnToggle);
  };

  // Get current data based on active tab
  const getCurrentData = () => {
    switch(activeTab) {
      case "tab1": return filteredData1;
      case "tab2": return filteredData2;
      case "tab3": return filteredData3;
      default: return filteredData1;
    }
  };

  // Get current columns based on active tab
  const getCurrentColumns = () => {
    switch(activeTab) {
      case "tab1": return columns1;
      case "tab2": return columns2;
      case "tab3": return columns3;
      default: return columns1;
    }
  };

  // Check if all columns for current tab are visible
  const areAllColumnsVisible = () => {
    const currentTabColumns = getCurrentTabColumns().map(col => col.accessor);
    return currentTabColumns.every(col => columnVisibility[col]);
  };

  // Get column toggle UI based on the current tab
  const renderColumnToggleUI = () => {
    if (!showColumnToggle) return null;

    const currentColumns = getCurrentTabColumns();
    
    return (
      <div className="column-toggle-container p-3 mb-3 bg-light rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="toggle-title">Toggle Columns</div>
          <div className="toggle-all-container d-flex align-items-center">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                checked={areAllColumnsVisible()}
                onChange={toggleAllColumns}
                id="toggleAllColumns"
              />
              <label className="form-check-label ms-2" htmlFor="toggleAllColumns">
                Toggle All
              </label>
            </div>
          </div>
        </div>
        
        <div className="row">
          {currentColumns.map((column, index) => {
            // Create pairs of columns for layout
            if (index % 2 === 0) {
              const nextColumn = currentColumns[index + 1];
              return (
                <div className="row mb-2" key={index}>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={columnVisibility[column.accessor]}
                          onChange={() => toggleColumnVisibility(column.accessor)}
                          id={`toggle-${column.accessor}`}
                        />
                        <label className="form-check-label ms-2" htmlFor={`toggle-${column.accessor}`}>
                          {column.Header}
                        </label>
                      </div>
                    </div>
                  </div>
                  {nextColumn && (
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={columnVisibility[nextColumn.accessor]}
                            onChange={() => toggleColumnVisibility(nextColumn.accessor)}
                            id={`toggle-${nextColumn.accessor}`}
                          />
                          <label className="form-check-label ms-2" htmlFor={`toggle-${nextColumn.accessor}`}>
                            {nextColumn.Header}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="sales-order-modal" size="lg">
      <ModalHeader toggle={toggle} className="border-0">
        <div className="modal-title">SO Details: {bidNo}</div>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-between mb-3">
          <div className="search-filter-container">
            <Input
              type="search"
              className="form-control search-input"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div>
            <Button 
              className="filter-button" 
              onClick={toggleColumnFilter}
              color={showColumnToggle ? "primary" : "light"}
            >
              <i className="ri-filter-3-line"></i>
            </Button>
          </div>
        </div>
        
        {/* Column Toggle UI */}
        {renderColumnToggleUI()}
        
        {/* Tab navigation */}
        <Nav tabs className="mb-3 nav-tabs-custom">
          <NavItem>
            <NavLink
              className={activeTab === "tab1" ? "active" : ""}
              onClick={() => {toggleTab("tab1")}}
              style={{ cursor: 'pointer' }}
            >
              Sales Order
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "tab2" ? "active" : ""}
              onClick={() => {toggleTab("tab2")}}
              style={{ cursor: 'pointer' }}
            >
              Route Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "tab3" ? "active" : ""}
              onClick={() => {toggleTab("tab3")}}
              style={{ cursor: 'pointer' }}
            >
              Order Details
            </NavLink>
          </NavItem>
        </Nav>
        
        {/* Table */}
        <div className="table-responsive">
          <TableContainer
            columns={getCurrentColumns()}
            data={getCurrentData()}
            isGlobalFilter={false}
            isAddUserList={false}
            customPageSize={5}
            className="sales-order-table custom-header-css"
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SalesOrderModal;