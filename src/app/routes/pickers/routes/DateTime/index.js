import React, { useContext, useState, useEffect } from "react";

import CardBox from "components/CardBox";
import ContainerHeader from "components/ContainerHeader";
import Select from "react-select";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { baseUrl } from "constants/serverDetails";

const options = [
  { value: true, label: "true" },
  { value: false, label: "false" }
];

const DateTime = ({ match }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [key, setKey] = useState("");
  const [values, setValues] = useState({
    key: "",
    vote: ""
  });
  const [settings, setSettings] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      await axios({
        method: "get",
        url: `${baseUrl}api/settings`,
        headers: { "Content-Type": "application/json" }
      }).then(res => {
        setSettings(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    // console.log('Pressed', values)
    e.preventDefault();

    let details = {
      paymentKey: values.key === "" ? settings[0]?.paymentKey : values.key,
      voteButton:
        selectedOption.value === null
          ? settings[0]?.voteButton
          : selectedOption.value,
      stageVote: values.vote == "" ? settings[0]?.stageVote : values.vote
    };

    try {
      await axios({
        method: "put",
        url: `${baseUrl}api/settings/admin@primekidsglobal.com`,
        data: details
      }).then(response => {
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
      <ContainerHeader title={"Settings"} match={match} />
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          {/* <CardBox> */}
          <form
            onSubmit={handleSubmit}
            className="contact-form jr-card mb-md-0"
          >
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="form-group">
                  <label className="mb-1" form="name">
                    Show Vote Button?
                  </label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="form-group">
                  <label className="mb-1" htmlFor="lastName">
                    Paystack Key:
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="key"
                    type="text"
                    placeholder={settings[0]?.paymentKey}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="form-group">
                  <label className="mb-1" htmlFor="lastName">
                    Votes Required for Next Stage:
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="vote"
                    type="text"
                    placeholder={settings[0]?.stageVote}
                    onChange={handleChange}
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
          {/* </CardBox> */}
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

export default DateTime;
