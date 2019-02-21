import React, {Component} from 'react';
import { Card, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';
import {
    PrimaryText, 
    Curved,
    FooterStyle} from "../componentStyles/dashboardStyles";

export class LogSnapshot extends Component  {
    render() {
  return (
    <div>
      <Card style = {Curved}>
        <CardBody>
          <CardTitle>John Smith</CardTitle>
          <PrimaryText>2.50 </PrimaryText>
          <CardText>2/7/19</CardText>
        </CardBody>
        <CardFooter className="text-muted" style={FooterStyle}>View Invoice</CardFooter>
      </Card>
    </div>
  )
    }
}

export default LogSnapshot;