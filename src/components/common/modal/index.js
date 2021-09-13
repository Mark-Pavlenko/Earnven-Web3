import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Portal = ({ children }) => {
  const modalRoot = document.getElementById("token-selector-modal");
  const el = document.createElement("div");
  
  useEffect(() => {
    if (modalRoot) modalRoot.appendChild(el);
    return () => {
      if (modalRoot) modalRoot.removeChild(el);
    };
  });
  return createPortal(children, el);
};

const Modal = ({ children, toggle, open,theme }) => {
  useEffect(() => {
    const handleKeyPressEvents = (event) => {
      if (event.key === "Escape") {
        toggle();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyPressEvents);
    } else {
      document.removeEventListener("keydown", handleKeyPressEvents);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPressEvents);
    };
  }, [open]);
  return (
    <Portal>
      {open && (
        <ModalWrapper>
          <Background onClick={toggle} />
          <ModalCard
            onKeyPress={(e) => {
            }}
          >
            {children}
          </ModalCard>
          <CloseButton onClick={toggle}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.60007 0.254308L5.99953 4.65376L10.399 0.267639C10.4856 0.179503 10.5896 0.110299 10.7043 0.064404C10.819 0.0185089 10.9421 -0.00307888 11.0656 0.00100586C11.3079 0.0166897 11.5363 0.120046 11.708 0.291775C11.8797 0.463505 11.9831 0.691868 11.9988 0.934223C12 1.05338 11.977 1.17155 11.9311 1.28155C11.8853 1.39155 11.8176 1.49109 11.7321 1.57414L7.31936 6.00026L11.7321 10.4264C11.9055 10.5944 12.0014 10.8263 11.9988 11.0663C11.9831 11.3087 11.8797 11.537 11.708 11.7087C11.5363 11.8805 11.3079 11.9838 11.0656 11.9995C10.9421 12.0036 10.819 11.982 10.7043 11.9361C10.5896 11.8902 10.4856 11.821 10.399 11.7329L5.99953 7.34676L1.61341 11.7329C1.52679 11.821 1.42282 11.8902 1.30808 11.9361C1.19334 11.982 1.07033 12.0036 0.946822 11.9995C0.699946 11.9867 0.466582 11.8828 0.291778 11.708C0.116974 11.5332 0.0131232 11.2998 0.00027287 11.053C-0.000933383 10.9338 0.0220782 10.8156 0.0679118 10.7056C0.113745 10.5956 0.181446 10.4961 0.266906 10.413L4.67969 6.00026L0.253575 1.57414C0.17052 1.48997 0.105284 1.38992 0.0617626 1.27998C0.0182413 1.17003 -0.00267173 1.05244 0.00027287 0.934223C0.0159567 0.691868 0.119313 0.463505 0.291043 0.291775C0.462772 0.120046 0.691135 0.0166897 0.93349 0.00100586C1.05604 -0.0048147 1.17847 0.0146725 1.29316 0.0582527C1.40784 0.101833 1.51232 0.168572 1.60007 0.254308Z"
                fill="#ffffff"
              />
            </svg>
          </CloseButton>
        </ModalWrapper>
      )}
    </Portal>
  );
};
export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const ModalCard = styled.div`
  min-width: 418px;
  max-width: 60%;
  z-index: 10;
  margin-bottom: 100px;
  margin-top: 12vh;
  border-radius: 20px;
  background: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  animation-name: zoom;
  animation-duration: 0.6s;
  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  img {
    width: 100%;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  padding: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.7;
`;
