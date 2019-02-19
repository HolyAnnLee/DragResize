import React, { PureComponent } from 'react';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators'

const reSize = 4
const xAxis = { top: 0, bottom: 0, width: reSize }
const yAxis = { left: 0, right: 0, height: reSize }

const reBlock = { width: reSize, height: reSize }

const resizeArray = [
    {key: 'resize-left', aspect: 'left', style: { cursor: 'w-resize', left: -reSize / 2, ...xAxis }},
    {key: 'resize-top', aspect: 'top', style: { cursor: 's-resize', top: -reSize /2, ...yAxis }},
    {key: 'resize-right', aspect: 'right', style: { cursor: 'w-resize', right: -reSize /2, ...xAxis }},
    {key: 'resize-bottom', aspect: 'right', style: { cursor: 's-resize', bottom: -reSize /2, ...yAxis }},

    {key: 'resize-left-top', aspect: 'left-top', style: { cursor: 'se-resize', left: -reSize / 2, top: -reSize / 2, ...reBlock }},
    {key: 'resize-right-top', aspect: 'right-top', style: { cursor: 'sw-resize', right: -reSize / 2, top: -reSize / 2, ...reBlock }},
    {key: 'resize-left-bottom', aspect: 'left-bottom', style: { cursor: 'sw-resize', left: -reSize / 2, bottom: -reSize / 2, ...reBlock }},
    {key: 'resize-right-bottom', aspect: 'right-bottom', style: { cursor: 'se-resize', right: -reSize / 2, bottom: -reSize / 2, ...reBlock }},
]

export default class Resize extends PureComponent {

    constructor(props) {
        super(props)
        this.refArr = []
    }

    componentDidMount() {
        const { keyId, resizeStart, risize, resizeEnd } = this.props

        this.refArr.forEach(domRef => {
            const { aspect, ref } = domRef

            fromEvent(ref, 'mousedown').pipe(
                map(event => {
                    resizeStart && resizeStart(keyId, aspect, event)
                    return event
                }),
                switchMap(preEvent => {
                    return fromEvent(window, 'mousemove').pipe(
                        map(event => {
                            return { preEvent, event }
                        }),
                        takeUntil(
                            fromEvent(window, 'mouseup').pipe(
                                map(event => {
                                    resizeEnd && resizeEnd(keyId, aspect, event)
                                })
                            )
                        )
                    )
                })
            ).subscribe(({ preEvent, event }) => {
                risize && risize(keyId, aspect, preEvent, event)
            })

        })
    }

    resizeRender = () => {
        resizeArray.map(resize => {
            const { key, aspect, style } = resize
            return <div key={key} ref={ref => this.refArr.push({ aspect ,ref})} className='dragResize-resize' style={style} onClick={this.handleOnClick} />
        })
    }

    handleOnClick = (e) => {
        e && e.stopPropagation();
        e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        return this.resizeRender()
    }
}