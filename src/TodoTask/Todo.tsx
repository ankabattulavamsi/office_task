import { Box, Button, Dialog, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid'
import React, { Component } from 'react'

interface IsState {
    open: boolean,
    newOpen: boolean,
    setValue: string
    task: string,
    addData: any[],
    editData: any,
    editSetValue: string,
    editTask: string, 
    editId: string
}

class Todo extends Component {
    initialState: any = JSON.parse(localStorage.getItem("todoTask") as string) || []
    state: IsState = {
        open: false,
        newOpen: false,
        setValue: '',
        editSetValue: '',
        task: '',
        editTask: '',
        addData: this.initialState,
        editData: null,
        editId: ''
    }

    // componentDidMount(): void {
    //     const {addData} = this.state

    // }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpenDialog = () => {
        this.setState({ open: true })
    }

    handleCloseNew = () => {
        this.setState({newOpen: false})
    }

    handleChange = (e: any) => {
        this.setState({ setValue: e.target.value })
    }

    handleChangeTask = (e: any) => {
        this.setState({ task: e.target.value })
    }

    handleChangeTaskNew = (e :any) => {
        this.setState({editTask: e.target.value})
    }

    handleChangeNew = (e: any) => {
        this.setState({editSetValue: e.target.value})
    }

    handleSubmit = (e: any) => {
        const { setValue, task, addData } = this.state
        e.preventDefault()
        this.setState((prevState: any) => ({
            addData: [...prevState.addData, { id: uuidv4(), task :task , setValue:setValue }]
        }))
        // console.log('addData', addData)
        localStorage.setItem('todoTask', JSON.stringify(addData))
        this.setState({task: ''})
        this.setState({setValue: ''})
    }

    // componentDidMount() {
    //     const {addData} = this.state
    //     localStorage.setItem('todoTask', JSON.stringify(addData))
    // }

    handleDelete = (id: any) => {
        const { addData } = this.state
        let deleteItem = addData.filter((item) => item.id !== id)
        this.setState({ addData: deleteItem })
    }

    handleEdit = (each: any) => {
        console.log('editable task', each.task)
        this.setState({ newOpen: true })
        this.setState({ editTask: each.task })
        this.setState({ editSetValue: each.setValue })
        this.setState({editId: each.id})
    }

    handleUpdate = () => {
        const { addData, editId, editTask, editSetValue } = this.state
        const findIndex = addData.findIndex((item) => item.id === editId)
        addData[findIndex].task = editTask 
        addData[findIndex].setValue = editSetValue
        this.setState({editData: addData})
        localStorage.setItem('todoTask', JSON.stringify(addData))
        console.log('editId', editId)
    }

    render() {
        const { open, setValue, task, addData, newOpen, editTask, editSetValue } = this.state
        // console.log('addData', addData)
        return (
            <>
                <Paper elevation={2} sx={{ p: 2, backgroundColor: '#282c34' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: '#fff' }} variant='h5'>Add Todo</Typography>
                        <Typography onClick={this.handleOpenDialog} sx={{ color: 'skyblue', cursor: 'pointer' }} variant='h6'>Form</Typography>
                    </Box>

                    <Box>
                        {addData.map((each) => (
                            <Box key={each.id} sx={{
                                p: 2, backgroundColor: '#6b848b', borderRadius: '5px', borderTop: '3px solid green', mt: 2,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                            }} >
                                <Box>
                                    <Typography sx={{ color: '#fff' }}>Task : {each.task}</Typography>
                                    <Typography sx={{ color: '#fff' }}>Status: {each.setValue}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <IconButton aria-label="add-icon" sx={{ color: 'blue', }} onClick={(e :any) => this.handleEdit(each)} >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="add-icon" sx={{ color: 'red', ml:2 }} onClick={(e : any) => this.handleDelete(each.id)} >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Paper>

                <Dialog open={open} onClose={this.handleClose} >

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconButton aria-label="add-icon" sx={{ color: '#9297a1', mr: 8 }} onClick={this.handleSubmit} >
                            <AddIcon />
                        </IconButton>
                        <Typography sx={{ color: '#282c34', mr: 8 }} variant='h6'>Fill The Form</Typography>
                        <Box sx={{}}>
                            <ClearIcon style={{
                                color: '#9297a1', marginLeft: '35px', marginTop: '-25px', backgroundColor: 'red',
                                cursor: 'pointer', borderRadius: '50px', fontSize: '24px'
                            }} onClick={this.handleClose} />
                        </Box>
                    </Box>
                    <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <TextField label='Add Todo' fullWidth sx={{ mb: 4 }} onChange={this.handleChangeTask} value={task} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={setValue}
                                label="Status"
                                onChange={this.handleChange}
                            >
                                <MenuItem value='Not Completed'>Not Completed</MenuItem>
                                <MenuItem value='On Progress'>On Progress</MenuItem>
                                <MenuItem value='Completed'>Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button sx={{
                            mt: 3, alignSelf: 'center', border: '1px solid green', borderRadius: '6px',
                            backgroundColor: 'lightgray', width: '120px'
                        }} onClick={this.handleSubmit}>Submit</Button>

                        {/* <Button sx={{
                            mt: 3, alignSelf: 'center', border: '1px solid green', borderRadius: '6px',
                            backgroundColor: 'lightgray', width: '120px'
                        }} onClick={this.handleUpdate}>Update</Button> */}
                        </Box>
                    </Box>
                </Dialog>


                <Dialog open={newOpen} onClose={this.handleCloseNew} >

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconButton aria-label="add-icon" sx={{ color: '#9297a1', mr: 8 }} onClick={this.handleSubmit} >
                            <AddIcon />
                        </IconButton>
                        <Typography sx={{ color: '#282c34', mr: 8 }} variant='h6'>Update The Form</Typography>
                        <Box sx={{}}>
                            <ClearIcon style={{
                                color: '#9297a1', marginLeft: '35px', marginTop: '-25px', backgroundColor: 'red',
                                cursor: 'pointer', borderRadius: '50px', fontSize: '24px'
                            }} onClick={this.handleCloseNew} />
                        </Box>
                    </Box>
                    <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <TextField label='Add Todo' fullWidth sx={{ mb: 4 }} onChange={this.handleChangeTaskNew} value={editTask} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={editSetValue}
                                label="Status"
                                onChange={this.handleChangeNew}
                            >
                                <MenuItem value='Not Completed'>Not Completed</MenuItem>
                                <MenuItem value='On Progress'>On Progress</MenuItem>
                                <MenuItem value='Completed'>Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {/* <Button sx={{
                            mt: 3, alignSelf: 'center', border: '1px solid green', borderRadius: '6px',
                            backgroundColor: 'lightgray', width: '120px'
                        }} onClick={this.handleSubmit}>Submit</Button> */}

                        <Button sx={{
                            mt: 3, alignSelf: 'center', border: '1px solid green', borderRadius: '6px',
                            backgroundColor: 'lightgray', width: '120px'
                        }} onClick={this.handleUpdate}>Update</Button>
                        </Box>
                    </Box>
                </Dialog>
            </>
        )
    }
}

export default Todo
