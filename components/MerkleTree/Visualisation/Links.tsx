import React, { useEffect, useRef, useState, useCallback } from 'react'
import getLinkComponent, { LinkComponentType } from './getLinkComponent';
import { HierarchyLink } from '@visx/hierarchy/lib/types';

const stepPercent = 0.5;
const linkType = 'diagonal';
let defaultLinkColor = 'rgb(254,110,158,0.6)';
let defaultStrokeWeight = 1;

type Datum = {
    name: string;
}
type LinksType = {
    links: HierarchyLink<Datum>[]
}

const Links: React.FC<LinksType> = (props: LinksType) => {
    const { links } = props;

    const LinkComponent = getLinkComponent({ linkType });

    const prevLinks = useRef({ links })

    const [indicesOfChangedLinks, setIndicesOfChangedLinks] = useState<number[]>([])

    const [isBlinking, setIsBlinking] = useState(false)

    const triggerBlink = useCallback((indicesOfChangedLinks: number[]) => {
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

    const linksArray = links.map((link: HierarchyLink<Datum>, index: number) => {
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

    return (
        <>
            {linksArray}
        </>
    )
}

const getIndicesOfChangedLinks = (prevLinks: HierarchyLink<Datum>[], links: HierarchyLink<Datum>[]) => {
    if (prevLinks.length !== links.length) {
        return []
    }
    let indicesOfChangedLinks = []
    for (let i = 0; i < links.length; i++) {
        if (links[i].source.data.name !== prevLinks[i].source.data.name && links[i].target.data.name !== prevLinks[i].target.data.name) {
            indicesOfChangedLinks.push(i)
        }
    }
    return indicesOfChangedLinks;
}

export default Links;