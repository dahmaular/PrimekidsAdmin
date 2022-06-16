import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import IntlMessages from "util/IntlMessages";
import axios from "axios";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import { baseUrl } from "constants/serverDetails";

const inputValidationSchema = yup.object().shape({
  vote: yup.number("Vote must be a number").required("Vote number is Required")
  // .min(8, ({ min }) => `Password must be at least ${min} characters`)
});

const VoteUser = ({ match }) => {
  const id = match.params.id;
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [vote, setVote] = useState("");
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    fetchUser();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleShowError = () => setShowError(true);

  const handleCloseError = () => setShowError(false);

  const onUpdate = async val => {
    setIsLoading(true);
    try {
      await axios({
        method: "put",
        url: `${baseUrl}api/votes/${user._id}`,
        headers: { "Content-Type": "application/json" },
        data: {
          votes: val.vote,
          userId: user.user._id
        }
      }).then(response => {
        if (response.status === 200) {
          console.log(response);
          setMessage(response.data.message);
          setIsLoading(false);
          savePayment(val.vote);
          handleShow();
        }
      });
    } catch (error) {
      console.log("fetching data error", error);
      setIsLoading(false);
    }
  };

  const onRemove = async val => {
    console.log(val.vote);
    if (val.vote < user.votes) {
      setIsLoading2(true);
      try {
        await axios({
          method: "put",
          url: `${baseUrl}api/remove-votes/${user._id}`,
          headers: { "Content-Type": "application/json" },
          data: {
            votes: val.vote,
            userId: user.user._id
          }
        }).then(response => {
          if (response.status === 200) {
            // console.log(response);
            setMessage(response.data.message);
            setIsLoading2(false);
            handleShow();
            val.vote = "";
          }
        });
      } catch (error) {
        console.log("fetching data error", error);
        setIsLoading2(false);
      }
    } else {
      setMessage("Forbiden! Value is greater than the existing vote");
      handleShowError();
    }
  };

  const savePayment = async val => {
    const data = {
      payer: "Admin",
      contestantId: user.user._id,
      vote: val,
      amount: val * 100
    };
    console.log("Paymentdata", data);
    try {
      await axios({
        method: "post",
        url: `${baseUrl}api/payment`,
        data: data,
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        if (response.status === 200)
          console.log("Payment response", response.data);
        // console.log(response);
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  // console.log(match.params.id);

  const fetchUser = async () => {
    try {
      await axios({
        method: "get",
        url: `${baseUrl}api/votes/${id}`,
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
  }, []);

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader title="Contestant" match={match} />
      {user?.user?.childName}
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <Formik
            validationSchema={inputValidationSchema}
            initialValues={{
              vote: ""
            }}
            onSubmit={values => onUpdate(values)}
            className="contact-form jr-card mb-md-0"
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid
            }) => (
              <>
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <label className="mb-1" form="firstName">
                        Contestant Id
                      </label>
                      <input
                        className="form-control form-control-lg"
                        disabled
                        id="firstName"
                        type="text"
                        value={user?.user?._id}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <label className="mb-1" htmlFor="lastName">
                        Vote(s)
                      </label>
                      <input
                        className="form-control form-control-lg"
                        id="vote"
                        name="vote"
                        onChange={handleChange}
                        type="number"
                        value={values.vote}
                        placeholder={user?.votes}
                      />
                    </div>
                    {errors.vote && (
                      <div className="input-feedback">{errors.vote}</div>
                    )}
                  </div>
                </div>
                {isLoading ? (
                  <button className="btn btn-primary">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mb-0">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Add vote
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </Formik>

          <Formik
            validationSchema={inputValidationSchema}
            initialValues={{
              vote: ""
            }}
            onSubmit={values => onRemove(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid
            }) => (
              <>
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      {/* <label className="mb-1" htmlFor="email">
                        Parent Email
                      </label> */}
                      <input
                        className="form-control form-control-lg"
                        id="vote"
                        type="number"
                        value={values.vote}
                        name="vote"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.vote && (
                      <div className="input-feedback">{errors.vote}</div>
                    )}
                  </div>
                </div>

                {isLoading2 ? (
                  <button className="btn btn-primary">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mb-0">
                        <button
                          type="submit"
                          className="btn btn-danger"
                          onClick={handleSubmit}
                        >
                          Remove vote
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </Formik>
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
            PrimeKid Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The Contestant's vote has been successfully updated.
        </Modal.Body>
        <Modal.Body>Kindly refresh to view changes</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>

      {/* Error modal */}
      <Modal
        show={showError}
        onHide={handleCloseError}
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
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseError}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VoteUser;
