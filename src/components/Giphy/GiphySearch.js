import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { giphySearch } from '../../redux/actions/index';

const api = process.env.GIPHY_API || 'http://localhost:3000/api';

const mapStateToProps = state => {
  return {
    randomGiphy: state.giphySearchSuccess,
    isLoading: state.giphyIsLoading,
    hasErrored: state.giphyHasErrored
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     giphySearch: (form, endpoint) => dispatch(giphySearch(form, endpoint))
//   }
// };

class GiphySearch extends Component {
  
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     randomGiphy: ""
  //   }
  // }
  
  // searchGiphy = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const query = {};
  //
  //   for (let entry of formData.entries()) {
  //     query[entry[0]] = entry[1];
  //   }
  //
  //   fetch(`${api}/giphy`,
  //     {
  //       method: 'POST',
  //       body: JSON.stringify(query),
  //       headers: {
  //         "Content-type": "application/json"
  //       }
  //     })
  //     .then(resp => resp.json())
  //     .then(resp => {
  //       const data = resp.data;
  //       console.log('searchGiphy\n', data);
  //       this.setState({
  //         randomGiphy: [data]
  //       })
  //     })
  //     .catch(err => console.log(err));
  // };
  
  saveGiphy = () => {
    const { user } = this.props;
    const url = this.props.randomGiphy.images.fixed_height.url;
    console.log(url, '\n', user)
    const data = {
      user: user,
      url: url
    };
    fetch(`${api}/giphy/${user}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log('saveGiphy\n', resp)
        if (resp === 'EXISTS') {
          alert('already saved this giphy');
        }
      })
      .catch(err => console.log(err));
  };
  
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
      displayGiphy = {
        display: 'flex',
        flexDirection: 'row',
        height: 'fit-content',
        width: 'fit-content',
        margin: 'auto'
      };
    
    return (
      <div id='giphy-search-container' style={container}>
        <div id='giphy-input-container'>
          <Form onSubmit={() => this.test(this,`${api}/giphy`)}>
            <Form.Control name='query' type='text'
                          size='lg' placeholder='search giphys'/>
            <br/>
            <Button type='submit' variant='primary' style={button}>
              Search
            </Button>
          </Form>
        </div>
        <br/>
        <div id='giphys-container' style={displayGiphy}>
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
                <div>
                  {console.log(this.props)}
                  {/*<img src={this.props.randomGiphy[0].images.fixed_height.url} alt={this.props.randomGiphy[0].slug}/>*/}
                </div>
          }
          <br/>
        </div>
        <br/>
        {
          this.props.randomGiphy.length > 0 &&
          <Button variant='success' style={button}
                  onClick={this.saveGiphy}>Save</Button>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(GiphySearch);
