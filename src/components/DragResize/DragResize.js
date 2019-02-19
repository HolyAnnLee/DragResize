import React, { Component } from 'react';
import propTypes from 'prop-types';
import Drag from './Drag';
import Resize from './Resize';
import styles from './DragResize.sass'

export default class DragResize extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hoverable: false
        }
    }

    handleOnClick = (e) => {
        e && e.stopPropagation();
        e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation();

        const { keyId, selectable, onSelect } = this.props
        onSelect && onSelect(keyId, selectable)
    }

    handleOnMouseOver = () => {
        this.setState({ hoverable: true })
    }

    handleOnMouseOut = () => {
        this.setState({ hoverable: false })
    }


    render() {
        const { hoverable } = this.state
        const { keyId, position: { left, top, width, height }, editable, selectable, selectedBorder, hoverBorder, dragable, resizeable, dragStart, drag, dragEnd, resizeStart, resize, resizeEnd, children } = this.props
        return (
            <div
                className={styles.dragResize}
                style={{
                    width,
                    height,
                    transform: `translate(${left}px, ${top}px)`,
                }}
            >
                { children }
                {  
                    editable 
                        && 
                    <div
                        className='dragResize-edit'
                        style={{ border: selectable ? selectedBorder : ( hoverable ? hoverBorder : null ) }} 
                        onClick={this.handleOnClick}
                        onMouseOver={this.handleOnMouseOver}
                        onMouseOut={this.handleOnMouseOut}
                    >
                        {
                            selectable
                                &&
                            (
                                dragable && <Drag keyId={keyId} dragStart={dragStart} drag={drag} dragEnd={dragEnd} />,
                                resizeable && <Resize keyId={keyId} resizeStart={resizeStart} resize={resize} resizeEnd={resizeEnd} />
                            )
                        }
                    </div>
                }
            </div>
        )
    }
}

DragResize.propTypes = {
    keyId: propTypes.string,
    position: propTypes.object,
    editable: propTypes.bool,
    selectable: propTypes.bool,

    hoverBorder: propTypes.string,
    selectedBorder: propTypes.string,

    dragable: propTypes.bool,
    resizeable: propTypes.bool,

    onSelect: propTypes.func,
    dragStart: propTypes.func,
    drag: propTypes.func,
    dragEnd: propTypes.func,
    resizeStart: propTypes.func,
    resize: propTypes.func,
    resizeEnd: propTypes.func,
}

DragResize.defaultProps = {
    keyId: '',
    position: { left: 0, top: 0, width: 50, height: 50 },
    editable: false,
    selectable: false,

    hoverBorder: '1px solid rgb(0, 132, 255)',
    selectedBorder:'1px solid rgb(0, 132, 255)',

    dragable: false,
    resizeable: false,

    onSelect: (keyId, selectable) => {},
    dragStart: (position) => {},
    drag: (position, dragSize) => {},
    dragEnd: (position) => {},
    resizeStart: (position) => {},
    resize: (position, resizeSize) => {},
    resizeEnd: (position) => {},
}

