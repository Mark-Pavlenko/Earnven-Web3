// import React from 'react';
// import ReactDOM from 'react-dom';
//
// const Modal = ({ closeModal, children }) => {
//
//     const handler = () => {
//         closeModal(false)
//     }
//
//     return ReactDOM.createPortal(
//         <>
//         <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100vw',
//             height: '100vh',
//             position: 'fixed',
//             backgroundColor: 'rgba(0, 0, 0, 0.4)'
//         }}>
//         </div>
//             <div>
//                 <button style={{zIndex: '5'}}  onClick={handler}>Close Modal</button>
//                 {children}
//             </div>
//             </>,
//         document.getElementById('modal')
//         )
//
//
//
//
//
// }
//
// export default Modal;
import React from 'react';
import ReactDom from 'react-dom';

const ModalContainer = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  } else {
    return ReactDom.createPortal(
      <>
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(255, 255, 255, 0.16)',
            padding: '50px',
            zIndex: '1200',
            mixBlendMode: 'normal',
            backdropFilter: 'blur(10px)',
          }}></div>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '830px',
            height: '867px',
            marginTop: '-433px',
            marginLeft: '-415px',
            background: 'rgba(255, 255, 255, 0.16)',
            transition: 'translate(-50%, -50%)',
            boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
            mixBlendMode: 'normal',
            padding: '50px',
            zIndex: '1201',
            backdropFilter: 'blur(35px)',
            borderRadius: '10px',
          }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <h3>Add Liquidity</h3>
            <button onClick={onClose}>Close</button>
          </div>
          {children}
        </div>
      </>,
      document.getElementById('modal')
    );
  }
};

export default ModalContainer;
