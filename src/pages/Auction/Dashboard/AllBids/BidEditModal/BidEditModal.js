import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import BidForm from "../BidForm/BideForm";

const BidEditModal = ({ 
    isOpen, 
    toggle, 
    values, 
    handleInputChange, 
    handleSubmit, 
    isEdit, 
    statusOptions, 
    materialTypes, 
    multipleOrderOptions 
}) => {
    return (
        <Modal id="showModal" isOpen={isOpen} toggle={toggle} centered size="lg">
            <ModalHeader className="bg-light p-3" toggle={toggle}>
                {!!isEdit ? "Edit Bid" : "Create New Bid"}
            </ModalHeader>
            <BidForm 
                values={values}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isEdit={isEdit}
                toggle={toggle}
                statusOptions={statusOptions}
                materialTypes={materialTypes}
                multipleOrderOptions={multipleOrderOptions}
            />
        </Modal>
    );
};

export default BidEditModal;