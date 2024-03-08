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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Home() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [movieData, setMovieData] = useState({})
    const [movieList, setMovieList] = useState([])

    function handleChange(e) {
        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value,

        })
    }
    //add data
    function addMovieData() {
        axios.post("http://localhost:5000/api/movie/create", movieData)
            .then((res) => {
                getMovieData()
                setOpen(false);
                setMovieData(
                    {
                        name: "",
                        director: '',
                        producer: "",
                        releaseDate: ""
                    }
                )
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
                console.log("res", res);
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
                setMovieData(
                    {
                        name: "",
                        director: '',
                        producer: "",
                        releaseDate: ""
                    }
                )
            })
    }
    useEffect(() => {
        getMovieData()
    }, [])

    return (
        <>
            <Button onClick={handleOpen}>New Movie</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
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
                        value={movieData.director}
                        id="standard-password-input"
                        label="director"
                        type="text"
                        onChange={handleChange}
                        name='director'
                        autoComplete="current-password"
                        variant="standard"
                    />
                    <TextField
                        value={movieData.producer}
                        id="standard-password-input"
                        label="producer"
                        type="text"
                        onChange={handleChange}
                        name='producer'
                        autoComplete="current-password"
                        variant="standard"
                    />
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
                    <TextField
                        value={movieData.profile}
                        id="standard-password-input"

                        type="file"
                        onChange={handleChange}
                        name='files'
                        autoComplete="current-password"
                        variant="standard" />
                    <br /><br />
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
                movieList.map((val, ind) => {
                    return (
                        <React.Fragment key={ind}>

                            <div className="col-3" style={{ display: "inline-block" }}>
                                <div className="container">
                                    <div className="row">
                                        <span>{ind + 1}.</span>
                                        <Card sx={{ minWidth: 275 }}>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 40 }} color="text.dark" gutterBottom>
                                                    {val.name}
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    {val.producer}
                                                </Typography>
                                                <Typography sx={{ fontSize: 30 }} color="text.dark" gutterBottom>
                                                    {val.releaseDate}
                                                </Typography>
                                                <Typography sx={{ fontSize: 20 }} color="text.dark" gutterBottom>
                                                    {val.director}
                                                </Typography>
                                                <button onClick={() => deleteMovieData(val._id)}>delete</button>
                                                <button onClick={() => viewMovieData(val._id)}>update</button>
                                            </CardContent>
                                            <CardActions>
                                            </CardActions>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </ React.Fragment>
                    )

                })
            }

        </>
    );

}
