import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as yup from 'yup';
import { withStyles } from '@material-ui/core/styles';

const schema = yup.object().shape({
  keyCount: yup
    .string()
    .matches(/^([2-9]|[0-9][0-9])$/, 'KeyCount is invalid')
    .required('keyCount is required')
    .label('KeyCount')
  ,
  depth: yup
    .string()
    .matches(/^([1-9]|[0-9][0-9])$/, 'depth is invalid')
    .required('depth is required')
    .label('Depth')
  ,
})

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 2, 2, 2),
  },
  heading: {
    textAlign: "center",
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },

});

class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyCount: '',
      depth: '',
      dataObject: {},
      errorMessage: {},
      touched: {},
      isValid: false,
    }
  }

  hasError = () => {
    const { keyCount, depth, touched } = this.state;
    const parsedError = {};
    schema.validate({ keyCount, depth }
      , { abortEarly: false }).then(() => {

        this.setState({
          errorMessage: {},
          isValid: true,
        })

      }).catch((error) => {
        console.log(error);
        error.inner.forEach((element) => {
          if (touched[element.path]) {
            parsedError[element.path] = element.message;
          }
          this.setState({
            errorMessage: parsedError,
            isValid: false
          })
        });
      })

  }

  isTouched = (value) => {

    const { touched } = this.state;
    console.log(value);
    this.setState({
      touched: {
        ...touched,
        [value]: true,
      }
    }, () => { this.hasError() })

  }
  KeyCountChange = (element) => {
    this.setState({
      keyCount: element.target.value,
    }, () => { console.log(this.state) });

  }

  DepthChange = (element) => {
    this.setState({
      depth: element.target.value
    }, () => { console.log(this.state) });
  }
  OnClick = async () => {
    const { keyCount, depth } = this.state;
    const unsortObject = await axios.post('http://localhost:9002/api/unsort/', {
      keyCount,
      depth
    });
    const { data } = unsortObject.data;
    const parsedObject = JSON.parse(JSON.stringify(data));

    this.setState({
      dataObject: parsedObject,
    });
  }

  render() {
    const { dataObject, errorMessage, isValid } = this.state;
    const { classes } = this.props;

    return (
      <>
        <h1 className={classes.heading}> Create Objects</h1>
        <div>
          <TextField
            id="outlined-number"
            label="KeyCount"
            type="number"
            variant="outlined"
            className={classes.root}
            onChange={this.KeyCountChange}
            error={errorMessage.keyCount}
            helperText={errorMessage.keyCount}
            onBlur={() => { this.isTouched('keyCount') }}
          />
          <TextField
            id="outlined-number"
            label="Depth"
            type="number"
            variant="outlined"
            className={classes.root}
            onChange={this.DepthChange}
            error={errorMessage.depth}
            helperText={errorMessage.depth}
            onBlur={() => { this.isTouched('depth') }}
          />
        </div>
        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            className={classes.root}
            disabled={!isValid}
            onClick={() => this.OnClick()}
          >
            Submit
          </Button>
        </div>
        {
          Boolean(Object.keys(dataObject).length) &&
          Object.keys(dataObject).map((element) => {
            if (typeof (dataObject[element]) !== 'object' || Array.isArray(dataObject[element])) {
              return (<h4>{element}{'  :  '}{dataObject[element]}</h4>)
            }
          })
        }
      </>
    );
  }
}

export default withStyles(useStyles)(TextFields);
