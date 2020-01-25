import React, { Component } from 'react';
import {
  Table, Button
} from 'react-bootstrap';


import { get } from '../../utils';


class MyTable extends Component {

  state = {
    problems: [],
    filterOptions: this.props.filterOptions,
  }

  async componentDidUpdate (prevProps) {
    if (prevProps === undefined || prevProps.filterOptions.difficulties.join(',') !==
        this.props.filterOptions.difficulties.join(',') ||
        prevProps.filterOptions.tags.join(',') !== this.props.filterOptions.tags.join(','))
    {
      await this.setState({...this.state, filterOptions: this.props.filterOptions});
      this.updateTable();
    }
  }

  componentDidMount () {
    this.updateTable();
  }

  async updateTable () {
    let problems = await get('problem');
    let filteredProbems = [];

    problems.data.forEach(prob => {
      if ((this.state.filterOptions.difficulties.length === 0 ||
            this.state.filterOptions.difficulties.map(diff => diff[0]).includes(prob.difficulty)) &&
          (this.state.filterOptions.tags.length === 0 ||
            prob.tags.some(tag => this.state.filterOptions.tags.map(tag => tag.id).includes(tag))))
        filteredProbems.push({_id: prob._id, id: prob.id, name: prob.name, difficulty: prob.difficulty});
    });
    this.setState({...this.state, problems: filteredProbems});
  }

  render () {
    return (
      <Table striped size="sm" key={this.props.filterOptions}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Difficulty</th>
          </tr>
          {this.state.problems.map((prob, i) => (
            <tr key={i}>
              <td>{prob.id}</td>
              <td><Button className="py-0" variant="link"
                    onClick={() => this.props.history.push('/'+prob._id)}>{prob.name}</Button></td>
              <td>{prob.difficulty}</td>
            </tr>
          ))}
        </thead>
      </Table>
    );
  }
}

export default MyTable;