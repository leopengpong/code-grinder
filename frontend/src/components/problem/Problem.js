import React, { Component } from 'react';
import {
  Row, Col, Container, Tabs, Tab
} from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/monokai';


import { get, post } from '../../utils';
import Page404 from '../404/404';




class Problem extends Component {

  state = {
    problemId: this.props.match.params.problemId,
  }

  async componentDidMount () {
    let problem;
    try {
      problem = await get('problem/'+this.state.problemId);
      this.setState({...this.state, problem: problem.data});
    }
    catch (e) {
      this.setState({...this.state, problem: 404});
    }
  }

  onCodeChange = (newVal, solI) => {
    let newSols = this.state.problem.solutions.map((sol, i) => i === solI ? newVal : sol);
    this.setState({...this.state, problem: {...this.state.problem, solutions: newSols}});
  }

  render () {
    return !this.state.problem ? (
      <h1>loading...</h1>
    ) : this.state.problem === 404 ? <Page404 /> :

    <Container fluid><br/>
      <Row>
        <Col md="3">
          <h4>{this.state.problem.name}</h4>
          <p>{this.state.problem.description}</p>
        </Col>
        <Col>
          <Tabs defaultActiveKey={0}>
            {this.state.problem.solutions.map((sol, i) => (
              <Tab key={i} eventKey={i} title={`Solution ${i+1}`}>
                <AceEditor mode="javascript" theme="monokai" width="100%"
                  fontSize="16px" value={this.state.problem.solutions[i]}
                  onChange={newVal => this.onCodeChange(newVal, i)}
                />
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  }
}

export default Problem;