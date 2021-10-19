import React from 'react'
import {Box, Divider, Modal, Typography} from "@material-ui/core"
import {any} from "prop-types";

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.default',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

function CurrencySearchModal({isOpen, onDismiss}) {
    return (
        <Modal open={isOpen} onClose={onDismiss}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
        >
            <Box style={style}>
                <Typography variant='h6' align='center' sx={{color: '#f5f5f5'}}>Token List</Typography>
                <Divider variant='fullWidth' sx={{mt: 3}}/>
            </Box>
        </Modal>
    )
}

CurrencySearchModal.propTypes = {
    isOpen: any,
    onDismiss: any,
}

export default CurrencySearchModal