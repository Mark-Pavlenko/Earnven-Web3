import React from "react";
import {StyledCurrencyContainer} from "./styles";
import PropTypes from 'prop-types';

function Currency({src, name, desc, isImported, toggleIsShowWarning}) {
    return (
        <StyledCurrencyContainer isImported={isImported}>
            <div className="row">
                <div className={isImported ? "col-sm-8" : "col-sm-12"}>
                    <div className="currency-list-wrapper">
                        <img className="currency-logo" alt="" src={src}/>
                        <div className="currency-name-container">
                            <div title="" className="currency-name">
                                {name}
                            </div>
                            <div className="currency-desc">{desc}</div>
                        </div>
                        <span></span>
                        <div className=""></div>
                    </div>
                </div>
                {isImported && <div className="col-sm-4" style={{textAlign: "right"}}>
                    <button className="import-button" onClick={toggleIsShowWarning}>
                        Import
                    </button>
                </div>}
            </div>
        </StyledCurrencyContainer>
    );
}

Currency.propTypes = {
    src: PropTypes.any,
    name: PropTypes.any,
    desc: PropTypes.any,
    isImported: PropTypes.any,
    toggleIsShowWarning: PropTypes.any
}

export default Currency;
