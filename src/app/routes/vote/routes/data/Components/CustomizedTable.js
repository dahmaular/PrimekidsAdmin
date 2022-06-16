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

function VoteTable(props) {
  const { classes } = props;
  const [vote, setVote] = useState([]);
  const [page, setPage] = useState(0);
  const [downloadData, setDownloadData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const onDelete = async id => {
    try {
      await axios({
        method: "delete",
        url: `${baseUrl}api/votes/${id}`,
        headers: { "Content-Type": "application/json" }
      }).then(res => {
        fetchVotes();
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  const fetchVotes = async () => {
    try {
      await axios({
        method: "get",
        url: `${baseUrl}api/votes`,
        headers: { "Content-Type": "application/json" }
      }).then(res => {
        setVote(res.data);
        handleDownloadTable(res.data);
        // console.log("This is vote response here", res);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("fetching data error", error);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = searchVal => {
    if (searchVal === "") {
      return fetchVotes();
    }
    const filteredUser = vote.filter(row => {
      return row.user?.childName
        ?.toLowerCase()
        .includes(searchVal.toLowerCase());
    });
    setVote(filteredUser);
  };

  const cancelSearch = () => {
    setSearched("");
    fetchVotes();
  };

  const handleDownloadTable = data => {
    let tableArray = [];
    tableArray = data.map((item, i) => {
      return {
        Contestant: item?.user?.childName,
        Votes: item?.votes,
        ParentName: item?.user?.parentName,
        parentNumber: item.user?.parentNumber
      };
    });
    setDownloadData(tableArray);
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
              data={downloadData}
              filename={"votes.csv"}
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
                  <CustomTableCell width="20">S/N</CustomTableCell>
                  <CustomTableCell>Full name</CustomTableCell>
                  <CustomTableCell>Votes</CustomTableCell>
                  <CustomTableCell>Action</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vote
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((usr, index) => {
                    return (
                      <TableRow className={classes.row} key={usr._id}>
                        <CustomTableCell width="20">
                          {index + 1}
                        </CustomTableCell>
                        <CustomTableCell>
                          {usr?.user?.childName}
                        </CustomTableCell>
                        <CustomTableCell>{usr?.votes}</CustomTableCell>
                        <CustomTableCell>
                          <Link to={`../user/vote-user/${usr?.user?._id}`}>
                            <Button
                              variant="contained"
                              color="primary"
                              className="jr-btn jr-btn-lg"
                            >
                              Update
                            </Button>
                          </Link>
                          <Button
                            onClick={() => onDelete(usr._id)}
                            variant="contained"
                            className="jr-btn jr-btn-lg bg-danger text-white"
                          >
                            Deactivate
                          </Button>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={vote.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Table>
          </>
        )}
      </Paper>
    </>
  );
}

VoteTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VoteTable);
