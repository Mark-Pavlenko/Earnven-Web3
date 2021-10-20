import styled from 'styled-components';

export const StyledTokenAddAndChangeContainer = styled.div`
  .change-add-combined {
    background-color: ${(props) => props.theme.inputBackground};
    padding-left: 3px;
    border-radius: 7px;
  }
  .u-rotate {
    transform: rotate(90deg);
    padding-bottom: 10px;
  }
`;
