import styled from "styled-components";

export const StyledNukeOnProgress = styled.div`
.swap-loading-container {
    text-align: center;
    padding: 10px 10px 30px 10px;
    .close-button {
        text-align: right;
        svg {
            cursor: pointer;
        }
    }
    .loading-spinner {
        padding: 70px;
    }
    .confirmation-header {
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 4px;
    }
    .swapping-content {
        font-size: 1.05rem;
        font-weight: 700;
        margin-bottom: 9px;
    }
    .wallet-confirm {
        font-size: 0.83rem;
    }
}

`;
