import React, { Component } from 'react';
import Switch from 'react-switch';
import { StyledManageTokenContainer } from './styles';

class ManageToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ checked: this.props.checked });
  }

  handleChange(checked) {
    this.setState({ checked });
    this.props.toggleCheck(checked);
  }

  render() {
    return (
      <StyledManageTokenContainer>
        <div
          className="row manage-token-body"
          style={{ backgroundColor: this.state.checked ? this.props.color : '#cdcdcd' }}>
          <div className="col-sm-8">
            <div className="manage-token-list-wrapper">
              <img className="manage-token-logo" alt="" src={this.props.src} />
              <div className="manage-token-name-container">
                <div className="manage-token-name">{this.props.name}</div>
                <div className="manage-token-desc">{this.props.desc}</div>
              </div>
              <span />
              <div className="" />
            </div>
          </div>
          <div className="col-sm-4" style={{ textAlign: 'right' }}>
            <div>
              <Switch
                height={38}
                width={78}
                handleDiameter={20}
                onHandleColor={this.props.color}
                offHandleColor="#cdcdcd"
                onColor={this.props.theme === 'light' ? '#f7f8fa' : '#191b1f'}
                offColor={this.props.theme === 'light' ? '#f7f8fa' : '#191b1f'}
                onChange={this.handleChange}
                checked={this.state.checked}
                uncheckedIcon={
                  <div style={{ padding: '7px 0' }}>
                    <p style={{ fontSize: '16px', fontWeight: 500 }}>&nbsp; OFF</p>
                  </div>
                }
                checkedIcon={
                  <div style={{ padding: '7px 0' }}>
                    <p style={{ fontSize: '16px', fontWeight: 500 }}>&nbsp;&nbsp; ON</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </StyledManageTokenContainer>
    );
  }
}

export default ManageToken;
