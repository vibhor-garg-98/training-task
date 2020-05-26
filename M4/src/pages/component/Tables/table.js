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
  TableRow,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import Linktag from "@material-ui/core/Link";

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    marginBottom: theme.spacing(2),
    height: 400,
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflow: "auto",
  },
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      open: false,
      sortTime: {},
      loading: false,
      sortAlgorithm: "",
      sort: "",
    };
  }

  onHandleChangeButton = async () => {
    const response = await axios.get("http://localhost:9002/api/unsort/");
    this.setState({
      array: response.data,
      open: true,
    });
    if (response.data) {
      const { sortTime } = this.state;
      const response1 = await axios.get("http://localhost:9002/api/sort/");
      response1.data.forEach((element) => {
        response.data.forEach((value) => {
          if (element.objectId === value.originalId) {
            this.setState({
              sortTime: {
                ...sortTime,
                [value.originalId]: element.sortDuration,
              },
            });
          }
        });
      });
    } else {
      alert('No Data Found')
    }
  };

  perticularSortButton = async (value) => {
    const { sortAlgorithm } = this.state;
    if (sortAlgorithm) {
      await axios.put("http://localhost:9002/api/sort/", {
        id: value,
        sortingAlgorithm: sortAlgorithm,
      });
      const objectId = value;
      this.setState({
        loading: true,
      });
      const response1 = await axios.get("http://localhost:9002/api/sort/", {
        params: {
          objectId,
        },
      });
      const { sortTime } = this.state;
      this.setState(
        {
          sortTime: {
            ...sortTime,
            [value]: response1.data.sortDuration,
          },
          sortAlgorithm: "",
        },
        () => {
          this.setState({
            loading: false,
          });
        }
      );
    }
  };

  allSortButton = async () => {
    const { sortAlgorithm } = this.state;
    if (sortAlgorithm) {
      const response = await axios.get("http://localhost:9002/api/unsort/");
      const parsedvalues = {};
      if (response.data) {
        response.data.forEach(async (element) => {
          await axios.put("http://localhost:9002/api/sort/", {
            id: element.originalId,
            sortingAlgorithm: sortAlgorithm,
          });
          const objectId = element.originalId;
          const response1 = await axios.get("http://localhost:9002/api/sort/", {
            params: {
              objectId,
            },
          });
          parsedvalues[objectId] = response1.data.sortDuration;
          this.setState({
            sortTime: parsedvalues,
          });
        });
      } else {
        alert("No Object found");
      }
    }
  };

  handleSelectChange = (values) => {
    this.setState({ sortAlgorithm: values.target.value }, () => {
      console.log(this.state);
    });
  };

  render() {
    const {
      match: { url },
    } = this.props;
    const { array, open, sortTime, loading, sortAlgorithm } = this.state;
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
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        {open && (
          <>
            <TableCell>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">
                  Alogrithm
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Algorithm"
                  value={sortAlgorithm}
                  onChange={this.handleSelectChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
                  <MenuItem value="Selection Sort">Selection Sort</MenuItem>
                  <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
                  <MenuItem value="Merge Sort">Merge Sort</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <Box marginBottom="20px" marginTop="20px" width="70vw" />
            <TableContainer component={Paper} className={classes.container}>
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
                  {array &&
                    array.length &&
                    array.map((row) => (
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
