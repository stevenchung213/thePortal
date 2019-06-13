import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from "react-bootstrap/Card";
import { giphysGetCollection } from "../../redux/actions/giphys";

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
  
  componentDidMount() {
    const { user } = this.props;
    console.log('giphy component did mount')
    this.props.giphysGetCollection(`${api}/giphy/${user}`);
  }
  
  render() {
    const container = {
        display: 'flex', flexDirection: 'column', height: 'fit-content',
        width: 'fit-content', margin: 'auto', paddingTop: 56
      },
      giphysContainer = {
        display: 'flex', margin: 'auto', padding: '2vh 2vw'
      },
      button = {
        width: '100%', borderRadius: '3rem', fontSize: '1.25rem'
      },
      giphysList = {
        display: 'flex', flexDirection: 'row', height: 'fit-content', width: 'fit-content', margin: 'auto'
      },
      deleteButton = {
        borderRadius: 20, margin: '1vh', padding: '1vh', float: 'right', backgroundColor: 'red'
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
              <div id={`giphys-container`} style={giphysContainer}>
                <CardColumns>
                  {
                    this.props.giphys.map((url, i) =>
                      <Card key={i}>
                        <Card.Img src={url} alt={`my-giphy-${i}`}
                                  variant='top'/>
                        <Button variant='outline-danger' style={deleteButton}/>
                      </Card>)
                  }
                </CardColumns>
              </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Giphy);
