import React, { Component } from 'react';
import DragResize from './components/DragResize/DragResize'

class App extends Component {
    consturctor(props) {
        super(props)
        this.state={
            
        }
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <DragResize keyIds='aaa' editable dragable resizeable >
                    <div style={{height: '100%', background: '#59155f'}}/>
                </DragResize>
            </div>
        );
    }
}

export default App;
