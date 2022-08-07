'use strict';

const e = React.createElement;

class AANQ extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { queried: false, json: {} };
  }

  fetchAAN() {
    fetch('https://www.thedatazone.ca/resource/a859-xvcs.json?aan=07880782')
      .then(response => response.json())
      .then(data => this.setState({ json: data[0], queried: true }));
      //.then(data => console.log(data));
  }

  render() {
    const addr_fields = ['address_num','address_street','address_suffix','address_city'];
    if (this.state.queried) {
      console.log(this.state.json);
      let addr = '';
      for (const key of addr_fields) {
        addr = addr + this.state.json[key] + ' ';
      }
      return 'Address ' + addr;
    }

    return e(
      'button',
      { onClick: () => this.fetchAAN() },
      'get AAN data'
    );
  }
}

const domContainer = document.querySelector('#react_test');
const root = ReactDOM.createRoot(domContainer);
root.render(e(AANQ));

