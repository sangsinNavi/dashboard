import React, { useState } from 'react';
import Drawer from './components/Drawer';
import DenseMenu from './components/DenseMenu'
import Drag from './components/Drag'
import './App.css'

window.oncontextmenu = function ()
{
    return false;     // cancel default menu
}
function App() {
  const [open ,setOpen] = useState(true);
  const handleOpenToggle = () => {
    setOpen(!open);
  };
  return (
    <div className="App" id="map">
      <Drawer />
      <DenseMenu />
    </div>
  );
}
// function blockRightClick(event){
//   event.preventDefault();
//   canvas.addEventListener();
// }
export default App;

