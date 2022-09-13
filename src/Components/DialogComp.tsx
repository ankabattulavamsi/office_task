import { Box, Divider, IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import React, { Component } from 'react'

interface IsProps {
    open: boolean,
    noteData: any[],
    task: string,
    backGColor: string,
    onClosePop: (id: any) => void,
    onOpenPop: (id: any) => void,
    changeTask: (id: any) => void,
    onClickAdd: (id: any) => void, 
    onClickAddYellow: (id: any) => void, 
    onClickAddGreen: (id: any) => void,
    onClickAddPink: (id: any) => void,
    onClickAddPurple: (id: any) => void, 
    onClickAddBlue: (id: any) => void,
    onClickAddBlack : (id: any) => void, 
    onClickAddNone: (id: any) => void
}

class DialogComp extends Component<IsProps> {
    state = {
        isColor: true
    }

    onChangeColor = () => {
        this.setState({ isColor: false })
    }

    render() {
        const { open, onClosePop, changeTask, task, onClickAdd, onClickAddYellow, onClickAddGreen, onClickAddPink, onClickAddPurple, onClickAddBlue, onClickAddBlack, onClickAddNone } = this.props
        // const { isColor } = this.state
        return (
            <>
                <Dialog open={open} onClose={onClosePop} >
                    <Box sx={{}}>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: this.props.backGColor }}>
                            <IconButton aria-label="add-icon" sx={{ color: '#9297a1', }} onClick={onClickAdd} >
                                <AddIcon />
                            </IconButton>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton aria-label="setting" sx={{ color: '#9297a1' }} onClick={this.onChangeColor}>
                                    <MoreHorizIcon />
                                </IconButton>

                                <IconButton aria-label="clear" sx={{ color: '#9297a1', ml: 2 }} onClick={onClosePop}>
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <button style={{ backgroundColor: 'yellow', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={onClickAddYellow}></button>
                            <button style={{ backgroundColor: 'green', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={onClickAddGreen}></button>
                            <button style={{ backgroundColor: 'pink', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={onClickAddPink}></button>
                            <button style={{ backgroundColor: 'purple', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={onClickAddPurple}></button>
                            <button style={{ backgroundColor: 'blue', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={onClickAddBlue}></button>
                            <button style={{ backgroundColor: '#40524e', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={onClickAddBlack}></button>
                            <button style={{ backgroundColor: '#370f59', width: '50px', height: '35px', border: 'none', outline: 'none', cursor: "pointer" }} onClick={onClickAddNone}></button>
                        </Box>

                        <Box sx={{ backgroundColor: '#282c34' }}>
                            <textarea rows={16} cols={40} placeholder='Take a note' value={task} onChange={changeTask}
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
            </>
        )
    }
}

export default DialogComp
