import { Dialog, Divider, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import DialogComp from './DialogComp';

let count = 1

interface IsState {
    open: boolean,
    openEdit: boolean,
    noteData: any[],
    task: string,
    editTask: string,
    setTime: any,
    countDays: string,
    searchResult: string, 
    editId : string, 
    editData: any, 
    yellowBgColor: string, 
    editColor: string
}

class Sticky extends Component {
    initialValue = JSON.parse(localStorage.getItem('Sticky') as any) || []
    state: IsState = {
        open: false,
        openEdit: false,
        noteData: this.initialValue,
        task: '',
        editTask: '',
        setTime: null,
        countDays: '1',
        searchResult: '', 
        editId: '',
        editData: null, 
        yellowBgColor: '', 
        editColor: ''
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    onCloseNewModel = () => { 
        this.setState({openEdit: false})
        console.log('Update form close')
    }

    handleOpen = () => {
        this.setState({ open: true })
        console.log('initial adding form')
    }

    onChangeTask = (e: { target: { value: any; }; }) => {
        this.setState({ task: e.target.value })
    }

    onChangeResult = (e: { target: { value: any; }; }) => {
        this.setState({ searchResult: e.target.value })
    }

    onChangeEditTask = (e : { target: { value: any; }; }) => {
        this.setState({editTask: e.target.value})
    }

    onClickAdd = () => {
        const { task, noteData, yellowBgColor } = this.state
        console.log('initial task', task)
        this.setState((prevState: any) => ({
            noteData: [...prevState.noteData, { id: uuidv4(), task: task, bgColor: yellowBgColor }]
        }))
        localStorage.setItem('Sticky', JSON.stringify(noteData))
        this.setState({ task: '' })
    }

    onClickUpdateModel = () =>  {
        const {noteData, editId, editTask, editColor} = this.state
        const findIndex = noteData.findIndex((item) => item.id === editId)
        noteData[findIndex].task = editTask
        noteData[findIndex].bgColor = editColor
        this.setState({editData: noteData})
        localStorage.setItem('Sticky', JSON.stringify(noteData))
    }

    componentDidMount(): void {
        this.timeCalculation()
        setInterval(() => {
            this.timeCalculation()
        }, 60000)
    }

    timeCalculation = () => {

        let startTime = new Date()
        let gettingHour = startTime.getHours()
        let gettingMinutes = startTime.getMinutes()

        let timeInHourAndMinutes = gettingHour + ':' + gettingMinutes
        console.log(timeInHourAndMinutes)

        if (gettingHour > 24) {
            return this.setState({ countDays: count + 1 })
        }
        else {
            return this.setState({ setTime: timeInHourAndMinutes })
        }
    }

    // filteredNotedData = () => {
    //     const {noteData, searchResult} = this.state
    //     const filterTask = noteData.filter(each => each.task.includes(searchResult.toLocaleLowerCase()))
    // }

    onClickDelate = (id: any) => {
        console.log('getting id', id)
        const { noteData } = this.state
        const deleteData = noteData.filter((item: any) => item.id !== id)
        console.log('deleteData', deleteData)
        this.setState({ noteData: deleteData })
    }

    onClickHandleEdit = (item :any) => {
        console.log('updated form ')
        console.log('sticky-id', item.task)
        this.setState({ openEdit: true })
        this.setState({ editTask: item.task })
        this.setState({ editColor: item.bgColor })
        this.setState({editId: item.id})
    }

    onClickAddYellow = () => {
        this.setState({yellowBgColor: 'yellow'})
    }

    onClickAddGreen = () => {
        this.setState({yellowBgColor: 'green'})
    }

    onClickAddPink = () => {
        this.setState({yellowBgColor: 'pink'})
    }

    onClickAddPurple = () => {
        this.setState({yellowBgColor: 'purple'})
    }

    onClickAddBlue = () => {
        this.setState({yellowBgColor: 'blue'})
    }

    onClickAddBlack = () => {
        this.setState({yellowBgColor: '#40524e'})
    }

    onClickAddNone = () => {
        this.setState({yellowBgColor: '#370f59'})
    }

    onClickEditAddYellow = () => {
        this.setState({editColor: 'yellow'})
    }

    onClickEditAddGreen = () => {
        this.setState({editColor: 'green'})
    }

    onClickEditAddPink = () => {
        this.setState({editColor: 'pink'})
    }

    onClickEditAddPurple = () => {
        this.setState({editColor: 'purple'})
    }

    onClickEditAddBlue = () => {
        this.setState({editColor: 'blue'})
    }

    onClickEditAddBlack = () => {
        this.setState({editColor: '#40524e'})
    }

    onClickEditAddNone = () => {
        this.setState({editColor: '#370f59'})
    }


    render() {
        const { open, noteData, task, setTime, searchResult, openEdit, editTask } = this.state
        console.log('noteData', noteData)
        const filterTask = noteData.filter(each => each.task.toLocaleLowerCase().includes(searchResult.toLocaleLowerCase()))
        // noteData.filter((i:any) => console.log('ids',i.id))

        return (
            <>
                <Paper elevation={2} sx={{ p: 2, width: '400px', backgroundColor: '#282c34' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                        <IconButton aria-label="add-icon" sx={{ color: '#ffffffee', ml: -1.5 }} onClick={this.handleOpen}>
                            <AddIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton aria-label="setting" sx={{ color: '#9297a1' }}>
                                <SettingsIcon />
                            </IconButton>
                            <IconButton aria-label="clear" sx={{ color: '#9297a1', ml: 2 }}>
                                <ClearIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Typography variant="h5" sx={{ color: '#fff', mt: 1, fontFamily: 'initial' }}>Sticky Notes</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#7a7e85', borderRadius: '10px', mt: 2 }}>
                        <input placeholder='Search' value={searchResult} onChange={this.onChangeResult}
                            style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', color: '#fff', fontSize: '16px', marginLeft: '10px' }} />
                        <IconButton aria-label="search" sx={{ color: '#ffffffee', }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        {filterTask.map((item: any) => (
                            <Box key={item.id} sx={{
                                p: 2, backgroundColor: '#787d88', borderRadius: '5px', borderTop: `3px solid ${item.bgColor}`, mt: 2,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }} >
                                <Typography onClick={(e) => this.onClickHandleEdit(item)}  sx={{ color: '#fff' }} >{item.task}</Typography>
                                <Box>
                                    <Typography sx={{ color: `${item.bgColor}`, fontSize: '12px', mt: -1.5 }}>{setTime}</Typography>
                                    <IconButton aria-label="add-icon" sx={{ color: '#e45353' }} onClick={() => this.onClickDelate(item.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Paper>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DialogComp open={open} onClosePop={this.handleClose} onOpenPop={this.handleOpen} noteData={noteData}
                        task={task} changeTask={this.onChangeTask} onClickAdd={this.onClickAdd} backGColor={this.state.yellowBgColor}
                        onClickAddYellow={this.onClickAddYellow} onClickAddGreen={this.onClickAddGreen} onClickAddPink={this.onClickAddPink} onClickAddPurple={this.onClickAddPurple}
                        onClickAddBlue={this.onClickAddBlue} onClickAddBlack={this.onClickAddBlack} onClickAddNone={this.onClickAddNone} />
                </Box>

                <Box>
                    <Dialog open={openEdit} onClose={this.onCloseNewModel}>
                        <Box sx={{}}>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor : this.state.editColor }}>
                                <IconButton aria-label="add-icon" sx={{ color: '#9297a1', }} onClick={this.onClickUpdateModel} >
                                    <AddIcon />
                                </IconButton>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton aria-label="setting" sx={{ color: '#9297a1' }} >
                                        <MoreHorizIcon />
                                    </IconButton>

                                    <IconButton aria-label="clear" sx={{ color: '#9297a1', ml: 2 }} onClick={this.onCloseNewModel}>
                                        <ClearIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <button style={{ backgroundColor: 'yellow', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={this.onClickEditAddYellow}></button>
                                <button style={{ backgroundColor: 'green', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={this.onClickEditAddGreen}></button>
                                <button style={{ backgroundColor: 'pink', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={this.onClickEditAddPink}></button>
                                <button style={{ backgroundColor: 'purple', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={this.onClickEditAddPurple}></button>
                                <button style={{ backgroundColor: 'blue', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={this.onClickEditAddBlue}></button>
                                <button style={{ backgroundColor: '#40524e', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={this.onClickEditAddBlack}></button>
                                <button style={{ backgroundColor: '#370f59', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={this.onClickEditAddNone}></button>
                            </Box>

                            <Box sx={{ backgroundColor: '#282c34' }}>
                                <textarea rows={16} cols={40} placeholder='Take a note' value={editTask} onChange={this.onChangeEditTask}
                                    style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', color: '#fff', margin: '6px' }} ></textarea>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#282c34' }}>
                                <IconButton aria-label="setting" sx={{ color: '#ffffffee', ml: -7 }}>
                                    <FormatBoldIcon />
                                </IconButton>

                                <IconButton aria-label="clear" sx={{ color: '#ffffffee', ml: 1 }}>
                                    <FormatItalicIcon />
                                </IconButton>

                                <IconButton aria-label="clear" sx={{ color: '#ffffffee', ml: 1 }}>
                                    <FormatUnderlinedIcon />
                                </IconButton>

                                <IconButton aria-label="clear" sx={{ color: '#ffffffee', ml: 1 }}>
                                    <FormatStrikethroughIcon />
                                </IconButton>

                                <IconButton aria-label="clear" sx={{ color: '#ffffffee', mr: 4 }}>
                                    <SwitchRightIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Dialog>
                </Box>
            </>
        )
    }
}

export default Sticky
