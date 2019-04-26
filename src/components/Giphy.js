import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";

const api = 'http://localhost:3000/api';

class Giphy extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      giphys: []
    }
  }
  
  searchGiphy = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = {};
    
    for (let entry of formData.entries()) {
      query[entry[0]] = entry[1];
    }
    
    fetch(`${api}/giphy`,
      {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(resp => resp.json())
      .then(resp => {
        const data = resp.data;
        this.setState({
          giphys: [data]
        })
      })
  };
  
  saveGiphy = () => {
    const { user } = this.props;
    const url = this.state.giphys[0].images.fixed_height.url;
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
        if (resp === 'EXISTS') {
          alert('already saved this giphy')
        }
        console.log(resp)
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
      giphys = {
        display: 'flex',
        flexDirection: 'row',
        height: 'fit-content',
        width: 'fit-content',
        margin: 'auto'
      };
    
    return (
      <div id='giphy-container' style={container}>
        <div id='giphy-input-container'>
          <Form onSubmit={this.searchGiphy}>
            <Form.Control name='query' type='text'
                          size='lg' placeholder='search giphys'/>
            <br/>
            <Button type='submit' variant='primary' style={button}>
              Submit
            </Button>
          </Form>
        </div>
        <br/>
        <div id='giphys-container' style={giphys}>
          {
            this.state.giphys.map((giphy, i) =>
              <div key={i}>
                <img src={giphy.images.fixed_height.url} alt={giphy.slug}/>
              </div>
            )
          }
        </div>
        <br/>
        {
          this.state.giphys.length > 0 &&
          <Button variant='success' style={button}
                  onClick={this.saveGiphy}>Save</Button>
        }
      </div>
    );
  }
}

export default Giphy;
