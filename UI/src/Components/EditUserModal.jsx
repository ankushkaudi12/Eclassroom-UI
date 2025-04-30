import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "./Graphql/Mutations";
import "./Modal.css";

const EditUserModal = ({ user, onClose,id }) => {
  // Destructure only the fields that are allowed in EditUserInput
  console.log("user",id);
  
  const {
    firstName,
    lastName,
    email,
    dob,
    phoneNumber,
    gender,
    updatedBy, // Include only if your backend expects it
  } = user;

  const [formData, setFormData] = useState({
    id,
    firstName,
    lastName,
    email,
    dob,
    phoneNumber,
    gender,
    updatedBy,
  });

  const [editUser] = useMutation(EDIT_USER, {
    onCompleted: () => {
      alert("User updated successfully!");
      onClose();
    },
    onError: (err) => alert("Update failed: " + err.message),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser({
      variables: {
        editUserInput: {
          id: id,
          firstName:formData.firstName,
          lastName:formData.lastName,
          email:formData.email,
          dob:formData.dob,
          phoneNumber:formData.phoneNumber,
          gender:formData.gender,
          updatedBy: parseInt(id),
        },
      },
    });
  };
  console.log("fordata",formData);
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone" />
          <input name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
          <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
