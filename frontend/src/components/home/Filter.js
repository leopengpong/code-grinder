import React, { Component } from 'react';
import {
  Button, Form, Dropdown
} from 'react-bootstrap';

import { get } from '../../utils';
import './Filter.css';




class Filter extends Component {

  state = {
    availableTags: [],
    filterOptions: {
      tags: [],
      difficulties: [],
    }
  }

  async componentDidMount () {
    let tags = await get('tag');
    this.setState({...this.state, availableTags: tags.data});
  }

  async toggleTag (toToggleId, toToggleName) {
    let found = false;
    let newTags = [];
    this.state.filterOptions.tags.forEach(tag => {
      if (tag.id === toToggleId)
        found = true;
      else
        newTags.push(tag);
    });
    if (!found)
      newTags.push({id: toToggleId, name: toToggleName});
    await this.setState({...this.state, filterOptions: {
      ...this.state.filterOptions, tags: newTags}});
    console.log(this.state);
  }

  toggleDiff (toToggle) {
    let found = false;
    let newDiffs = [];
    this.state.filterOptions.difficulties.forEach(diff => {
      if (diff === toToggle)
        found = true;
      else
        newDiffs.push(diff);
    });
    if (!found)
      newDiffs.push(toToggle);
    this.setState({...this.state, filterOptions: {
      ...this.state.filterOptions, difficulties: newDiffs}});
  }

  render () {
    return (

      <div id="wrapper">
        <div>{this.state.filterOptions.tags.map(tag => tag.name)}</div>
        <div>{this.state.filterOptions.difficulties}</div>

        <Form onSubmit={e => {e.preventDefault(); this.props.onApply(this.state.filterOptions)}}>
          <Dropdown variant="secondary">
            <Dropdown.Toggle>Tags</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.availableTags.map((tag, i) => 
                <Dropdown.Item key={i} onClick={() => this.toggleTag(tag._id, tag.name)}>
                  {tag.name}</Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown variant="primary">
            <Dropdown.Toggle>Difficulties</Dropdown.Toggle>
            <Dropdown.Menu>
              {['easy', 'medium', 'hard'].map((diff, i) => 
                <Dropdown.Item key={i} onClick={() => this.toggleDiff(diff)}>
                  {diff}</Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>
          <Button type="submit" variant="primary">apply</Button>
        </Form>
      </div>
    );
  }
}

export default Filter;