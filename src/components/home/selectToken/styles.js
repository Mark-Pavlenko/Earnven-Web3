import styled from "styled-components";

export const StyledSelectToken = styled.div`
    .token-selector-container 
    {
        display: flex;
        flex-direction: column;
        -moz-box-pack: start;
        justify-content: flex-start;
        width: 100%;
        flex: 1 1 0%;
        position: relative;
        height: 610px;
        border-radius: 20px
        background-color: ${(props) =>
            props.theme === "light" ? props.theme.body : props.theme.swapContainer};
        .token-selector-wrapper 
        {
            height: 100%;
            max-width: 418px;
            border-radius: 20px;
            display: grid;
            grid-auto-rows: auto;
            row-gap: 16px;
            padding: 20px 20px 0 20px;
            background-color: ${(props) =>
                props.theme === "light" ? props.theme.body : props.theme.swapContainer};
            color: ${(props) =>
                props.theme === "light" ? props.theme.fontColor : props.theme.coinDesc};
            .select-token-header 
            {
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
                .select-token-text 
                {
                    box-sizing: border-box;
                    margin: 0px;
                    min-width: 0px;
                    font-weight: 500;
                    font-size: 16px;
                }
                .svg-token 
                {
                    cursor: pointer;
                }
            }
            .manage-token-wrapper 
            {
                height: 100%;
                padding: 0 10px 0;
                .lists-tokens-tab-header 
                {
                    background-color: ${(props) => props.theme.listTokensTabBackground};
                    border-radius: 12px; 
                    padding: 6px;
                    .list-tokens-container 
                    {
                        padding: 0;
                        .lists-tokens-tab 
                        {
                            padding: 16px;
                            height: 39px;
                            width: 100%;
                            text-align: center;
                            border-radius: 12px;
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
                            color: ${(props) => props.theme.color};
                            font-size: 16px;
                            font-weight: 500;
                        }
                        .active-tab
                        {
                            background-color: ${(props) => props.theme.activeTabBackground};
                        }
                        .inactive-tab
                        {
                            background-color: rgba(0, 0, 0, 0);
                        }
                    }
                }
                .lists-tokens-tab-content
                {
                    margin-top: 30px;
                    .custom-token-header
                    {
                        margin-bottom: 20px;
                        .custom-token-header-left
                        {

                        }
                        .custom-token-header-right
                        {
                            cursor: pointer;
                            text-align: right;
                            color: #0068fc;
                        }
                    }
                    .custom-token-content-wrapper
                    {
                        height: 350px;
                        .custom-token-content
                        {
                            margin-bottom: 9px;
                            img
                            {
                                width: 20px;
                                height: 20px;
                                border-radius: 20px
                            }
                            a.custom-token-name
                            {
                                font-size: 18px;
                                margin-left: 7px; 
                                font-weight: 600;
                                color: rgb(86, 90, 105);
                                cursor: pointer;
                                text-decoration: none;
                                &:hover
                                {
                                    text-decoration: underline;
                                    text-decoration-color: rgb(232, 0, 111);
                                }
                            }
                            .custom-token-actions
                            {
                                text-align: right;
                                svg
                                {
                                    stroke: rgb(110, 114, 125);
                                    height: 16px;
                                    width: 18px;
                                    margin-left: 10px;
                                    cursor: pointer;
                                }
                                a svg
                                {
                                    stroke: rgb(0, 104, 252);
                                    height: 16px;
                                    width: 18px;
                                    margin-left: 10px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
            .import-token-header 
            {
                box-sizing: border-box;
                margin: 0px;
                min-width: 0px;
                width: 100%;
                padding: 0px;
                -moz-box-align: center;
                align-items: center;
                -moz-box-pack: justify;
                justify-content: space-between;
                .import-token-text 
                {
                    box-sizing: border-box;
                    text-align: center;
                    margin: 0px;
                    min-width: 0px;
                    font-weight: 500;
                    font-size: 16px;
                }
                .svg-token 
                {
                    cursor: pointer;
                }
            }
            .import-warning 
            {
                text-align: center;
                padding: 16px;
                .warning-sign 
                {
                    & img 
                    {
                        width: 50px;
                        height: 50px;
                        border-radius: 50px;
                        margin-bottom: 10px;
                    }
                }
            }
            .import-details 
            {
                background-color: ${(props) => props.theme.importTokenBackground};
                border-radius: 16px;
                padding: 2rem;
                text-align: center;
                .currency-logo 
                {
                    & img 
                    {
                        width: 32px;
                        height: 32px;
                        border-radius: 32px;
                    }
                }
                .token-ticker 
                {
                    font-size: 20px;
                    padding-top: 10px;
                }
                .token-name 
                {
                    font-size: 14px;
                    padding-bottom: 7px;
                }
                .token-address 
                {
                    font-size: 12px;
                    padding-bottom: 12px;
                }
                .warning-container 
                {
                    display: grid; 
                    justify-items: center;
                    .warning 
                    {
                        text-align: center;
                        box-sizing: border-box;
                        margin: 0px;
                        min-width: 0px;
                        padding: 0 4px;
                        border-radius: 4px;
                        background-color: rgba(255, 67, 67, 0.2);
                        width: fit-content;
                        .warning-unknown 
                        {
                            box-sizing: border-box;
                            margin: 0px 0px 0px 4px;
                            min-width: 0px;
                            font-weight: 500;
                            font-size: 10px;
                            color: rgb(255, 67, 67);
                        }
                    }
                }
            }
            .import-button 
            {
                text-align: center;
                outline: none;
                text-decoration: none;
                justify-content: center;
                position: relative;
                z-index: 1;
                will-change: transform;
                transition: transform 450ms ease 0s;
                transform: perspective(1px) translateZ(0px);
                font-size: 16px;
                display: inline;
                align-items: center;
                padding: 0.4rem;
                border-radius: 8px;
                cursor: pointer;
                user-select: none;
                font-weight: 500;
                background-color: #2172E5;
                color: #eee;
                border: 1px solid ${(props) =>
                    props.theme === "light" ? props.theme.back : props.theme.back};
            }
            .search-box-container 
            {
                box-sizing: border-box;
                margin: 0px;
                min-width: 0px;
                width: 100%;
                display: flex;
                padding: 0px;
                -moz-box-align: center;
                align-items: center;
                -moz-box-pack: start;
                justify-content: flex-start;
                .token-input 
                {
                    position: relative;
                    display: flex;
                    padding: 16px;
                    -moz-box-align: center;
                    align-items: center;
                    width: 100%;
                    white-space: nowrap;
                    background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
                    outline: currentcolor none medium;
                    border-radius: 20px;
                    color: ${(props) =>
                        props.theme === "light" ? props.theme.color : props.theme.color};
                    border: 1px solid rgb(206, 208, 217);
                    appearance: none;
                    font-size: 18px;
                    transition: border 100ms ease 0s;
                }
            }
            .common-base-container 
            {
                display: grid;
                grid-auto-rows: auto;
                row-gap: 12px;
                border-bottom: 1px solid rgb(0,0,0,0.3);
                padding-bottom: 14px;
                .common-base-wrapper 
                {
                    box-sizing: border-box;
                    margin: 0px;
                    min-width: 0px;
                    width: 100%;
                    display: flex;
                    padding: 0px;
                    -webkit-box-align: center;
                    align-items: center;
                    -webkit-box-pack: start;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .common-base-text 
                    {
                        box-sizing: border-box;
                        margin: 0px;
                        min-width: 0px;
                        font-weight: 500;
                        font-size: 14px;
                    }
                }
                .common-base-tokenlist-container
                {
                    .common-base-token-container
                    {
                        cursor: pointer;
                        display: inline-block;
                        width: auto;
                        &:not(:last-child)
                        {
                            margin: 0 7px 7px 0;
                        }
                        .common-base-token-wrapper
                        {
                            border: 1px solid rgb(64, 68, 79,0.4);
                            border-radius: 10px;
                            display: inline-block;
                            padding: 3px 7px;
                            .coin-img
                            {
                                width: 24px;
                                height: 24px;
                                border-radius: 24px;
                            }
                            .coin-name
                            {
                                display: inline-block;
                                margin-left: 5px;
                                font-weight: 500;
                                font-size: 15px;
                            }
                        }
                    }
                }
            }
            .list-container 
            {
                position: relative;
                /* min-height: 290px;
                max-height: 290px; */
                height: 238px;
                overflow-y: scroll;
                overflow-x: hidden;
                ::-webkit-scrollbar 
                {
                    width: 7px;
                }
                ::-webkit-scrollbar-track 
                {
                    background: #DADBE2; 
                }
                ::-webkit-scrollbar-thumb 
                {
                    background: #BFC4CE; 
                }
                ::-webkit-scrollbar-thumb:hover 
                {
                    background: #555; 
                }
            }
        }
        .manage-token-btn-container 
        {
            height: 70px;
            background-color: ${(props) =>
                props.theme === "light" ? props.theme.body : props.theme.swapContainer};
            border-radius: 0 0 20px 20px;
            .manage-token-btn 
            {
                margin: 10px auto;
                padding: 10px;
                width: 100%;
                text-align: center;
                border-radius: 15px;
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
                background-color: ${(props) =>
                    props.theme === "light" ? props.theme.back : props.theme.back};
                color: ${(props) =>
                    props.theme === "light"
                        ? props.theme.connect
                        : props.theme.connect};
                font-size: 16px;
                font-weight: 500;
            }
        }
    }
`;
