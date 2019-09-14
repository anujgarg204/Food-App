import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'

const layout = (props) => {
    return (
        <Auxiliary>
        <div>Toolbar,sideDrawer,Backdrop</div>
        <main>
            {props.children}
        </main>
        </Auxiliary>
     );
}
 
export default layout;