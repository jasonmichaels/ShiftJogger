import React, { Component } from 'react'
//third party
import { 
    Button
 } from "reactstrap";
import {
  Link
} from "react-router-dom"
//local
import { 
    BannerLog, 
    BannerButton
    } from "../componentStyles/bannerLogStyles";


export class DashboardBannerSummary extends Component {
  render() {
    return (
      <BannerLog>
        <p>Hours Worked:</p>
        <h1>5.75</h1>
        <Link
          to={"/newlog"} >
        <Button style={BannerButton}>New Log</Button>
        </Link>
      </BannerLog>
    )
  }
}

export default DashboardBannerSummary
