import React, { Component } from 'react';
import Plot from 'react-plotly.js'
class Display extends Component
{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        let sprintNames=[]
        let totals=[]
        let orderValues=[]
        let dataAll = [...this.props.displayAllData].sort(function(a,b)
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
        layout={ {width: 720, height: 440, title: 'V-Metrics Plot',} }
      />
    </div>
        )
    }
}
export default Display;