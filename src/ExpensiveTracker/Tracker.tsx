import { Box, Button, Dialog, IconButton, Paper, TextField, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import React, { Component } from 'react'

interface IsState {
    open: boolean,
    openNew: boolean,
    salary: number,
    amount: string,
    spendFor: string,
    addMoney: any[],
    spendMoney: any[]
}

class Tracker extends Component {
    state: IsState = {
        open: false,
        openNew: false,
        salary: 0,
        amount: '',
        spendFor: '',
        addMoney: [],
        spendMoney: []
    }

    onCloseHandle = () => {
        this.setState({ open: false })
    }

    onCloseHandleNew = () => {
        this.setState({ openNew: false })
    }

    handleOpenModel = () => {
        this.setState({ open: true })
    }

    onClickNewModel = () => {
        this.setState({ openNew: true })
    }

    onChangeSalary = (e: any) => {
        this.setState({ salary: e.target.value })
    }

    onChangeAmount = (e: any) => {
        this.setState({ amount: e.target.value })
    }

    onChangeSpendFor = (e: any) => {
        this.setState({ spendFor: e.target.value })
    }

    onAddSalary = (e: any) => {
        const { salary } = this.state
        e.preventDefault()
        this.setState({ open: false })
        // let newAmount = (this.state.salary) - parseInt(this.state.amount)
    }

    onSpendMoney = (e: any) => {
        e.preventDefault()
        const { amount, spendFor } = this.state
        this.setState({ openNew: false })

        let newAmount = (this.state.salary) - parseInt(this.state.amount)
        
        if(newAmount >= 0){
            this.setState({salary: newAmount})
            this.setState((prevState: any) => ({
                spendMoney: [...prevState.spendMoney, { amount, spendFor }]
            }))
        }
        this.setState({ amount: '' })
        this.setState({ spendFor: '' })
    }

    render() {
        const { open, salary, openNew, amount, spendFor, spendMoney, addMoney } = this.state

        console.log('addMoney', addMoney)

        return (
            <>
                <Box sx={{}}>
                    <Paper elevation={2} sx={{ backgroundColor: 'grey' }}>
                        <Button sx={{ mt: 2, ml: 5, border: '1px solid blue', backgroundColor: 'blue', "&:hover": { backgroundColor: 'blue' }, color: '#fff' }}
                            onClick={this.handleOpenModel}>Add Money
                        </Button>
                        <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', mt: -5, pb: 3, fontFamily: 'sans-serif' }}>Expensive Tracker</Typography>
                    </Paper>

                    <Paper elevation={2} sx={{ m: 3, pb: 1 }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#63666c', p: 1 }}>
                            <Typography sx={{
                                border: '1px solid yellow', backgroundColor: '#fff', ml: 3, mt: 1, width: '100px', fontSize: '18px', fontWeight: 700,
                                height: '35px', textAlign: 'center', mb: 0,
                            }}>{salary}</Typography>
                            <Typography variant='h5' sx={{ color: '#fff' }}>Expensive Tracker</Typography>
                            <IconButton aria-label="Add" sx={{ border: '1px solid yellow', backgroundColor: '#fff', mr: 3 }} onClick={this.onClickNewModel}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ m: 2, }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '2px solid yellow', borderRadius: '6px', p: 1, mb: 2 }}>
                                <Typography>Salary</Typography>
                                <Typography>{salary}</Typography>
                            </Box>
                            {spendMoney.map((item) => (
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '2px solid green', borderRadius: '6px', p: 1, mb: 2 }}>
                                        <Typography>{item.spendFor}</Typography>
                                        <Typography>{item.amount}</Typography>
                                    </Box>
                                </>
                            ))}
                        </Box>
                    </Paper>
                </Box>

                <Box>
                    <Dialog open={open} onClose={this.onCloseHandle}>
                        <Box sx={{ display: 'flex', alignSelf: 'flex-end' }}>
                            <IconButton color="secondary" aria-label="close" sx={{ alignSelf: 'flex-end' }} onClick={this.onCloseHandle} >
                                <CancelIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                            <Typography sx={{ fontFamily: 'cursive' }} variant='h5' color='black'>Enter The Salary</Typography>
                        </Box>
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mt: 2 }}>
                            <TextField fullWidth label='Enter Salary' value={salary} onChange={this.onChangeSalary} />
                            <Button sx={{ mt: 3, border: '1px solid black', fontWright: 600, letterSpacing: 1.5, fontSize: '14px' }} fullWidth onClick={this.onAddSalary}>Submit</Button>
                        </Box>
                    </Dialog>
                </Box>

                <Box>
                    <Dialog open={openNew} onClose={this.onCloseHandleNew}>
                        <Box sx={{ display: 'flex', alignSelf: 'flex-end' }}>
                            <IconButton color="secondary" aria-label="close" sx={{ alignSelf: 'flex-end' }} onClick={this.onCloseHandleNew} >
                                <CancelIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                            <Typography sx={{ fontFamily: 'sans-serif' }} variant='h5' color='black'>New Transaction</Typography>
                        </Box>
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mt: 2 }}>
                            <TextField fullWidth label='Amount' value={amount} onChange={this.onChangeAmount} />
                            <TextField fullWidth label='For' value={spendFor} onChange={this.onChangeSpendFor} sx={{ mt: 5 }} />
                            <Button sx={{ mt: 3, border: '1px solid green', fontWright: 600, letterSpacing: 1.5, fontSize: '14px' }} fullWidth onClick={this.onSpendMoney}>PAID</Button>
                        </Box>
                    </Dialog>
                </Box>
            </>
        )
    }
}

export default Tracker
