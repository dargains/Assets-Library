import React from "react";
import Chart from "./Chart";

export default class EditBook extends React.Component{
  constructor(props) {
    super();
    this.state = {
      chartData: [],
      usersDB: props.route.database.ref().child("users"),
      booksDB: props.route.database.ref().child("books"),
    }
  }
  componentWillMount(){
    var view = this;
    this.state.booksDB.on("value", snapshot => {view.getChartData(snapshot);});
  }
  getChartData(snapshot){
    var view = this;
    var data = []
    var logObj = snapshot.val()["uheiwlhfuloiwa"].log,
        usersArray = [],
        counts={};
    for(let item in logObj){
      usersArray.push(logObj[item].user)
    }
    for(var i = 0; i< usersArray.length; i++) {
      var num = usersArray[i];
      counts[num] = (counts[num] || 0) + 1;
    }
    for(let item in counts) {
      data.push({name: item, value: counts[item]})
    }
    view.setState({
      chartData: data
    })
  }
  render() {
    return (
      <div className="editBook">
        <h1>edit book</h1>
        <Chart data={this.state.chartData}/>
      </div>
    )
  }
}
