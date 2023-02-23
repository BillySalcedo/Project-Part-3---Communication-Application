import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/ManageDocuments.css";
import Modal from "./Modal";
import myImage from '../img/img.png';

function ManageDocuments() {
  // State variables
  const [uploads, setUploads] = useState(JSON.parse(localStorage.getItem("uploads")) || []); // array of files
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("loggedIn"))); // currently logged in user
  const [showModalUpload, setShowModalUpload] = useState(false); // boolean value that determines if upload modal is open
  const [showModalEdit, setShowModalEdit] = useState(false); // boolean value that determines if edit modal is open
  const [showModalDelete, setShowModalDelete] = useState(false); // boolean value that determines if delete modal is open
  const [uploadToDelete, setUploadToDelete] = useState(null); // the ID of the upload to be deleted
  const [fileUpload, setFileUpload] = useState(null); // the file to be uploaded
  const [fileLabel, setFileLabel] = useState(''); // the label for the file to be uploaded
  const [editLabel, setEditLabel] = useState(''); // the new label for a file being edited
  const [editUploadId, setEditUploadId] = useState(''); // the ID of the file being edited
  const navigate = useNavigate(); // navigation function provided by react-router-dom

  // Effect hook that checks if user is logged in
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/Welcome"); // navigate to the welcome page if not logged in
    }
  }, [navigate]);

  // Effect hook that updates the state when uploads change
  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem("uploads") || "[]");
    setUploads(storedUploads);
  }, []);

  // Function to handle edit click on a file
  const handleEditClick = (uploadId) => {
    const upload = uploads.find((upload) => upload.id === uploadId); // get the file being edited
    setEditUploadId(upload.id);
    setEditLabel(upload.label);
    setShowModalEdit(true); // open the edit modal
  };

  // Function to handle saving a file after editing
  const handleSaveClick = () => {
    const trimmedLabel = editLabel.trim(); // trim the new label

    if (trimmedLabel === '') { // check if label is blank
      alert('Label cannot be blank');
      return;
    }

    const updatedUploads = uploads.map((upload) => {
      if (upload.id === editUploadId) {
        return { ...upload, label: editLabel };
      } else {
        return upload;
      }
    });

    setUploads(updatedUploads);
    localStorage.setItem("uploads", JSON.stringify(updatedUploads)); // update local storage
    setShowModalEdit(false); // close the edit modal
  };

  // Function to handle deleting a file
  const handleDeleteClick = () => {
    const updatedUploads = uploads.filter((upload) => upload.id !== uploadToDelete); // filter out the file being deleted
    setUploads(updatedUploads);
    localStorage.setItem("uploads", JSON.stringify(updatedUploads)); // update local storage
    setShowModalDelete(false); // close the delete modal
  };

  // Function to open the delete modal
  const handleDeleteModalOpen = (uploadId) => {
    setUploadToDelete(uploadId);
    setShowModalDelete(true);
  };
  // Upload file

  // Update file label value in state
  const handleLabelChange = (e) => {
    setFileLabel(e.target.value);
  };

  // Update uploaded file value in state
  const handleFileUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the label and file
    if (!fileLabel) {
      alert("File Description is required");
      return;
    }
    if (!fileUpload) {
      alert("File Upload is required");
      return;
    }
    if (!fileLabel.trim()) {
      alert("Please input a valid label");
      return;
    }

    // Add the file to local storage
    const myUploads = [...uploads];
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];
    myUploads.push({
      id: Date.now(),
      usernameId: loggedIn,
      label: fileLabel,
      fileName: fileUpload.name,
    });
    localStorage.setItem("uploads", JSON.stringify(myUploads));
    setUploads(myUploads);
    setShowModalUpload(false);
    setFileLabel(""); //Setting the file label empty after the upload completes
    setFileUpload(null); //Setting the file upload empty after the upload completes
  };

  return (

    <div>
      {/* Display uploaded files */}
      <h3 className="header-manage-docu">My Uploads</h3>
      <table className="table-docu" id="file-info">
        <thead>
          <tr>
            <td className="td-container1">Label</td>
            <td className="td-container2">File Name</td>
            <td className="td-container2">Action</td>
          </tr>
        </thead>
        <tbody id="uploads-container" className="uploads-file">
          {uploads
            .filter((upload) => upload.usernameId === loggedInUser)
            .map((upload) => (
              <tr key={upload.id}>
                <td className="td-container3">{upload.label}</td>
                <td className="td-container4">{upload.fileName}</td>
                <td className="td-container4">
                  {/* Edit button */}
                  <button
                    className="edit"
                    onClick={() => handleEditClick(upload.id)}
                  >
                    Edit |
                  </button>
                  {/* Delete button */}
                  <button
                    className="delete"
                    onClick={() => handleDeleteModalOpen(upload.id)}
                  >
                    &nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Display shared files */}
      <h3 className="header-manage-docu1">Shared Uploads</h3>
      <table className="table-docu" id="file-info">
        <thead className="tr-cointainer1">
          <tr>
            <td className="td-container1">Label</td>
            <td className="td-container2">File Name</td>
            <td className="td-container2">Shared By</td>
          </tr>
        </thead>
        <tfoot>
          {/* Add Upload button */}
          <tr>
            <td className="td-container3">
              <button
                type="button"
                className="upload-button"
                onClick={() => setShowModalUpload(true)}
              >
                + Add Upload
              </button>
            </td>
            <td className="td-container3">&nbsp;</td>
            <td className="td-container3">&nbsp;</td>
          </tr>
        </tfoot>
      </table>
      {/* Start of upload modal */}
      {showModalUpload && (
        <div className="upload-modal">
          <div className="upload-content">
            <span className="upload-close" onClick={() => setShowModalUpload(false)}>
              ✕
            </span>
            <h1 className="header-upload">Upload</h1>
            <div className="file-description">
              <form className="add-upload-form" onSubmit={handleSubmit} >
                <label>File Description</label>{" "}
                <input
                  className="upload-input"
                  type="input"
                  id="file-label"
                  name="file-label"
                  placeholder="Files Description"
                  onChange={handleLabelChange}
                />
                <br />
                <label>File Upload</label>{" "}
                <input
                  className="file-input"
                  type="file"
                  id="file-upload"
                  placeholder="Files Upload"
                  onChange={handleFileUpload}
                />
              </form>
            </div>
            <div>
              <button className="upload-button1" type="submit" onClick={handleSubmit}>
                Upload
              </button>
              <button className="upload-cancel " onClick={() => setShowModalUpload(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End of upload modal */}
      {/* Start of edit modal */}
      {showModalEdit && (
        <div className="edit-modal">
          <div className="edit-content">
            <span className="edit-close" onClick={() => setShowModalEdit(false)}>
              ✕
            </span>
            <h1 className="header-edit">Edit</h1>
            <div className="file-description">
              <form >
                <label>File Description</label>{" "}
                <input
                  type="text"
                  className="edit-input"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                />
              </form>
            </div>
            <div>
              <button className="edit-save" type="submit" onClick={handleSaveClick} >
                Save
              </button>
              <button className="edit-cancel " onClick={() => setShowModalEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End of edit modal */}
      {/* Start of delete modal */}
      {showModalDelete && (
        <Modal onClose={() => setShowModalDelete(false)} onConfirm={handleDeleteClick}>
          <div>
            <h1>Confirm User Deletion</h1>
            <img src={myImage} alt="Question Mark" />
            <p className="question1">Are you sure?</p>
          </div>
        </Modal>
      )}
      {/* End of delete modal */}
    </div >
  );
}
export default ManageDocuments;
