import React, { Component } from 'react';
import {
  Container
} from 'react-bootstrap';


import Filter from './Filter';
import Table from './Table';



class Home extends Component {

  state = {
    filterOptions: {tags: [], difficulties: []},
  }

  render () {
    return (
      <Container style={{position: 'relative'}}>
        <h3>hello</h3>
        <Filter onApply={newOptions =>
          this.setState({...this.state, filterOptions: newOptions})}/>
        <Table filterOptions={this.state.filterOptions} {...this.props}/>
      </Container>
    );
  }
}

export default Home;