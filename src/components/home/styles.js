import styled from 'styled-components';

export const StyledHomePageContainer = styled.div`
  .top-layer {
    background-color: rgba(0, 0, 0, 0);
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 2;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    flex: 1 1 0%;
    z-index: 1;
    position: relative;
    top: 44px;
    .swap-container {
      position: relative;
      max-width: 480px;
      width: 100%;
      background: ${(props) =>
        props.theme === 'light'
          ? 'rgb(255, 255, 255) none repeat scroll 0% 0%'
          : props.theme.swapContainer};
      box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
        rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
      border-radius: 24px;
      margin-top: 1rem;
      .swap-header-container {
        padding: 1rem 1.25rem 0.5rem;
        width: 100%;
        color: ${(props) => (props.theme === 'light' ? 'rgb(86, 90, 105)' : props.theme.fontColor)};
        .swap-header-wrapper {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          width: 100%;
          display: flex;
          padding: 0px;
          -moz-box-align: center;
          align-items: center;
          -moz-box-pack: justify;
          justify-content: space-between;
          .swap-wrapper {
            box-sizing: border-box;
            margin: 0px;
            min-width: 0px;
            display: flex;
            padding: 0px;
            -moz-box-align: center;
            align-items: center;
            -moz-box-pack: start;
            justify-content: flex-start;
            width: -moz-fit-content;
            .swap-text {
              box-sizing: border-box;
              margin: 0px;
              margin-right: 0px;
              min-width: 0px;
              font-weight: 500;
              font-size: 16px;
            }
          }
          .settings-wrapper {
            box-sizing: border-box;
            margin: 0px;
            min-width: 0px;
            display: flex;
            padding: 0px;
            align-items: center;
            justify-content: flex-start;
            width: -moz-fit-content;
            .settings {
              margin-left: 0.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              border: medium none;
              text-align: left;
              .settings-btn {
                color: ${(props) => props.theme.color};
                position: relative;
                width: 100%;
                border: medium none;
                background-color: transparent;
                margin: 0px;
                padding: 0px;
                border-radius: 0.5rem;
                height: 20px;
              }
            }
          }
        }
      }
      .swap-page-container {
        position: relative;
        padding: 8px;
        .swap-page-wrapper {
          display: grid;
          grid-auto-rows: auto;
          row-gap: 12px;
          .swap-currency-input-class {
            display: flex;
            flex-flow: column nowrap;
            position: relative;
            border-radius: 20px;
            background-color: ${(props) =>
              props.theme === 'light' ? 'rgb(237, 238, 242)' : props.theme.containerShade};
            z-index: 1;
            width: initial;
            .remove-token-selection-icon {
              color: ${(props) => props.theme.color};
              position: absolute;
              right: 8px;
              top: 8px;
              z-index: 1;
              cursor: pointer;
            }
            .elements-container {
              border-radius: 20px;
              background-color: ${(props) => props.theme.inputBackground};
              border: 0;
              width: initial;
              .elements-wrapper {
                display: flex;
                flex-flow: row nowrap;
                -moz-box-align: center;
                align-items: center;
                padding: 1rem 1rem 0.75rem;
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                input[type='number'] {
                  -moz-appearance: textfield;
                }
                .select-button-wrapper {
                  text-align: center;
                  text-decoration: none;
                  display: flex;
                  flex-wrap: nowrap;
                  position: relative;
                  z-index: 1;
                  will-change: transform;
                  transition: transform 450ms ease 0s;
                  transform: perspective(1px) translateZ(0px);
                  -moz-box-align: center;
                  align-items: center;
                  font-size: 24px;
                  font-weight: 500;
                  background-color: ${(props) =>
                    props.theme === 'light'
                      ? props.theme.selectButtonBackground
                      : props.theme.selectButtonBackground};
                  color: rgb(255, 255, 255);
                  border-radius: 16px;
                  box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
                  outline: currentcolor none medium;
                  cursor: pointer;
                  user-select: none;
                  border: medium none;
                  height: 2.4rem;
                  width: initial;
                  padding: 0px 8px;
                  -moz-box-pack: justify;
                  justify-content: space-between;
                  margin-right: 12px;
                  .select-token-container {
                    display: flex;
                    -moz-box-align: center;
                    align-items: center;
                    -moz-box-pack: justify;
                    justify-content: space-between;
                    width: 100%;
                    .select-token-wrapper {
                      box-sizing: border-box;
                      margin: 0px;
                      min-width: 0px;
                      display: flex;
                      padding: 0px;
                      -moz-box-align: center;
                      align-items: center;
                      -moz-box-pack: start;
                      justify-content: flex-start;
                      width: -moz-fit-content;
                      .select-token-text {
                        margin: 0px 0.25rem;
                        font-size: 18px;
                      }
                    }
                    .bottom-arrow {
                    }
                  }
                }
                .token-amount-input {
                  color: ${(props) => props.theme.color};
                  width: 0px;
                  position: relative;
                  font-weight: 500;
                  outline: currentcolor none medium;
                  border: medium none;
                  flex: 1 1 auto;
                  background-color: ${(props) => props.theme.inputBackground};
                  font-size: 24px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  padding: 0px;
                  appearance: textfield;
                  text-align: right;
                }
                .open-currency-select-button {
                  text-align: center;
                  text-decoration: none;
                  display: flex;
                  flex-wrap: nowrap;
                  position: relative;
                  z-index: 1;
                  will-change: transform;
                  transition: transform 450ms ease 0s;
                  transform: perspective(1px) translateZ(0px);
                  -moz-box-align: center;
                  align-items: center;
                  font-size: 24px;
                  font-weight: 500;
                  background-color: ${(props) =>
                    props.theme === 'light' ? props.theme.body : props.theme.swapContainer};
                  color: ${(props) => props.theme.fontColor};
                  border-radius: 16px;
                  box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
                  outline: currentcolor none medium;
                  cursor: pointer;
                  user-select: none;
                  border: medium none;
                  height: 2.4rem;
                  width: initial;
                  padding: 0px 8px;
                  -moz-box-pack: justify;
                  justify-content: space-between;
                  margin-right: 12px;
                  .img-text-container {
                    display: flex;
                    -moz-box-align: center;
                    align-items: center;
                    -moz-box-pack: justify;
                    justify-content: space-between;
                    width: 100%;
                    .img-text-wrapper {
                      box-sizing: border-box;
                      margin: 0px;
                      min-width: 0px;
                      display: flex;
                      padding: 0px;
                      -moz-box-align: center;
                      align-items: center;
                      -moz-box-pack: start;
                      justify-content: flex-start;
                      width: -moz-fit-content;
                      .coin-image {
                        width: 24px;
                        height: 24px;
                        box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
                        border-radius: 24px;
                      }
                      .token-symbol-container {
                        margin: 0px 0.25rem;
                        font-size: 18px;
                      }
                    }
                    .select-currency-svg {
                      margin: 0px 0.25rem 0px 0.35rem;
                      height: 35%;
                    }
                  }
                }
              }
              .price-container {
                display: flex;
                flex-flow: row nowrap;
                -moz-box-align: center;
                align-items: center;
                color: rgb(0, 0, 0);
                font-size: 0.75rem;
                line-height: 1rem;
                padding: 0px 0rem 1rem;
                -moz-box-pack: end;
                justify-content: flex-end;
                .price-wrapper {
                  box-sizing: border-box;
                  margin: 0px;
                  min-width: 0px;
                  width: 100%;
                  display: block;
                  padding: 0px;
                  -moz-box-align: center;
                  align-items: center;
                  -moz-box-pack: justify;
                  justify-content: space-between;
                  position: relative;
                  .price-type {
                    box-sizing: border-box;
                    margin: 0px;
                    min-width: 0px;
                    font-weight: 400;
                    font-size: 14px;
                    color: rgb(86, 90, 105);
                    .price {
                      color: ${(props) => props.theme.color};
                      font-size: inherit;
                    }
                  }
                }
                .price-wrapper-hide {
                  display: none;
                }
              }
              &:hover {
                border: 0;
              }
            }
          }
          .swap-svg-container {
            padding-left: 6px;
            border-radius: 12px;
            height: 32px;
            width: 32px;
            position: relative;
            margin: -10px 0 -8px;
            left: calc(50% - 16px);
            background-color: ${(props) => props.theme.inputBackground};
            border: 0;
            z-index: 2;
            img,
            svg {
              vertical-align: middle;
              height: 20px;
              width: 20px;
            }
            &:hover {
              cursor: pointer;
            }
          }
          .connect-wallet-wrapper {
            .connect-wallet-btn {
              padding: 16px;
              width: 100%;
              text-align: center;
              border-radius: 20px;
              outline: currentcolor none medium;
              border: 1px solid transparent;
              text-decoration: none;
              display: flex;
              -moz-box-pack: center;
              justify-content: center;
              flex-wrap: nowrap;
              -moz-box-align: center;
              align-items: center;
              cursor: pointer;
              position: relative;
              z-index: 1;
              background-color: ${(props) => props.theme.back};
              color: ${(props) => props.theme.connect};
              font-size: 16px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  .percentage-input {
    color: ${(props) => props.theme.color};
    position: relative;
    outline: currentcolor none medium;
    border: medium none;
    flex: 1 1 auto;
    background-color: ${(props) => props.theme.inputBackground};
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
    text-align: right;
  }
  .percentage-text {
    margin-left: 1px;
    color: ${(props) => props.theme.color};
    font-size: 13px;
  }
  .rc-slider-dot {
    box-sizing: content-box;
    position: absolute;
    transform: translateX(0) translateY(10%) rotate(45deg);
    background-color: rgb(24, 26, 32);
    color: rgb(132, 142, 156);
    width: 6px;
    height: 6px;
    border-radius: 2px;
    border: 2px solid rgb(71, 77, 87);
    z-index: 1;
    overflow: visible;
    cursor: pointer;
  }
  .rc-slider-dot-active {
    background-color: #eee;
    width: 7px;
    height: 7px;
    border: 2px solid rgb(71, 77, 87);
  }
  .rc-slider-handle {
    box-sizing: content-box;
    position: absolute;
    transform: translateX(-50%) translateY(-12%) rotate(45deg) !important;
    background-color: rgb(24, 26, 32);
    color: rgb(132, 142, 156);
    width: 10px;
    height: 10px;
    border-radius: 10px;
    border: 4px solid #dedede;
    z-index: 1;
    overflow: visible;
    cursor: pointer;
  }
  .rc-slider-step {
    background-color: rgb(71, 77, 87);
  }
  .rc-slider-track {
    position: absolute;
    z-index: 1;
    height: 5px;
    transform: translateY(-10%);
    background-color: #eee;
  }
  .rc-slider-disabled {
    background-color: unset;
  }
`;
