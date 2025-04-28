// import React, { useState } from "react";
// import { Modal, ModalHeader, ModalBody, Input, Button } from "reactstrap";
// import TableContainer from "../../../../../Components/Common/TableContainer";
// import "./viewModal.css";

// const BidViewModal = ({ isOpen, toggle, soNumber }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeTab, setActiveTab] = useState(1); // 1 for first table, 2 for second table
//     const itemsPerPage = 5;
    
//     // Sample data for first table (Image 1)
//     const salesOrderData = [
//         {
//             id: 1,
//             salesOrderNo: "SO23456",
//             validityStartDate: "18/02/2025 01:00",
//             validityEndDate: "10/02/2025 05:00",
//             orderQty: "100 Tan",
//             remainingQty: "80 Tan",
//             orderType: "Ship"
//         },
//         {
//             id: 2,
//             salesOrderNo: "SO45734",
//             validityStartDate: "18/02/2025 01:00",
//             validityEndDate: "10/02/2025 05:00",
//             orderQty: "200 Tan",
//             remainingQty: "134 Tan",
//             orderType: "Ship"
//         },
//         {
//             id: 3,
//             salesOrderNo: "SO89342",
//             validityStartDate: "18/02/2025 01:00",
//             validityEndDate: "10/02/2025 05:00",
//             orderQty: "250 Tan",
//             remainingQty: "125 Tan",
//             orderType: "Ship"
//         },
//         {
//             id: 4,
//             salesOrderNo: "SO87344",
//             validityStartDate: "18/02/2025 01:00",
//             validityEndDate: "10/02/2025 05:00",
//             orderQty: "243 Tan",
//             remainingQty: "143 Tan",
//             orderType: "Ship"
//         },
//         {
//             id: 5,
//             salesOrderNo: "SO87344",
//             validityStartDate: "18/02/2025 01:00",
//             validityEndDate: "10/02/2025 05:00",
//             orderQty: "243 Tan",
//             remainingQty: "143 Tan",
//             orderType: "Ship"
//         }
//     ];

//     // Sample data for second table (Image 2)
//     const orderDetailsData = [
//         {
//             id: 1,
//             orderType: "Ship",
//             blockedSoldId: "SO23456",
//             cityDesc: "Mumbai",
//             countryDesc: "India",
//             distributionChannel: "Road",
//             routeCode: "RN102"
//         },
//         {
//             id: 2,
//             orderType: "Ship",
//             blockedSoldId: "SO45734",
//             cityDesc: "Delhi",
//             countryDesc: "China",
//             distributionChannel: "Ship",
//             routeCode: "RN103"
//         },
//         {
//             id: 3,
//             orderType: "Ship",
//             blockedSoldId: "SO89342",
//             cityDesc: "Chennai",
//             countryDesc: "UAE",
//             distributionChannel: "Flight",
//             routeCode: "RN108"
//         },
//         {
//             id: 4,
//             orderType: "Ship",
//             blockedSoldId: "SO87344",
//             cityDesc: "Lucknow",
//             countryDesc: "Malaysia",
//             distributionChannel: "Road",
//             routeCode: "RN104"
//         },
//         {
//             id: 5,
//             orderType: "Ship",
//             blockedSoldId: "SO87344",
//             cityDesc: "Lucknow",
//             countryDesc: "Malaysia",
//             distributionChannel: "Road",
//             routeCode: "RN104"
//         }
//     ];

//     // Define columns for the first table
//     const salesOrderColumns = [
//         {
//             Header: "Sales Order No.",
//             accessor: "salesOrderNo",
//         },
//         {
//             Header: "Validity Start Date",
//             accessor: "validityStartDate",
//         },
//         {
//             Header: "Validity End Date",
//             accessor: "validityEndDate",
//         },
//         {
//             Header: "Order Qty.",
//             accessor: "orderQty",
//         },
//         {
//             Header: "Remaining Qty.",
//             accessor: "remainingQty",
//         },
//         {
//             Header: "Order Type",
//             accessor: "orderType",
//         }
//     ];

//     // Define columns for the second table
//     const orderDetailsColumns = [
//         {
//             Header: "Order Type",
//             accessor: "orderType",
//         },
//         {
//             Header: "Blocked/Solnd",
//             accessor: "blockedSoldId",
//         },
//         {
//             Header: "City Desc.",
//             accessor: "cityDesc",
//         },
//         {
//             Header: "Country Desc.",
//             accessor: "countryDesc",
//         },
//         {
//             Header: "Distribution Channel",
//             accessor: "distributionChannel",
//         },
//         {
//             Header: "Route Code",
//             accessor: "routeCode",
//         }
//     ];

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1); // Reset to first page when searching
//     };

