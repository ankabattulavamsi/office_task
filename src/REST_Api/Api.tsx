import { Box, Button, Dialog, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios'

interface IsState {
    userData: any[], 
    open: boolean,
    editOpen: boolean, 
    name: string, 
    editName: string,
    email: string, 
    editEmail: string, 
    editObj: string
}

export class Api extends Component {
    state:IsState = {
        userData: [],
        open: false,
        editOpen: false,
        name: '', 
        editName: "",
        email: '', 
        editEmail: '', 
        editObj: ''
    }

    onCloseHandle = () => {
        this.setState({ open: false })
    }

    onCloseHandleNew = () => {
        this.setState({editOpen: false})
    }

    onChangeHandle = (e: any) => {
        this.setState({name: e.target.value})
    }

    onChangeHandleJob = (e: any) => {
        this.setState({email: e.target.value})
    }

    onChangeEditHandle = (e: any) => {
            this.setState({editName : e.target.value})
    }

    onChangeEditHandleJob = (e: any) => {
        this.setState({editEmail: e.target.value})
    }

    onClickGetUsers = async () => {
        let getAllUsers = axios.get(`https://reqres.in/api/users?page=2`)

        console.log((await getAllUsers)?.data.data)
        this.setState({ userData: (await getAllUsers)?.data.data })
    }

    onClickDeleteItem = async (id: any) => {
        const {userData} = this.state
        let options = {
            method: "DELETE"
        }
        const response = await fetch(`https://reqres.in/api/users/${id}`, options)
        if(response.status === 204){
            let deleteUser = userData.filter((item:any) => item.id !== id) 
            this.setState({userData: deleteUser})
        }
    }

    onClickOpenModel = () => {
        this.setState({ open: true })
    }

    onClickEdit = async (id :any) => {
        const {userData} = this.state
        this.setState({editOpen: true})
        let getUser:any = await userData.filter((item: any) => item.id === id)
        console.log('getUser', getUser[0].id)
        this.setState({editName: getUser[0].first_name})
        this.setState({editEmail: getUser[0].email})
        this.setState({editObj: getUser[0].id})

    }

    onClickCreateUser = async () => {
        const {name, email} = this.state
        let userDetails = {name, email}
        let options = {
            method: 'POST', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDetails)
        }
        let updateUser = await fetch(`https://reqres.in/api/users`, options)
        const data:any = await updateUser.json()
        this.setState((prevState: any) => ({
            userData: [...prevState.userData, { first_name: data.name, email, id: data.id,  }]
        }))
        console.log('updateUser', data)
        this.setState({open: false})
        this.setState({name: ''})
        this.setState({email: ''})
    }

    onClickUpdateUser = async () => {
        const {editName, editEmail, userData, editObj} = this.state
        let updatedUsers = {
            first_name: editName, 
            editEmail
        }

        let requestUpdateOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUsers)
        }

        let reqUpdated = await fetch(`https://reqres.in/api/users/2`, requestUpdateOptions)
        let reqData:any = await reqUpdated.json()

        let res:any = userData.filter((item: any) => item.id === editObj)

        res[0].first_name = reqData.first_name
        res[0].email = reqData.email

        console.log('ressssssssssss', reqData)
        this.setState({editOpen: false})
    }

    render() {
        const { userData, open , name, email, editOpen, editName, editEmail } = this.state
        console.log('users-data', this.state.userData)
        return (
            <Box>
                <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2 }}>
                    <Button sx={{ border: '1px solid blue' }} onClick={() => this.onClickGetUsers()}>
                        Get All Users
                    </Button>
                    <Button sx={{ border: '1px solid blue' }}
                        onClick={() => this.onClickOpenModel()}
                    >
                        Create New User
                    </Button>
                </Paper>

                <Paper elevation={2} sx={{ mt: 5, p: 2 }}>
                    {userData.map((item: any) => (
                        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton aria-label="add-icon" sx={{ color: '#9297a1', }} onClick={() => this.onClickEdit(item.id)}>
                                    <EditIcon />
                                </IconButton>
                                <Typography sx={{ ml: 5 }}>{item?.first_name}</Typography>
                            </Box>
                            <IconButton aria-label="add-icon" sx={{ color: '#9297a1', }} onClick={() => this.onClickDeleteItem(item.id)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Paper>

                <Dialog open={open} onClose={this.onCloseHandle} >
                    <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography>Create User</Typography>
                        <TextField label='Name' fullWidth sx={{mt: 2}} value={name} onChange={this.onChangeHandle} />
                        <TextField label='Email' fullWidth sx={{mt: 2}} value={email} onChange={this.onChangeHandleJob} />
                        <Button sx={{mt: 2, border: '1px solid blue'}} onClick={this.onClickCreateUser}>Create</Button>
                    </Box>
                </Dialog>


                <Dialog open={editOpen} onClose={this.onCloseHandleNew} >
                    <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography>Update User</Typography>
                        <TextField label='Update Name' fullWidth sx={{mt: 2}} value={editName} onChange={this.onChangeEditHandle} />
                        <TextField label='Update Email' fullWidth sx={{mt: 2}} value={editEmail} onChange={this.onChangeEditHandleJob} />
                        <Button sx={{mt: 2, border: '1px solid blue'}} onClick={this.onClickUpdateUser}>Create</Button>
                    </Box>
                </Dialog>
            </Box>
        )
    }
}

export default Api
