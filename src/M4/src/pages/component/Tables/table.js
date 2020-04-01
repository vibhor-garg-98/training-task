import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Button,
  CircularProgress,
  Box,
  TableRow
} from "@material-ui/core";
import Linktag from "@material-ui/core/Link";

const useStyles = theme => ({
  table: {
    minWidth: 650
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      open: false,
      sortTime: {},
      loading: false
    };
  }

  onHandleChangeButton = async () => {
    const response = await axios.get("http://localhost:9002/api/unsort/");
    this.setState({
      array: response.data,
      open: true
    });
    const { sortTime } = this.state;
    const response1 = await axios.get("http://localhost:9002/api/sort/");
    response1.data.forEach(element => {
      response.data.forEach(value => {
        if (element.objectId === value.originalId) {
          this.setState({
            sortTime: {
              ...sortTime,
              [value.originalId]: element.sortDuration
            }
          });
        }
      });
    });
  };

  perticularSortButton = async value => {
    await axios.put("http://localhost:9002/api/sort/", {
      id: value
    });
    const objectId = value;
    this.setState({
      loading: true
    });
    const response1 = await axios.get("http://localhost:9002/api/sort/", {
      params: {
        objectId
      }
    });
    const { loading } = this.state;
    const { sortTime } = this.state;
    this.setState(
      {
        sortTime: {
          ...sortTime,
          [value]: response1.data.sortDuration
        }
      },
      () => {
        this.setState({
          loading: false
        });
      }
    );
  };

  allSortButton = async () => {
    const response = await axios.get("http://localhost:9002/api/unsort/");

    response.data.map(element => {
      axios.put("http://localhost:9002/api/sort/", {
        id: element.originalId
      });
      const objectId = element.originalId;
      const response1 = axios.get("http://localhost:9002/api/sort/", {
        params: {
          objectId
        }
      });
    });
  };

  render() {
    const {
      match: { url }
    } = this.props;
    const { array, open, sortTime, loading } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <div align="center">
          <h1> Sort Objects </h1>
        </div>
        <div align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={this.onHandleChangeButton}
          >
            Show data
          </Button>
        </div>
        {open && (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Sort Button</TableCell>
                    <TableCell align="left">Sort Duration</TableCell>
                    <TableCell align="left">Time History</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {array.map(row => (
                    <>
                      <TableRow key={row.originalId}>
                        <TableCell align="left">{row.originalId}</TableCell>

                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.perticularSortButton(row.originalId);
                            }}
                          >
                            Sort Object
                          </Button>
                          {loading && <CircularProgress />}
                        </TableCell>
                        <TableCell align="left">
                          {sortTime ? sortTime[row.originalId] : "NA"}
                        </TableCell>
                        <TableCell align="left">
                          <Fragment key={row.originalId}>
                            <Linktag
                              href="#"
                              component={Link}
                              to={`${url}/${row.originalId}`}
                            >
                              time history
                            </Linktag>
                          </Fragment>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box marginBottom="20px" marginTop="20px" width="70vw" />
            <div align="center">
              <Button
                align="center"
                variant="contained"
                color="primary"
                onClick={() => {
                  this.allSortButton();
                }}
              >
                Sort All Object
              </Button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default withStyles(useStyles)(SimpleTable);
