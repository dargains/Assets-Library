import React from "react";
import Chart from "./Chart";

export default class EditBook extends React.Component{
  constructor(props) {
    super();
    var view = this;
    this.state = {
      chartData: [],
      bookId: props.location.query.key,
      bookName: "",
      usersDB: props.route.database.ref().child("users"),
      booksDB: props.route.database.ref().child("books"),
    }
    this.getChartData = this.getChartData.bind(this);
  }
  componentWillMount(){
    var view = this,
        name = "";
    this.state.booksDB.on("value", snapshot => {
      view.getChartData(snapshot);
      name = snapshot.val()[view.state.bookId].title;
      view.setState({bookName: name})
    });
  }
  getChartData(snapshot){
    var view = this;
    var data = []
    var logObj = snapshot.val()[this.state.bookId].log,
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
        <h2>{this.state.bookName}</h2>
        <Chart data={this.state.chartData}/>
      </div>
    )
  }
}
