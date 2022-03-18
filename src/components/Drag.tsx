import React, { useEffect, useState } from 'react';
import {
    Paper,
    makeStyles,
    withStyles,
    IconButton,
    Typography,
    Divider,
    WithStyles,
} from '@material-ui/core';
 
import {
    Close as CloseIcon,
    Remove as RemoveIcon,
    WebAsset as WebAssetIcon
} from '@material-ui/icons';
 
import Draggable from 'react-draggable';
import { Button, createStyles, Grid, Stack, Theme } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import './Drag.css'

import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';
import PentagonIcon from '@mui/icons-material/Pentagon';
import HexagonIcon from '@mui/icons-material/Hexagon';

 
const styles = (theme:Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        cursor: 'move',
        userSelect: 'none',
        minWidth: 200
    },
    title: {
        fontWeight: 'bold'
    },
    closeButton: {
        position: 'fixed',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    minimize: {
        position: 'fixed',
        right: theme.spacing(6),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});
 
interface modalTitleType extends WithStyles<typeof styles> {
    id: any,
    children: React.ReactNode,
    width: any,
    isMinimized: any,
    onMinimized: any,
    onClose:any,
    [x: string]: any,
}
// modal 의 타이틀과 최소화 및 닫기버튼 구성    
const ModalTitle = withStyles(styles)((props:modalTitleType) => {
    const { children, classes, width, isMinimized, onMinimized, onClose, ...other } = props;
    return (
        <div className={classes.root} {...other} style={{width}}>
            <Typography variant="h6" className={classes.title}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
            {onMinimized ? (
                <IconButton aria-label="close" className={classes.minimize} onClick={onMinimized}>
                    {isMinimized ? <WebAssetIcon /> : <RemoveIcon />}
                </IconButton>
            ) : null}
        </div>
    );
});
 
const useContentStyles = (width: number, height: number) => makeStyles((theme:Theme) => ({
    content: {
        height: height,
        width: width
    }
}));

const ModalContent = (props:any) => {
    const classes = useContentStyles(props.width, props.height)();
    return (
        <>
            <Paper className={classes.content}>
                {props.children}
            </Paper>
        </>
 
    );
};
interface papercomponent{
    [x: string]: any,
}
const PaperComponent = (props: papercomponent) => {
    return (
        <Draggable handle="#draggable-modal-title">
            <Paper {...props} />
        </Draggable>
    );
};
 
const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'fixed',
        top: '10%',
        left: '15%',
        zIndex: 1300,
        userSelect: 'none',
        opacity:0.9,
    },
}));
 
const Modal = (props:any) => {
    const classes = useStyles();
    const [isMinimized, setIsMinimized] = useState(false);
    const [nodeID, setNodeId] = useState("0");
 
    const handleMinimized = () => {
        setIsMinimized(!isMinimized);
    };
    useEffect(() => {
        return () => {}
    }, []);
    function action(event:React.SyntheticEvent, nodeIds: string){
        setNodeId(nodeIds);
    }
    console.log(nodeID);
    return (
        <PaperComponent className={classes.modal}>
            <ModalTitle
                id="draggable-modal-title"
                onClose={props.onClose}
                width={props.width}
                isMinimized={isMinimized}
                onMinimized={handleMinimized}
            >
                {props.title}
            </ModalTitle>
            <Divider/>
            {!isMinimized && (
                <ModalContent
                    width={props.width}
                    height={props.height}
                >
                    <div id="main">
                        <div id="list">
                            <TreeView
                                aria-label="file system navigator"
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                                onNodeSelect={action}
                                >
                                <TreeItem nodeId="1" label="우주항적">
                                    <TreeItem nodeId="2" label="원"/>
                                </TreeItem>
                                <TreeItem nodeId="5" label="공중항적">
                                    <TreeItem nodeId="10" label="원" />
                                    <TreeItem nodeId="6" label="다각형">
                                    <TreeItem nodeId="7" label="사각형" />
                                    <TreeItem nodeId="8" label="오각형" />
                                    <TreeItem nodeId="9" label="육각형" />
                                    </TreeItem>
                                </TreeItem>
                            </TreeView>
                        </div>
                        <div id="picture">
                            <Grid id="grid" sx={nodeID==="2"?{ display: 'inline' }:{display:'none'}}>
                                <CircleIcon id="icon"/>
                            </Grid>
                            <Grid id="grid" sx={nodeID==="10"?{ display: 'inline' }:{display:'none'}}>
                                <CircleIcon id="icon"/>
                            </Grid>
                            <Grid id="grid" sx={nodeID==="7"?{ display: 'inline' }:{display:'none'}}>
                                <SquareIcon id="icon"/>
                            </Grid>
                            <Grid id="grid" sx={nodeID==="8"?{ display: 'inline' }:{display:'none'}}>
                                <PentagonIcon id="icon"/>
                            </Grid>
                            <Grid id="grid" sx={nodeID==="9"?{ display: 'inline' }:{display:'none'}}>
                                <HexagonIcon id="icon"/>
                            </Grid>
                        </div>
                    </div>
                    <div id="footer">
                        <Stack spacing={1} direction="row">
                            <Button variant='contained' style={{backgroundColor:'black', color:'white'}}>속성</Button>
                            <Button variant='contained' style={{backgroundColor:'black', color:'white'}}>확인</Button>
                            <Button variant='contained' style={{backgroundColor:'black', color:'white'}}>취소</Button>
                        </Stack>
                    </div>
                </ModalContent>
            )}
        </PaperComponent>
    );
};
 
const DraggableModal = (props?: any) => {
    return (
        <>
            {props.open && (
                <Modal title={props.title} width={props.width} height={props.height} onClose={props.onClose} children={props.children}/>
            )}
        </>
    );
};
 
export default DraggableModal;