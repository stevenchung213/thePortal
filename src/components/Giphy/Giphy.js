import React, { Component } from 'react';
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { giphysGetCollection } from "../../redux/actions";

const api = process.env.GIPHY_API || 'http://localhost:3000/api';

const mapStateToProps = state => {
  return {
    giphys: state.giphysGetSuccess,
    isLoading: state.giphysAreLoading,
    hasErrored: state.giphysHasErrored
  }
};

const mapDispatchToProps = dispatch => {
  return {
    giphysGetCollection: endpoint => dispatch(giphysGetCollection(endpoint))
  }
};

class Giphy extends Component {
  
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     giphys: [],
  //     isLoading: false,
  //     hasErrored: false
  //   }
  // }
  
  componentDidMount() {
    const { user } = this.props;
    console.log('giphy component did mount')
    this.props.giphysGetCollection(`${api}/giphy/${user}`);
    // const { user } = this.props;
    // fetch(`${api}/giphy/${user}`)
    //   .then(resp => resp.json())
    //   .then(resp => {
    //     this.setState({ giphys: resp });
    //   })
    //   .catch(err => console.log(err));
  }
  
  render() {
    const container = {
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        width: 'fit-content',
        margin: 'auto',
        paddingTop: 56
      },
      button = {
        width: '100%',
        borderRadius: '3rem',
        fontSize: '1.25rem'
      },
      giphysList = {
        display: 'flex',
        flexDirection: 'row',
        height: 'fit-content',
        width: 'fit-content',
        margin: 'auto'
      };
    
    return (
      <div id='giphy-home-container' style={container}>
        {
          this.props.hasErrored ?
            <p>
              Sorry! There was an error while loading your giphys...
            </p>
            :
            this.props.isLoading ?
              <p>
                Loading...
              </p>
              :
              this.props.giphys.map((url, i) =>
                <div key={i}>
                  <img src={url} alt={`giphy-${i}`}/>
                </div>
              )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Giphy);
