import styled from "styled-components";

export const StyledMultiTokenContainer = styled.div`
.forced-no-padding
{
    padding-bottom: 0 !important;
}
.single-token-input
{
    color: ${(props) => props.theme.color};
    font-size: 18px;
}
.equivalent-price
{
    margin-bottom: 7px;
    font-size: 16px;
    color: ${(props) => props.theme.color};
}
.exchange-rate-container
{
    padding: 0 15px 15px;
    .exchange-rate-wrapper
    {
        color: #bbb;
        background-color: rgba(22,21,34,0.5);
        padding: 4px 20px;
        border-radius: 3px;
        font-size: 14px;
    }
}
.u-text-left
{
    text-align: left;
}
.u-text-right
{
    text-align: right;
}
`;