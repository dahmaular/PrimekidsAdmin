import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "constants/serverDetails";
import SearchBar from "material-ui-search-bar";
import { Spinner } from "react-bootstrap";
import { CSVLink } from "react-csv";
import Download from "../../../../../../assets/images/download.png";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

function CustomizedTable(props) {
  const { classes } = props;
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [showQ, setShowQ] = useState(false);
  const [delId, setDelId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseQ = () => setShowQ(false);
  const handleShowQ = () => setShowQ(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const requestSearch = searchVal => {
    if (searchVal === "") {
      return fetchUsers();
    }
    const filteredUser = user.filter(row => {
      return row.childName?.toLowerCase().includes(searchVal.toLowerCase());
    });
    setUser(filteredUser);
  };

  const cancelSearch = () => {
    setSearched("");
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      await axios({
        method: "get",
        url: `${baseUrl}api/users`,
        headers: { "Content-Type": "application/json" }
      }).then(users => {
        setUser(users.data);
        // console.log(users.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onOpen = id => {
    setDelId(id);
    handleShowQ();
  };

  const onDelete = async () => {
    handleCloseQ();
    console.log(delId);

    try {
      await axios({
        method: "delete",
        url: `${baseUrl}api/users/${delId}`,
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        // setUser(users.data);
        // console.log(response);
        if (response.status === 200) {
          handleShow();
        }
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper className={classes.root}>
        {isLoading ? (
          <Button color="inherit" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        ) : (
          <>
            <CSVLink
              data={user}
              filename={"contestants.csv"}
              className="btn btn-primary"
            >
              Download Table{" "}
              <img src={Download} width={20} height={20} className="m-2" />
            </CSVLink>
            <SearchBar
              value={searched}
              onChange={searchVal => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>S/N</CustomTableCell>
                  <CustomTableCell>Full name</CustomTableCell>
                  <CustomTableCell>Age</CustomTableCell>
                  <CustomTableCell>Parent's Name</CustomTableCell>
                  <CustomTableCell>Parent's Number</CustomTableCell>
                  <CustomTableCell>Action</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((usr, index) => {
                    return (
                      <TableRow className={classes.row} key={usr?.id}>
                        <CustomTableCell>{index + 1}</CustomTableCell>
                        <CustomTableCell>{usr?.childName}</CustomTableCell>
                        <CustomTableCell>{usr?.age}</CustomTableCell>
                        <CustomTableCell>{usr?.parentName}</CustomTableCell>
                        <CustomTableCell>{usr?.parentNumber}</CustomTableCell>
                        <CustomTableCell>
                          <Link to={`../user/contestant/${usr?._id}`}>
                            <Button
                              variant="contained"
                              color="primary"
                              className="jr-btn jr-btn-lg"
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            onClick={() => onOpen(usr._id)}
                            variant="contained"
                            className="jr-btn jr-btn-lg bg-danger text-white"
                          >
                            Delete
                          </Button>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={user.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Table>
          </>
        )}
      </Paper>
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
        <Modal.Body>The user has been deleted successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>

      {/* are you sure modal */}

      <Modal
        show={showQ}
        onHide={handleCloseQ}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title aria-labelledby="contained-modal-title-vcenter">
            Delete?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Body>NOTE: This action is not reversible</Modal.Body>
        <Modal.Footer>
          <Button onClick={onDelete} variant="primary">
            Yes
          </Button>
          <Button onClick={handleCloseQ} variant="danger">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
