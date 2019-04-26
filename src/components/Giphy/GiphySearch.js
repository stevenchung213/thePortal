import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const GiphySearch = ({giphys}) => {
  return (
    <div id='giphy-search-container'>
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
        <br/>
        {
          this.state.giphys.length > 0 &&
          <Button variant='success' style={button}
                  onClick={this.saveGiphy}>Save</Button>
        }
      </div>
    </div>
  );
};

export default GiphySearch;
