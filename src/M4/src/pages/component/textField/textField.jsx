import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

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
      dataObject: {}
    }
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
    // console.log('hhkhkhkhkh', unsortObject)

    const { data } = unsortObject.data;
    const parsedObject = JSON.parse(JSON.stringify(data));

    this.setState({
      dataObject: parsedObject,
    });
  }

  render() {
    const { dataObject } = this.state;
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

          />
          <TextField
            id="outlined-number"
            label="Depth"
            type="number"
            variant="outlined"
            className={classes.root}
            onChange={this.DepthChange}
          />
        </div>
        <div className={classes.button}>
          <Button variant="contained" color="primary" className={classes.root} onClick={() => this.OnClick()}>
            Submit
          </Button>
        </div>
        {Boolean(Object.keys(dataObject).length) &&
          Object.keys(dataObject).map((element) => {
            if (typeof (dataObject[element]) !== 'object' || Array.isArray(dataObject[element])) {
              return (<h4>{element}{'  :  '}{dataObject[element]}</h4>)
            }
          })}

      </>
    );
  }
}

export default withStyles(useStyles)(TextFields);