//     // Handle page change
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     // Handle tab change
//     const handleTabChange = (tabIndex) => {
//         setActiveTab(tabIndex);
//         setCurrentPage(1); // Reset to first page when changing tabs
//         setSearchTerm(""); // Clear search when changing tabs
//     };

//     // Get the total number of results
//     const totalResults = 20; // Example static value
//     const totalPages = 4; // Example static value

//     // Get the active data and columns based on current tab
//     const activeData = activeTab === 1 ? salesOrderData : orderDetailsData;
//     const activeColumns = activeTab === 1 ? salesOrderColumns : orderDetailsColumns;

//     // Filter data based on search term
//     const filteredData = activeData.filter(item => 
//         Object.values(item).some(value => 
//             value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     return (
//         <Modal isOpen={isOpen} toggle={toggle} centered size="xl" className="so-view-modal">
//             <ModalHeader toggle={toggle} className="modal-title-header">
//                 SO Details: {soNumber}
//                 <button type="button" className="close" onClick={toggle}>
//                     <span aria-hidden="true">&times;</span>
//                 </button>
//             </ModalHeader>
//             <ModalBody className="p-0">
//                 {/* Search bar */}
//                 <div className="p-3 d-flex justify-content-between align-items-center">
//                     <div className="tab-buttons">
//                         <Button 
//                             color={activeTab === 1 ? "primary" : "light"}
//                             onClick={() => handleTabChange(1)}
//                             className="me-2"
//                         >
//                             Sales Order Details
//                         </Button>
//                         <Button 
//                             color={activeTab === 2 ? "primary" : "light"}
//                             onClick={() => handleTabChange(2)}
//                         >
//                             Order Details
//                         </Button>
//                     </div>
//                     <div className="search-box" style={{ width: "250px" }}>
//                         <Input
//                             type="search"
//                             placeholder="Search"
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             className="form-control"
//                         />
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="table-responsive">
//                     <TableContainer
//                         columns={activeColumns}
//                         data={filteredData}
//                         className="so-details-table"
//                         isGlobalFilter={false}
//                         customPageSize={itemsPerPage}
//                         isPagination={false}
//                     />
//                 </div>

//                 {/* Pagination */}
//                 <div className="pagination-container p-3 d-flex justify-content-between align-items-center">
//                     <div>Total Results: {totalResults}</div>
//                     <div className="d-flex align-items-center">
//                         <button 
//                             className="pagination-btn prev-btn"
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                         >
//                             <i className="mdi mdi-chevron-left"></i>
//                         </button>
//                         <span className="page-info">Page {currentPage} of {totalPages}</span>
//                         <button 
//                             className="pagination-btn next-btn"
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                         >
//                             <i className="mdi mdi-chevron-right"></i>
//                         </button>
//                         <input
//                             type="text"
//                             className="page-input"
//                             value={currentPage}
//                             onChange={(e) => {
//                                 const page = parseInt(e.target.value);
//                                 if (!isNaN(page) && page > 0 && page <= totalPages) {
//                                     setCurrentPage(page);
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div>
//             </ModalBody>
//         </Modal>
//     );
// };

// export default BidViewModal;




import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Input, Button } from "reactstrap";
import TableContainer from "../../../../../Components/Common/TableContainer";
import "./viewModal.css";

