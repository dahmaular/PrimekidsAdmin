import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import IntlMessages from "util/IntlMessages";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { baseUrl } from "constants/serverDetails";

const ContactUs = ({ match }) => {
  const vId = match.params.id;
  // console.log(vId);

  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    name: "",
    age: "",
    parentName: "",
    parentNumber: "",
    parentEmail: "",
    image: ""
  });
  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUser = async () => {
    try {
      await axios({
        method: "get",
        url: `${baseUrl}api/users/${vId}`,
        headers: { "Content-Type": "application/json" }
      }).then(u => {
        setUser(u.data);
        // console.log(u.data);
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  const handleFileChnage = e => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    values.image = file;
    // console.log(values.image)
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    // console.log(values);
  };

  const handleSubmit = e => {
    // console.log('Pressed', values)
    e.preventDefault();
    const reader = new FileReader();
    if (file !== null) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // console.log(reader.result);
        onUpdate(reader.result);
      };
      reader.onerror = () => {
        console.error("Error reading image file here");
      };
    } else {
      onUpdate(values.image);
    }
  };

  const onUpdate = async base64EncodedImage => {
    let details = {
      childName: values.name === "" ? user?.childName : values.name,
      age: values.age === "" ? user?.age : values.age,
      parentName:
        values.parentName === "" ? user?.parentName : values.parentName,
      parentNumber:
        values.parentNumber === "" ? user?.parentNumber : values.parentNumber,
      parentEmail:
        values.parentEmail === "" ? user?.parentEmail : values.parentEmail,
      image: values.image === "" ? user?.image : base64EncodedImage
    };

    // console.log("This is the request body here", details);

    try {
      await axios({
        method: "put",
        url: `${baseUrl}api/users/${vId}`,
        data: details
      }).then(response => {
        console.log("Response", response);
        if (response.status === 200) {
          handleShow();
        }
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader title="Contestant" match={match} />
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <form
            onSubmit={handleSubmit}
            className="contact-form jr-card mb-md-0"
          >
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="form-group">
                  <label className="mb-1" form="name">
                    Contestant name
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="name"
                    type="text"
                    placeholder={user?.childName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="form-group">
                  <label className="mb-1" htmlFor="lastName">
                    Age
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="age"
                    type="text"
                    placeholder={user?.age}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="form-group">
                  <label className="mb-1" htmlFor="email">
                    Parent Email
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="parentEmail"
                    type="email"
                    placeholder={user?.parentEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="form-group">
                  <label className="mb-1" htmlFor="phoneNumber">
                    Parent Name
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="parentName"
                    type="tel"
                    placeholder={user?.parentName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="mb-1" htmlFor="webSite">
                    Parent Number
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="parentNumber"
                    type="text"
                    placeholder={user?.parentNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleFileChnage}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  {/* <label className="mb-1">Image</label> */}
                  <img
                    src={user?.image}
                    alt="userImage"
                    width="180"
                    height="220"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group mb-0">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            PrimeKids Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you. Update successful.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactUs;
