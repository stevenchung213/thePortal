import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";

class Giphy extends Component {
  
  constructor() {
    super();
    
    this.state = {
      userInput: '',
      giphys: []
    }
  }
  
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      userInput: e.target.value
    })
  };
  
  giphySearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    
    for (let entry of formData.entries()) {
      data[entry[0]] = entry[1]
    }
    
    fetch('http://localhost:3000/giphy',
      {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(resp => resp.json())
      .then(resp => {
        const data = resp.data;
        this.setState({
          giphys: data
        })
      })
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
          <Form onSubmit={this.giphySearch}>
            <Form.Control name='query' type='text'
                          size='lg' placeholder='search giphys'/>
            <br/>
            <Button type='submit' variant='primary' style={button}>
              Submit
            </Button>
          </Form>
        </div>
        <div id='giphys-container' style={giphys}>
          {
            this.state.giphys.map((giphy, i) =>
              <div key={i}>
                <img src={giphy.images.original.url} alt={giphy.slug}/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Giphy;
