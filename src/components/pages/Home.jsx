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
// import img from "../img/desktop-wallpaper-aladdin-movie-poster-in-2160x3840-resolution-live-action-films-thumbnail.jpg"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Home() {
    // progress bar

    const Example = () => {
        return <ProgressBar completed={60} />;
    };

    // madal open

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // set movie list and data

    const [movieData, setMovieData] = useState({})
    const [movieList, setMovieList] = useState([])


    // search movie
    const [searchKeyword, setSearchKeyword] = useState('')


    // set movie data in state : object
    function handleChange(e) {
        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value,
        })
    }

    // set value in searchbar
    function handleSearch(e) {
        setSearchKeyword(e.target.value)
    }


    // search movie 
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movie/search?keyword=${searchKeyword}`)
            .then((res) => {
                setMovieList(res.data)
            })
    }, [searchKeyword])

    //add data
    function addMovieData() {
        if (!movieData.name) {
            alert("ENTER MOVIE NAME")
            setMovieData({ name: "", director: '', producer: "", releaseDate: "" })
            return setOpen(true)
        }
        if (!movieData.director) {
            alert("ENTER DIRECTOR NAME")
            setMovieData({ name: "", director: '', producer: "", releaseDate: "" })
            return setOpen(true)
        }
        if (!movieData.releaseDate) {
            alert("ENTER DATE OF RELEASE")
            setMovieData({ name: "", director: '', producer: "", releaseDate: "" })
            return setOpen(true)
        }
        if (!movieData.rating) {
            alert("GIVE IMDB OF MOVIE")
            setMovieData({ name: "", director: '', producer: "", releaseDate: "" })
            return setOpen(true)
        }

        axios.post("http://localhost:5000/api/movie/create", movieData)
            .then((res) => {
                getMovieData()
                setOpen(false);
                setMovieData({ name: "", director: '', producer: "", releaseDate: "" })
            })
    }

    //delete data
    function deleteMovieData(id) {
        axios.delete(`http://localhost:5000/api/movie/delete/${id}`)
            .then((res) => {
                getMovieData()
            })
    }

    //get data 
    function getMovieData() {
        axios.get("http://localhost:5000/api/movie/list",)
            .then((res) => {
                setMovieList(res.data)
            })
    }
    // view data
    function viewMovieData(id) {
        axios.get(`http://localhost:5000/api/movie/view/${id}`,)
            .then((res) => {
                setMovieData(res.data)
                setOpen(true)
            })
    }
    // update data
    function updateMovieData(id) {
        axios.put(`http://localhost:5000/api/movie/update/${id}`, movieData)
            .then((res) => {
                getMovieData()
                setMovieData({ name: "", director: '', producer: "", releaseDate: "" })
            })
    }

    useEffect(() => {
        getMovieData()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row" >
                    <div className="col-2">
                        <h5 style={{ marginTop: "30px" }}>Movie App</h5>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-2"> </div>
                    <div className="col-2"> <input type="search" onChange={handleSearch} placeholder='Search Movie' name="search" className='search' /></div>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <form name="movie-form">
                        <TextField
                            value={movieData.name}
                            id="standard-password-input"
                            label="name"
                            type="text"
                            onChange={handleChange}
                            name='name'
                            autoComplete="current-password"
                            variant="standard"
                        />
                        <TextField

                            value={movieData.rating}
                            id="standard-password-input"
                            label="rating"
                            type="number"
                            onChange={handleChange}
                            name='rating'
                            autoComplete="current-password"
                            variant="standard"
                        />
                        <TextField
                            value={movieData.director}
                            id="standard-password-input"
                            label="director"
                            type="text"
                            onChange={handleChange}
                            name='director'
                            autoComplete="current-password"
                            variant="standard"
                        />
                        {/* <TextField
                            value={movieData.producer}
                            id="standard-password-input"
                            label="producer"
                            type="text"
                            onChange={handleChange}
                            name='producer'
                            autoComplete="current-password"
                            variant="standard"
                        /> */}
                        <TextField
                            value={movieData.releaseDate}
                            id="standard-password-input"
                            label="releaseDate"
                            type="text"
                            onChange={handleChange}
                            name='releaseDate'
                            autoComplete="current-password"
                            variant="standard"
                        />

                        <br /><br />
                    </form>
                    <button onClick={() => {
                        if (movieData && movieData._id) {
                            updateMovieData(movieData._id)
                            setOpen(false)
                        } else {
                            addMovieData()
                            setOpen(false)
                        }
                    }}>{movieData && movieData._id ? " update" : "add"}</button>
                </Box>
            </Modal>
            {
                movieList?.map((val, ind) => {
                    return (
                        <React.Fragment key={ind}>

                            <div className="col-3" style={{ display: "inline-block" }}>
                                <div className="container">
                                    <div className="row" style={{ marginLeft: "0px" }}>

                                        <Card sx={{
                                            marginLeft: "-5px", minWidth: 275, borderRadius: "20px", marginTop: "20px", boxShadow: "6px 5px 5px 1px gray"
                                        }}>
                                            <CardContent style={{}
                                            } >

                                                <Typography sx={{ fontSize: 25, textTransform: "capitalize", fontFamily: "sans-serif", marginBottom: "0px" }} color="text.dark" gutterBottom>
                                                    {val.name}
                                                    <br />

                                                    <ProgressBar className="progressbar" maxCompleted="10" bgColor="#003300" height="17px" completed={`${val.rating}` || 0} customLabel="" />

                                                </Typography>
                                                <br />


                                                {/* <Typography variant="span" style={{ display: "inline-block", textTransform: "capitalize", letterSpacing: "2px", opacity: "0.6" }} component="div">
                                                    {val.producer}
                                                </Typography>
                                                <Typography sx={{ fontSize: 30, display: "inline-block", }} color="text.dark" gutterBottom>
                                                    {val.releaseDate}
                                                </Typography> */}

                                                <div className="row">
                                                    <div className="col-6">
                                                        <label htmlFor="" style={{ marginTop: "10px" }}>Director Name</label><br />
                                                        <Typography variant="span" style={{ display: "inline-block", textTransform: "capitalize", letterSpacing: "0px", opacity: "0.6" }} component="div">
                                                            {val.director}
                                                        </Typography>
                                                    </div>
                                                    <div className="col-6" style={{ marginTop: "10px" }}>
                                                        <label htmlFor="">Release Date</label><br />
                                                        <Typography variant="span" style={{ display: "inline-block", textTransform: "capitalize", letterSpacing: "0px", opacity: "0.6" }} component="div">
                                                            {val.releaseDate}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <br />
                                                <Button style={{}} onClick={() => deleteMovieData(val._id)} variant="contained" disableElevation>
                                                    Delete
                                                </Button>
                                                <Button onClick={() => viewMovieData(val._id)} style={{ marginLeft: "10px" }} variant="contained" disableElevation>
                                                    Update
                                                </Button>
                                            </CardContent>
                                            <CardActions>
                                            </CardActions>
                                        </Card>
                                    </div>
                                </div>
                            </div >
                        </ React.Fragment >
                    )

                })
            }

        </>
    );

}
