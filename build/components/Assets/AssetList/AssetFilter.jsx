import React from "react";

class AssetFilter extends React.Component {
  constructor(props){
    super();
    this.state = {

    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleAssetChange = this.handleAssetChange.bind(this);
  }
  handleSearchInput(e) {
    this.props.onSearchInput(e.target.value);
  }
  handleAssetChange() {
    var newList = [];
    [...document.getElementsByClassName('assetType')].forEach(function(item) {
      if (item.checked) newList.push(item.value)
    })
    this.props.onTypeChange(newList);
  }
  render() {
    return (
      <div className="row">
        <div className="col s12 m3 ">
          <p>
            <input type="checkbox" className="filled-in assetType" id="books" value="books" defaultChecked onChange={this.handleAssetChange}/>
            <label htmlFor="books">Books</label>
          </p>
          <p>
            <input type="checkbox" className="filled-in assetType" id="devices" value="devices" defaultChecked onChange={this.handleAssetChange}/>
            <label htmlFor="devices">Devices</label>
          </p>
        </div>
        <div className="input-field col s12 m5">
          <i className="material-icons prefix">search</i>
          <input type="text" id="search-input" className="autocomplete" onChange={this.handleSearchInput}/>
          <label htmlFor="search-input">Search</label>
        </div>
        <div className="switch col s12 m3">
          <p>Show unavailable assets</p>
          <label>
            Off
            <input type="checkbox" defaultChecked onClick={this.props.onShowRentedClick}/>
            <span className="lever"></span>
            On
          </label>
        </div>
      </div>
    )
  }
}
export default AssetFilter;
