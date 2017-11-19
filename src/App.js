import React, {Component} from 'react';
import QRCode from 'qrcode-react';
import WAValidator from 'wallet-address-validator';
import './App.css';

class App extends Component {
  state = {
    size: 300,
    value: '16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM',
    validate: true,
    qrCodeValues: {
      size: 300,
      value: '16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM'
    }
  }

    check = (s) => {
    if (s.length < 26 || s.length > 35) {
      return false;
    }
    let re = /^[A-Z0-9]+$/i;
    if (!re.test(s)) {
      return false;
    }
    return true;
  };

  generateQRCode = () => {
    if (WAValidator.validate(this.state.value)) {
      this.setState({
        validate: true,
        qrCodeValues: {
            value: this.state.value,
            size: this.state.size
        }
      })
    } else {
      this.setState({
        validate: false
      })
    }

  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.generateQRCode();
    }
  }

  render() {
    console.log(this.state.validate);
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
              <img src="/bitcoincash-white.png" width="50" height="50" />
              <span> Bitcoin QR Code Generator</span>
          </a>
          </nav>
          <div className="container" style={{padding: '20px'}}>
          <div>{
                !this.state.validate && 
                  <span style={{color: 'red'}}>You bitcoin address is not valid</span>
              }
            </div>
          <div className="row">
          <div className="col"  style={{paddingTop: '30px'}}>
            <div>Your Bitcoin Address:</div>
            <div className="input-group" style={{width: '350px'}}>
              <input type="text" value={this.state.value} 
                  onChange={(event) => {
                     this.setState({value: event.target.value})
                  }
                  }
                  onKeyPress={this.handleKeyPress}
              className="form-control" />
            </div>
            </div>
            <div className="col"  style={{paddingTop: '30px'}}>
            <div>Size:</div>
            <div className="input-group">
              <input type="number" 
                onChange={(event) => {
                  this.setState({size: event.target.value})
                  }
                }
                onKeyPress={this.handleKeyPress}
                
                className="form-control" 
                value={this.state.size} />
            </div>
            </div>
            <div className="col" style={{paddingTop: '30px'}}>
            <button 
                style={{
                  marginTop: '20px',
                  marginBottom: '20px'
                }}
                type="button" 
                onClick={this.generateQRCode}className="btn btn-primary">
              Generate QR Code
            </button>
            <button type="button" onClick={window.print}className="btn btn-primary">
              Print QR CODE
            </button>
            </div>
            </div>
            <div>Currently showing QR Code for: </div>
              <div style={{padding: '10px'}}>
                <div style={{padding: '5px'}}>
                  <span>Address: </span>
                  <span className="address">{this.state.qrCodeValues.value}</span></div>
                <div style={{padding: '5px'}}>
                  <span>Size: </span>
                  <span span className="address">{this.state.qrCodeValues.size}</span></div>
                </div>
            <div className="row">
            <div id="section-to-print" style={{paddingTop: '30px'}}>
                <h1>
                  <img src="/bitcoincash-white.png" width="50" height="50" />
                   <span> <i>bitcoin cash accepted here</i></span>
                </h1>
                <QRCode value={this.state.qrCodeValues.value} size={this.state.qrCodeValues.size} />
                <h1>
                  <img src="/bitcoincash-white.png" width="50" height="50" />
                   <span> <i>bitcoin cash accepted here</i></span>
                </h1>
              </div>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
