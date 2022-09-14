import { Box, Button, Dialog, IconButton, Paper, TextField, Typography } from '@mui/material'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, { useState } from 'react'

const FuncApi = () => {
    const [userData, setUserData] = useState<any[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [editName, setEditName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [editEmail, setEditEmail] = useState<string>('')
    const [editId, setEditId] = useState<string>('')


    const onCloseModel = () => {
        setOpen(false);
    }

    const onCloseModelNew = () => {
        setEditOpen(false)
    }

    const onClickGetUsers = async () => {
        let getUserData = await fetch(`https://reqres.in/api/users?page=2`)
        let data = await getUserData.json()
        setUserData(data.data)
    }

    const onClickDeleteItem = async (id: any) => {
        let deleteUser = await fetch(`https://reqres.in/api/users/${id}`, {
            method: 'DELETE'
        })
        console.log('deleteUser', deleteUser)
        if (deleteUser.status === 204) {
            let filteredData = userData.filter((item) => item.id !== id)
            // console.log(filteredData)
            setUserData(filteredData)
        }
    }

    const onClickCreateUser = async () => {
        let userDetails = {
            first_name: name, 
            email
        }

        let options = {
            method: 'POST', 
            headers : {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }

        let createUserData = await fetch(`https://reqres.in/api/users`, options)
        let data = await createUserData.json()
        setUserData([...userData, {first_name: name, email: email, id:  data.id}])
        console.log('createUserData', data)
        setOpen(false)
    }

    const onClickUpdateUser = async () => {
        let userUpdateData = {
            editName, 
            editEmail
        }

        let requestOptions = {
            method: "PUT", 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userUpdateData)
        }

        let userUpdateDetails = await fetch(`https://reqres.in/api/users/2`, requestOptions)
        
        let data = await userUpdateDetails.json()

        let filterUpdate = userData.filter((item) => item.id === editId)
        filterUpdate[0].first_name = data.editName 
        filterUpdate[0].email = data.editEmail 
        console.log('-------', data)
        setEditOpen(false)
    }

    const onClickEdit = (id: any) => {
        setEditOpen(true)
        let findId = userData.filter((item) => item.id === id)
        console.log('findId', findId)
        setEditName(findId[0].first_name)
        setEditEmail(findId[0].email)
        setEditId(findId[0].id)
    }

    const onClickOpenModel = () => {
        setOpen(true);
    }

    return (
        <Box>
            <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', p: 2, backgroundColor: 'lightgrey' }}>
                <Button sx={{ border: '1px solid blue' }} onClick={() => onClickGetUsers()}>
                    Get All Users
                </Button>
                <Button sx={{ border: '1px solid blue' }}
                    onClick={() => onClickOpenModel()}
                >
                    Create New User
                </Button>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, backgroundColor: 'lightgrey', mt: 2 }}>
                {userData.map((item: any) => (
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m:2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton aria-label="add-icon" sx={{ color: '#9297a1', mr: 20 }} onClick={() => onClickEdit(item.id)}>
                                <CreditScoreIcon />
                            </IconButton>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Typography sx={{ }}>{item?.first_name}</Typography>
                            <Typography sx={{ }}>{item?.email}</Typography>
                            </Box>
                        </Box>
                        <IconButton aria-label="add-icon" sx={{ color: '#9297a1', }} onClick={() => onClickDeleteItem(item.id)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Box>
                ))}
            </Paper>

            <Dialog open={open} onClose={onCloseModel}>
                <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography>Create User</Typography>
                    <TextField label='Name' fullWidth sx={{ mt: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label='Email' fullWidth sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button sx={{ mt: 2, border: '1px solid blue' }} onClick={onClickCreateUser}>Create</Button>
                </Box>
            </Dialog>

            <Dialog open={open} onClose={onCloseModel}>
                <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography>Create User</Typography>
                    <TextField label='Name' fullWidth sx={{ mt: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label='Email' fullWidth sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button sx={{ mt: 2, border: '1px solid blue' }} onClick={onClickCreateUser}>Create</Button>
                </Box>
            </Dialog>

            <Dialog open={editOpen} onClose={onCloseModelNew}>
                <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography>Create User</Typography>
                    <TextField label='Name' fullWidth sx={{ mt: 2 }} value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <TextField label='Email' fullWidth sx={{ mt: 2 }} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                    <Button sx={{ mt: 2, border: '1px solid blue' }} onClick={onClickUpdateUser}>Update</Button>
                </Box>
            </Dialog>
        </Box>
    )
}

export default FuncApi
