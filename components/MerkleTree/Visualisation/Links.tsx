import React, { useEffect, useRef, useState, useCallback } from 'react'
import getLinkComponent from './getLinkComponent';

const stepPercent = 0.5;
const linkType = 'diagonal';
let defaultLinkColor = 'rgb(254,110,158,0.6)';
let defaultStrokeWeight = 1;

export default function Links(props: any) {
    const { links } = props;

    const LinkComponent = getLinkComponent({ linkType });

    const prevLinks = useRef({ links })

    const [indicesOfChangedLinks, setIndicesOfChangedLinks] = useState([])

    const [isBlinking, setIsBlinking] = useState(false)

    const triggerBlink = useCallback((indicesOfChangedLinks: any) => {
        if (!isBlinking) {
            setIsBlinking(true)
            setIndicesOfChangedLinks(indicesOfChangedLinks)
            setTimeout(() => {
                setIndicesOfChangedLinks([])
                setIsBlinking(false)
            }, 1000)
        }
    }, [isBlinking])

    useEffect(() => {
        const _indicesOfChangedLinks = getIndicesOfChangedLinks(prevLinks.current.links, links)
        if (_indicesOfChangedLinks.length > 0) {
            triggerBlink(_indicesOfChangedLinks)
        }
        if (prevLinks.current.links.length !== links.length) {
            setIndicesOfChangedLinks([])
        }
        prevLinks.current.links = links
    }, [links, isBlinking, indicesOfChangedLinks, triggerBlink])

    return links.map((link: any, index: number) => {
        let color = defaultLinkColor;
        let strokeWidth = defaultStrokeWeight;

        if (indicesOfChangedLinks.length > 0) {
            //@ts-ignore
            if (indicesOfChangedLinks.includes(index)) {
                color = 'yellow'
                strokeWidth = 2.5
            }
        }

        return (
            <LinkComponent
                key={index}
                data={link}
                percent={stepPercent}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
            />
        );
    })
}

const getIndicesOfChangedLinks = (prevLinks: any, links: any) => {
    if (prevLinks.length !== links.length) {
        return []
    }
    let indicesOfChangedLinks: any = []
    for (let i = 0; i < links.length; i++) {
        if (links[i].source.data.name !== prevLinks[i].source.data.name && links[i].target.data.name !== prevLinks[i].target.data.name) {
            indicesOfChangedLinks.push(i)
        }
    }
    return indicesOfChangedLinks;
}