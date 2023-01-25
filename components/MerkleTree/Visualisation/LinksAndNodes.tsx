import React from 'react'
import { hierarchy, Tree } from '@visx/hierarchy';
import Nodes from './Nodes';
import Links from './Links';
import { Group } from '@visx/group';
import { TreeNode } from '../Container/utils';

interface ILinksAndNodes {
    data: TreeNode;
    sizeWidth: number;
    sizeHeight: number;
    origin: { x: number; y: number; };
}

export default function LinksAndNodes(props: ILinksAndNodes) {
    const { data, sizeWidth, sizeHeight, origin } = props;
    return (
        <Tree
            root={hierarchy(data, (d) => d.children)}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
        >
            {(tree) => (
                <Group top={origin.y} left={origin.x}>
                    <Links
                        links={tree.links()} />
                    <Nodes
                        nodes={tree.descendants()}
                    />
                </Group>
            )}
        </Tree>
    )
}
