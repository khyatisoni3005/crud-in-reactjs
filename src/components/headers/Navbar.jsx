import React from 'react'
import { Link } from 'react-router-dom'
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';

export default function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li>
                                <CameraIndoorIcon className='fs-1 me-4' />
                            </li>
                            <li class="nav-item">
                                <Link to="/" class="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/contact" class="nav-link active" >Contact</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/contact" class="nav-link active" >About Us</Link>
                            </li> <li class="nav-item">
                                <Link to="/contact" class="nav-link active" >Help</Link>
                            </li>


                        </ul>
                        <Link>{<WbTwilightIcon />}</Link>
                        <form class="d-flex ms-3">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
