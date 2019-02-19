import React, { PureComponent } from 'react';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators'

export default class Drag extends PureComponent {
    componentDidMount() {
        const { keyId, dragStart, drag, dragEnd } = this.props

        fromEvent(this.domRef, 'mousedown')
            .pipe(
                map(event => {
                    dragStart && dragStart(keyId, event)
                    return event
                }),
                switchMap(preEvent =>{
                    return fromEvent(window, 'mousemove').pipe(
                        map(event => {
                            return { preEvent, event }
                        }),
                        takeUntil(window, 'mouseup').pipe(
                            map(event => {
                                dragEnd && dragEnd(keyId, event)
                            })
                        )
                    )
                })
            ).subscribe(({ preEvent, event}) => {
                drag && drag(keyId, preEvent, event)
            })
    }

    handleOnClick = (e) => {
        e && e.stopPropagation();
        e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        return <div className='dragResize-drag' ref={(ref) => this.domRef = ref} onClick={this.handleOnClick} />
    }
}