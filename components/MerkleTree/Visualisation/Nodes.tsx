import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Group } from '@visx/group';

const defaultStrokeColor = '#03c0dc'

export default function Nodes(props: any) {
    const { nodes } = props;

    const prevNodes = useRef({ nodes })

    const [indexOfChangedNodes, setIndexOfChangedNodes]: any = useState([])

    const [isBlinking, setIsBlinking] = useState(false)

    const triggerBlink = useCallback((indicesOfChangedLinks: any) => {
        if (!isBlinking) {
            setIsBlinking(true)
            setIndexOfChangedNodes(indicesOfChangedLinks)
            setTimeout(() => {
                setIndexOfChangedNodes([])
                setIsBlinking(false)
            }, 1000)
        }
    }, [isBlinking])

    useEffect(() => {
        const _indexOfChangedNodes = getIndexOfChangedNodes(prevNodes.current.nodes, nodes);
        if (_indexOfChangedNodes.length > 0) {
            triggerBlink(_indexOfChangedNodes)
        }
        if (prevNodes.current.nodes.length !== nodes.length) {
            setIndexOfChangedNodes([])
        }
        prevNodes.current.nodes = nodes;
    }, [nodes, triggerBlink])

    return nodes.map((node: any, key: any) => {
        const width = 50;
        const height = 20;

        let top: number;
        let left: number;

        top = node.y;
        left = node.x;

        let stroke = defaultStrokeColor;

        //@ts-ignore
        if (indexOfChangedNodes.includes(key)) {
            stroke = 'yellow';
        }

        return (
            <Group top={top} left={left} key={key}>
                <rect
                    height={height}
                    width={width}
                    y={-height / 2}
                    x={-width / 2}
                    fill="#272b4d"
                    stroke={stroke}
                    strokeWidth={1}
                    strokeDasharray={'0'}
                    strokeOpacity={1}
                    onClick={() => {
                        node.data.isExpanded = !node.data.isExpanded;
                        console.log(node);

                    }}
                />
                <text
                    dy=".33em"
                    fontSize={12}
                    fontFamily="Arial"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none' }}
                    fill={'white'}
                >
                    {getTrimmedText(node.data.name, 2)}
                </text>
            </Group >
        );
    })
}

const getTrimmedText = (str: string, noOfStringsToShow: number) => {
    if (str.length > 5) {
        const firstString = str.slice(0, noOfStringsToShow);
        const lastString = str.slice(str.length - noOfStringsToShow, str.length);
        return firstString + '..' + lastString;
    } else {
        return str;
    }
}

const getIndexOfChangedNodes = (prevNodes: any, nodes: any) => {
    if (prevNodes.length !== nodes.length) return [];
    const indexOfChangedNodes = [];
    for (let i = 0; i < nodes.length; i++) {
        if (prevNodes[i].data.name !== nodes[i].data.name) {
            indexOfChangedNodes.push(i);
        }
    }
    return indexOfChangedNodes;
}
