import React, { Component } from 'react';
import './safefarm.css';
import info from '../Assets/info.svg';
import checkbox from '../Assets/checkbox.svg';

export default class safefarm extends Component {
  render() {
    return (
      <div className="home-main-container">
        <div className="main-container-safe">
          <div className="heading"> Safe Farms</div>
          <div className="form-process">
            <span className="form-p-black">Get started / Select a blockchain /</span>
            <span className="form-p-white"> Safe Farm Project Dashboard</span>{' '}
          </div>
          <div className="form-heading"> Fill out the form </div>

          <div className="form-data">
            <div>
              <input
                className="inputfield"
                type="text"
                placeholder="Project Ticker"
                spellCheck="false"
              />{' '}
            </div>
            <div>
              {' '}
              <input
                className="inputfield"
                type="text"
                placeholder="Project name"
                spellCheck="false"
              />
            </div>
            <div>
              {' '}
              <input
                className="inputfield"
                type="text"
                placeholder="Contract address"
                spellCheck="false"
              />
            </div>
            <div>
              {' '}
              <input
                className="inputfield"
                type="text"
                placeholder="Farming duration (in weeks)"
                spellCheck="false"
              />
            </div>
            <div>
              {' '}
              <input
                className="inputfield"
                type="text"
                placeholder="Amount of tokens (>0)"
                spellCheck="false"
              />
            </div>
            <div className="custominput">
              {' '}
              <input
                className="inputfield1"
                type="text"
                placeholder="Fee on deposit(from 0 to 100)"
                spellCheck="false"
              />{' '}
              <div className="Percentage">
                {' '}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.406781 2.85C0.406781 2.19133 0.597448 1.67567 0.978781 1.303C1.36878 0.930333 1.86711 0.744 2.47378 0.744C3.08045 0.744 3.57445 0.930333 3.95578 1.303C4.34578 1.67567 4.54078 2.19133 4.54078 2.85C4.54078 3.51733 4.34578 4.03733 3.95578 4.41C3.57445 4.78267 3.08045 4.969 2.47378 4.969C1.86711 4.969 1.36878 4.78267 0.978781 4.41C0.597448 4.03733 0.406781 3.51733 0.406781 2.85ZM8.75278 0.899999L3.64378 10H1.87578L6.97178 0.899999H8.75278ZM2.46078 1.836C1.98411 1.836 1.74578 2.174 1.74578 2.85C1.74578 3.53467 1.98411 3.877 2.46078 3.877C2.69478 3.877 2.87678 3.79467 3.00678 3.63C3.13678 3.45667 3.20178 3.19667 3.20178 2.85C3.20178 2.174 2.95478 1.836 2.46078 1.836ZM6.11378 8.037C6.11378 7.36967 6.30445 6.854 6.68578 6.49C7.07578 6.11733 7.57411 5.931 8.18078 5.931C8.78745 5.931 9.27712 6.11733 9.64978 6.49C10.0311 6.854 10.2218 7.36967 10.2218 8.037C10.2218 8.70433 10.0311 9.22433 9.64978 9.597C9.27712 9.96967 8.78745 10.156 8.18078 10.156C7.56545 10.156 7.06711 9.96967 6.68578 9.597C6.30445 9.22433 6.11378 8.70433 6.11378 8.037ZM8.16778 7.023C7.67378 7.023 7.42678 7.361 7.42678 8.037C7.42678 8.72167 7.67378 9.064 8.16778 9.064C8.65312 9.064 8.89578 8.72167 8.89578 8.037C8.89578 7.361 8.65312 7.023 8.16778 7.023Z"
                    fill="white"
                  />
                </svg>
              </div>{' '}
            </div>
            <div>
              {' '}
              <input className="inputfield" type="text" placeholder="Website" />
            </div>
          </div>

          <div className="bottom-box">
            <div>
              <div className="bottom-1">
                {' '}
                <img src={checkbox} alt="Checkbox" />{' '}
                <div className="bottom-text"> Vesting schedule for rewards? </div>{' '}
                <div className="info">
                  {' '}
                  <img src={info} alt="" />
                  <span className="tooltiptext">
                    A vesting schedule of 10%-100% over the duration of the contract. If the user
                    interrupts the vesting schedule early by claiming and withdrawing their rewards
                    they forfeit the remaining unvested tokens.{' '}
                    <span className="yes-text">If yes, tick the box</span>
                  </span>
                </div>
              </div>
              <div className="bottom-1">
                {' '}
                <img src={checkbox} alt="checkbox" />{' '}
                <div className="bottom-text"> Halving schedule? </div>{' '}
                <div className="info1">
                  <img src={info} alt="" />
                  <span className="tooltiptext1">
                    {' '}
                    A halving schedule for the duration of the contact. Halving events based on the
                    supply emission.
                    <br />
                    1st Halving at ½ the supply emitted.
                    <br />
                    2nd Halving at ¾ the supply.
                    <br />
                    Halving cuts the emission rate in half at each predetermined landmark.
                    <span className="yes-text"> If yes, tick the </span>{' '}
                    <span className="box-color">box </span>{' '}
                  </span>
                </div>{' '}
              </div>
            </div>
            <div className="end">
              <div className="submit">
                {' '}
                <button className="submit-btn">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
