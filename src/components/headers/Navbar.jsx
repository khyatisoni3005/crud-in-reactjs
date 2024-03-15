import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Input, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import ProgressBar from "@ramonak/react-progress-bar";



export default function Navbar() {

    // madal open

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>

            <div className="container">
                <div className="row" >
                    <div className="col-2">
                        <h5 style={{ marginTop: "30px" }}>Movie App</h5>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-2"> </div>
                    <div className="col-2"> <input type="search" placeholder='Search Movie' name="search" className='search' /></div>
                    <div className="col-2">
                        <p style={{ marginTop: "25px" }} >🔍</p>
                    </div>
                    <div className="col-1"> </div>
                    <div className="col-2">
                        <Button style={{ marginTop: "20px", marginLeft: "75px" }} onClick={handleOpen} variant="contained" disableElevation>
                            New Movie
                        </Button>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}