const BidViewModal = ({ isOpen, toggle, soNumber }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState(1); // 1 for first table, 2 for second table
    const itemsPerPage = 5;
    
    // Sample data for first table (Image 1)
    const salesOrderData = [
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

    // Updated order details data to include new columns
    const orderDetailsData = [
        {
            id: 1,
            routeDesc: "N/A",
            shipToParty: "Ship1",
            shipToPartyName: "ship name 1",
            shipToRegion: "India",
            division: "N/A",
            orderType: "Ship",
            blockedSoldId: "SO23456",
            cityDesc: "Mumbai",
            countryDesc: "India",
            distributionChannel: "Road",
            routeCode: "RN102"
        },
        {
            id: 2,
            routeDesc: "N/A",
            shipToParty: "Ship2",
            shipToPartyName: "ship name 2",
            shipToRegion: "Malaysia",
            division: "N/A",
            orderType: "Ship",
            blockedSoldId: "SO45734",
            cityDesc: "Delhi",
            countryDesc: "China",
            distributionChannel: "Ship",
            routeCode: "RN103"
        },
        {
            id: 3,
            routeDesc: "N/A",
            shipToParty: "Ship3",
            shipToPartyName: "ship name 3",
            shipToRegion: "UAE",
            division: "N/A",
            orderType: "Ship",
            blockedSoldId: "SO89342",
            cityDesc: "Chennai",
            countryDesc: "UAE",
            distributionChannel: "Flight",
            routeCode: "RN108"
        },
        {
            id: 4,
            routeDesc: "N/A",
            shipToParty: "Ship4",
            shipToPartyName: "ship name 4",
            shipToRegion: "US",
            division: "N/A",
            orderType: "Ship",
            blockedSoldId: "SO87344",
            cityDesc: "Lucknow",
            countryDesc: "Malaysia",
            distributionChannel: "Road",
            routeCode: "RN104"
        },
        {
            id: 5,
            routeDesc: "N/A",
            shipToParty: "Ship4",
            shipToPartyName: "ship name 4",
            shipToRegion: "US",
            division: "N/A",
            orderType: "Ship",
            blockedSoldId: "SO87344",
            cityDesc: "Lucknow",
            countryDesc: "Malaysia",
            distributionChannel: "Road",
            routeCode: "RN104"
        }
    ];

    // Define columns for the first table
    const salesOrderColumns = [
        {
            Header: "Sales Order No.",
            accessor: "salesOrderNo",
        },
        {
            Header: "Validity Start Date",
            accessor: "validityStartDate",
        },
        {
            Header: "Validity End Date",
            accessor: "validityEndDate",
        },
        {
            Header: "Order Qty.",
            accessor: "orderQty",
        },
        {
            Header: "Remaining Qty.",
            accessor: "remainingQty",
        },
        {
            Header: "Order Type",
            accessor: "orderType",
        }
    ];

    // Updated columns for the second table to include new columns
    const orderDetailsColumns = [
        {
            Header: "Route Desc.",
            accessor: "routeDesc",
        },
        {
            Header: "Ship to Party",
            accessor: "shipToParty",
        },
        {
            Header: "Ship to Party Name",
            accessor: "shipToPartyName",
        },
        {
            Header: "Ship to Region",
            accessor: "shipToRegion",
        },
        {
            Header: "Division",
            accessor: "division",
        },
        {
            Header: "Order Type",
            accessor: "orderType",
        },
        {
            Header: "Blocked/Solnd",
            accessor: "blockedSoldId",
        },
        {
            Header: "City Desc.",
            accessor: "cityDesc",
        },
        {
            Header: "Country Desc.",
            accessor: "countryDesc",
        },
        {
            Header: "Distribution Channel",
            accessor: "distributionChannel",
        },
        {
            Header: "Route Code",
            accessor: "routeCode",
        }
    ];

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle tab change
    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
        setCurrentPage(1); // Reset to first page when changing tabs
        setSearchTerm(""); // Clear search when changing tabs
    };

    // Get the total number of results
    const totalResults = 20; // Example static value
    const totalPages = 4; // Example static value

    // Get the active data and columns based on current tab
    const activeData = activeTab === 1 ? salesOrderData : orderDetailsData;
    const activeColumns = activeTab === 1 ? salesOrderColumns : orderDetailsColumns;

    // Filter data based on search term
    const filteredData = activeData.filter(item => 
        Object.values(item).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="xl" className="so-view-modal">
            <ModalHeader toggle={toggle} className="modal-title-header">
                SO Details: {soNumber}
              
            </ModalHeader>
            <ModalBody className="p-0">
                {/* Search bar */}
                <div className="p-3 d-flex justify-content-between align-items-center">
                    <div className="tab-buttons">
                        <Button 
                            color={activeTab === 1 ? "primary" : "light"}
                            onClick={() => handleTabChange(1)}
                            className="me-2"
                        >
                            Sales Order Details
                        </Button>
                        <Button 
                            color={activeTab === 2 ? "primary" : "light"}
                            onClick={() => handleTabChange(2)}
                        >
                            Order Details
                        </Button>
                    </div>
                    <div className="search-box" style={{ width: "250px" }}>
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
                    <TableContainer
                        columns={activeColumns}
                        data={filteredData}
                        className="so-details-table"
                        isGlobalFilter={false}
                        customPageSize={itemsPerPage}
                        isPagination={false}
                        isHideColumns={true}
                    />
                </div>

                {/* Pagination */}
                <div className="pagination-container p-3 d-flex justify-content-between align-items-center">
                    <div>Total Results: {totalResults}</div>
                    <div className="d-flex align-items-center">
                        <button 
                            className="pagination-btn prev-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className="mdi mdi-chevron-left"></i>
                        </button>
                        <span className="page-info">Page {currentPage} of {totalPages}</span>
                        <button 
                            className="pagination-btn next-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <i className="mdi mdi-chevron-right"></i>
                        </button>
                        <input
                            type="text"
                            className="page-input"
                            value={currentPage}
                            onChange={(e) => {
                                const page = parseInt(e.target.value);
                                if (!isNaN(page) && page > 0 && page <= totalPages) {
                                    setCurrentPage(page);
                                }
                            }}
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default BidViewModal;
 