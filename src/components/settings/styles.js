import styled from "styled-components";

export const StyledSettings = styled.div`
    .transaction-settings-container 
    {
        padding: 1rem;
        background-color: ${props => props.theme === 'light' ? props.theme.settings : props.theme.body};
        border: 1px solid rgb(206, 208, 217);
        box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        position: absolute;
        top: 2rem;
        right: 0rem;
        z-index: 100;
        user-select: none;
        width: 300px;
        .transaction-settings-wrapper 
        {
            display: grid;
            grid-auto-rows: auto;
            row-gap: 12px;
            .transaction-text 
            {
                box-sizing: border-box;
                margin: 0px;
                min-width: 0px;
                font-weight: 600;
                color: ${props => props.theme === 'light' ? props.theme.settingText : props.theme.fontColor};
                font-size: 14px;
            }
            .slippage-and-transaction-container 
            {
                display: grid;
                grid-auto-rows: auto;
                row-gap: 12px;
                input[type="number"] 
                {
                    -moz-appearance: textfield;
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button 
                {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .slippage-tolerance-container 
                {
                    display: grid;
                    grid-auto-rows: auto;
                    row-gap: 8px;
                    .slippage-tolerance-wrapper 
                    {
                        box-sizing: border-box;
                        margin: 0px;
                        min-width: 0px;
                        display: flex;
                        padding: 0px;
                        align-items: center;
                        justify-content: flex-start;
                        width: fit-content;
                        .slippage-tolerance-header 
                        {
                            box-sizing: border-box;
                            margin: 0px;
                            min-width: 0px;
                            font-weight: 400;
                            color: ${props => props.theme === 'light' ? props.theme.settingText : props.theme.fontColor};
                            font-size: 14px;
                        }
                    }
                    .btn-input-wrapper 
                    {
                        margin: 0px;
                        min-width: 0px;
                        width: 100%;
                        display: flex;
                        padding: 0px;
                        align-items: center;
                        justify-content: space-between;
                        .auto-btn 
                        {
                            align-items: center;
                            height: 2rem;
                            border-radius: 36px;
                            font-size: 1rem;
                            width: auto;
                            min-width: 3.5rem;
                            border: 1px solid rgb(206, 208, 217);
                            outline: none;
                            background: ${props => props.theme === 'light' ? props.theme.selectButtonBackground : props.theme.selectButtonBackground};
                            margin-right: 8px;
                            color: ${props => props.theme === 'light' ? props.theme.color : props.theme.color};
                        }
                        .input-btn1 {
                            color: rgb(0, 0, 0);
                            align-items: center;
                            border-radius: 36px;
                            font-size: 1rem;
                            width: auto;
                            min-width: 3.5rem;
                            border: 1px solid rgb(206, 208, 217);
                            outline: none;
                            background: ${props => props.theme === 'light' ? props.theme.inputBackground : props.theme.inputBackground};
                            height: 2rem;
                            position: relative;
                            .transaction-percentage 
                            {
                                box-sizing: border-box;
                                margin: 0px;
                                min-width: 0px;
                                width: 100%;
                                display: flex;
                                padding: 0px;
                                -webkit-box-align: center;
                                align-items: center;
                                -webkit-box-pack: justify;
                                justify-content: space-between;
                                color: ${props => props.theme === 'light' ? props.theme.color : props.theme.color};
                                .input-field 
                                {
                                    width: 100%;
                                    height: 100%;
                                    border: 0px;
                                    border-radius: 2rem;
                                    background: ${props => props.theme === 'light' ? props.theme.inputBackground : props.theme.inputBackground};
                                    font-size: 16px;
                                    width: auto;
                                    outline: none;
                                    color: ${props => props.theme === 'light' ? props.theme.color : props.theme.color};
                                    text-align: right;
                                }
                            }
                        }
                    }
                }
                .transaction-deadline-container 
                {
                    display: grid;
                    grid-auto-rows: auto;
                    row-gap: 8px;
                    .transaction-deadline-wrapper 
                    {
                        box-sizing: border-box;
                        margin: 0px;
                        min-width: 0px;
                        display: flex;
                        padding: 0px;
                        align-items: center;
                        justify-content: flex-start;
                        width: fit-content;
                        .transaction-deadline-header 
                        {
                            box-sizing: border-box;
                            margin: 0px;
                            min-width: 0px;
                            font-weight: 400;
                            color: ${props => props.theme === 'light' ? props.theme.settingText : props.theme.fontColor};
                            font-size: 14px;
                        }
                    }
                    .transaction-deadline-input 
                    {
                        margin: 0px;
                        min-width: 0px;
                        display: flex;
                        padding: 0px;
                        align-items: center;
                        justify-content: flex-start;
                        width: fit-content;
                        max-width: 40%;
                        .btn-transaction 
                        {
                            color: rgb(0, 0, 0);
                            align-items: center;
                            border-radius: 36px;
                            font-size: 1rem;
                            width: auto;
                            min-width: 3.5rem;
                            border: 1px solid rgb(206, 208, 217);
                            outline: none;
                            background: ${props => props.theme === 'light' ? props.theme.inputBackground : props.theme.inputBackground};
                            height: 2rem;
                            position: relative;
                            padding: 0px 0.75rem;
                            .transaction-input 
                            {
                                border: 0px;
                                border-radius: 2rem;
                                background: ${props => props.theme === 'light' ? props.theme.inputBackground : props.theme.inputBackground};
                                font-size: 16px;
                                width: auto;
                                outline: none;
                                color: ${props => props.theme === 'light' ? props.theme.color : props.theme.color};
                                text-align: right;
                                max-width: 100%;
                            }
                        }
                        .minutes 
                        {
                            padding-left: 8px;
                            box-sizing: border-box;
                            margin: 0px;
                            min-width: 0px;
                            font-weight: 400;
                            font-size: 14px;
                            color: ${props => props.theme === 'light' ? props.theme.settingText : props.theme.fontColor};
                        }
                    }
                }
            }
            .interface-settings 
            {
                box-sizing: border-box;
                margin: 0px;
                min-width: 0px;
                font-weight: 600;
                font-size: 14px;
                color: ${props => props.theme === 'light' ? props.theme.settingText : props.theme.fontColor};
            }
            .expert-multihops-container 
            {
                display: grid;
                grid-auto-rows: auto;
                row-gap: 8px;
                .expert-multihops-wrapper 
                {
                    box-sizing: border-box;
                    margin: 0px;
                    min-width: 0px;
                    display: flex;
                    padding: 0px;
                    align-items: center;
                    justify-content: flex-start;
                    width: fit-content;
                    .expert-multihops-header 
                    {
                        box-sizing: border-box;
                        margin: 0px;
                        min-width: 0px;
                        font-weight: 400;
                        color: ${props => props.theme === 'light' ? props.theme.settingText : props.theme.fontColor};
                        font-size: 14px;
                        .open-currency-select-button 
                        {
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            position: relative;
                            z-index: 1;
                            will-change: transform;
                            transition: transform 450ms ease 0s;
                            transform: perspective(1px) translateZ(0px);
                            -moz-box-align: center;
                            align-items: center;
                            font-size: 20px;
                            font-weight: 500;
                            background-color: ${(props) =>
                                props.theme === "light"
                                    ? props.theme.body
                                    : props.theme.swapContainer};
                            color: ${(props) =>
                                props.theme === "light"
                                    ? props.theme.fontColor
                                    : props.theme.fontColor};
                            border-radius: 14px;
                            box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
                            outline: currentcolor none medium;
                            cursor: pointer;
                            user-select: none;
                            border: medium none;
                            height: 2rem;
                            width: 105px;
                            padding: 0px 8px;
                            -moz-box-pack: justify;
                            justify-content: space-between;
                            margin: 0;
                            .img-text-container 
                            {
                                display: flex;
                                -moz-box-align: center;
                                align-items: center;
                                -moz-box-pack: justify;
                                justify-content: space-between;
                                width: 100%;
                                .select-currency-svg 
                                {
                                    margin: 0px 0.25rem 0px 0.35rem;
                                    height: 35%;
                                }
                            }
                        }
                        .img-text-wrapper 
                        {
                            font-size: 20px;
                            font-weight: 500;
                            background-color: ${(props) =>
                                props.theme === "light"
                                    ? props.theme.body
                                    : props.theme.swapContainer};
                            color: ${(props) =>
                                props.theme === "light"
                                    ? props.theme.fontColor
                                    : props.theme.fontColor};
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
                            .coin-image 
                            {
                                width: 18px;
                                height: 18px;
                                box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
                                border-radius: 18px;
                                margin: 0;
                            }
                            .token-symbol-container 
                            {
                                margin: 0px 0.25rem;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
    .dropdown-menu
    {
        min-width: 0;
    }
    .dropdown-toggle::after
    {
        display: none;
    }
    .dropdown-menu.show
    {
        background-color: ${(props) =>
            props.theme === "light"
                ? props.theme.body
                : props.theme.swapContainer};
    }
    .no-style
    {
        border: none;
        width: 0;
        padding: 0;
    }
    .inline-block
    {
        display: inline-block;
    }
    .btn-check:focus+.btn, .btn:focus
    {
        box-shadow: none;
    }
`;
