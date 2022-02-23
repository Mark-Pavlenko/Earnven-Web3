import React, { useState } from 'react';
import { Main, DropdownButton, DropdownContent, DropdownItem } from './styledComponents';

const CustomDropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ['item1', 'item2', 'item3'];
  return (
    <Main>
      <DropdownButton
        onClick={(e) => {
          setIsActive(!isActive);
        }}>
        {selected}
      </DropdownButton>
      {isActive && (
        <DropdownContent>
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}>
              {option}
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </Main>
  );
};

export default CustomDropdown;
