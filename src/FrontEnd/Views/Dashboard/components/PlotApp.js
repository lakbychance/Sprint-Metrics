import React, { Component } from 'react';
import Plot from 'react-plotly.js'
import {config} from "../../../../config"
class PlotApp extends Component
{
    constructor(props)
    {
        super(props)
        this.state=
        {
            displayAllData:[]
        }
    }
    componentDidMount()
    {
        const url = config.host+config.urls.read
         let axios = require("axios")
        axios.get(url).then((response)=>this.setState({displayAllData:response.data},()=>console.log(this.state.displayAllData)))

    }
    render()
    {
        let sprintNames=[]
        let totals=[]
        let orderValues=[]
        let dataAll = [...this.state.displayAllData].sort(function(a,b)
        {
            return JSON.parse(a).sprint.split("Sprint")[1]-JSON.parse(b).sprint.split("Sprint")[1]
        }) 
        dataAll.map(data=>
        {
           sprintNames.push(JSON.parse(data).sprint)
            totals.push(JSON.parse(data).total)
        })
      
      
        console.log(sprintNames, totals,orderValues)
        return(
            <div>
                 <Plot
        data={[
         
          {type: 'scatter', x: sprintNames, y: totals},
          {type: 'bar', x: sprintNames, y: totals}
        ]}
        layout={ {width: 820, height: 440, title: 'Sprint-Metrics Plot',} }
      />
    </div>
        )
    }
}
export default PlotApp;