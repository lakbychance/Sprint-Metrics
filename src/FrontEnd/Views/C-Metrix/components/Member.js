import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
class Member extends Component{
    constructor(props)
    {
        super(props);
        
        this.addMember=this.addMember.bind(this)
        this.deleteMember= this.deleteMember.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
   componentDidMount()
   {
    let buttons  = [...document.getElementsByName("delete"+this.props.id)]
    console.log(buttons)
    buttons.map(button => 
    {
    button.style.display = "none"
    })
   }
   componentDidUpdate()
   {
    let buttons  = [...document.getElementsByName("delete"+this.props.id)]
    buttons.map(button => 
    {
    button.style.display = "none"
    })
   }
 
addMember()
{
    const data = this.props.data
    console.log(data)
    if(data[data.length-1].name.length!==0)
    {this.props.addNewMember(this.props.id)}
else{
    alert("Please proceed after adding a member name")
}
}
deleteMember(index)
{
if(this.props.data.length>1)
{
 let prevData = this.props.data
 let dataToRemove = prevData[index]
 let updatedData=prevData.filter(data=>data!==dataToRemove)

 this.props.saveMemberData(updatedData,this.props.id)
}
}
makeDeleteVisible(id)
{
    let buttons  = [...document.getElementsByName("delete"+id)]
    buttons.map(button => 
    {
    if(button.style.display=="none")
    {
        button.style.display="block"
    }
    else{
        button.style.display="none"
    }
    })
    
    
}

handleChange(index,event){
    let {value,name} = event.target
    let flag = false;
    let regNum = new RegExp('^[0-9]+[.]?[0-9]*[\b]*$');
    let regName = new RegExp('^[a-z]*[A-Z]*')
    const updatedData = this.props.data
    const updatedItem = updatedData[index]
    if(name==="days" || name==="capacity")
    {
        if(!regNum.test(value)&&value.length!==0)
        {
            flag=true;
            //alert("Please only enter numeric value")
        }
    }
    (flag===false)?updatedItem[name] = value:updatedItem[name]=value.substr(0,value.length-1);
    this.props.saveMemberData(updatedData,this.props.id)
}

 render()
 {
    
     
     return(
        <div className = "member">
        <div className = "table-responseive ">
            <table className="table-condensed">
            <tbody>
                <tr>
                    <th></th>
                    <th>Name <Button className="Add" size="small" variant="success" onClick = {this.addMember}>+</Button>
                    <span>  </span><Button className="Delete" size="small" variant="danger" onClick = {this.makeDeleteVisible.bind(this,this.props.id)}>-</Button></th>
                    <th>Days</th>
                    <th>Capacity</th>
                    <th>Total</th>
                </tr>
                
                {this.props.data.map((member,index)=>
                        
                        <tr key = {index}>
                        <td><Button name = {`${"delete"}${this.props.id}`} className = "btn btn-danger btn-sm" onClick={this.deleteMember.bind(this,index)}>X</Button></td>
                        <td><input name = "name" value={member.name} onChange={this.handleChange.bind(this,index)}/></td>
                        <td><input name ="days" value = {member.days} onChange={this.handleChange.bind(this,index)}/></td>
                        <td><input name="capacity" value = {member.capacity} onChange={this.handleChange.bind(this,index)}/></td>
                        <td style = {{textAlign:"center"}}>{member.days.length!==0&&member.capacity.length!==0?
                        (parseFloat(member.days)*parseFloat(member.capacity)).toPrecision(3):0}
                        </td>
                        </tr>
                        
            )
        }
        </tbody>
            </table>
            </div>
            <h5>Total: {this.props.id==="dev"?this.props.totalDev:this.props.totalTest} </h5>
         </div>
     );
 }
 
}
export default Member;