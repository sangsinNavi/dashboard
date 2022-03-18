import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drag from './Drag'
import { useState } from 'react';
import './DenseMenu.css'

export default function ContextMenu() {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const [open ,setMilitaryCode] = useState(false);
  const MilitaryCodeOpen = () => {
    setMilitaryCode(true);
    setContextMenu(null);
  };
  const MilitaryCodeClose = () => {
    setMilitaryCode(false);
  };
  return (
    <div id="map" onContextMenu={handleContextMenu} style={{ cursor: 'context-menu', width:window.innerWidth, height:window.innerHeight}}>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        style={{opacity:0.9}}
      >
        <MenuItem onClick={MilitaryCodeOpen}>군대부호</MenuItem>
        <MenuItem onClick={handleClose}>확대/축소</MenuItem>
        <MenuItem onClick={handleClose}>거리측정</MenuItem>
        <MenuItem onClick={handleClose}>인쇄</MenuItem>
      </Menu>
      <Drag
        title={'군대 부호'}
        open={open}
        width={800}
        height={500}
        onClose={MilitaryCodeClose}
      >
      </Drag>
    </div>
  );
}
