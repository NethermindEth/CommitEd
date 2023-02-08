import React from 'react';
import { Group } from '@visx/group';
import LinksAndNodes from './LinksAndNodes';
import { LinearGradient } from '@visx/gradient';
import { TreeNode } from '../Container/utils';

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };
const defaultTotalWidth = 640;
const defaultTotalHeight = 360;

export type VisualisationProps = {
    data: TreeNode;
};

const defaultProp = { name: "" };

const Visualisation: React.FC<VisualisationProps> = ({ data = defaultProp }) => {
    const totalWidth = defaultTotalWidth;
    const totalHeight = defaultTotalHeight;
    const margin = defaultMargin

    const innerWidth = totalWidth - margin.left - margin.right;
    const innerHeight = totalHeight - margin.top - margin.bottom;

    let origin: { x: number; y: number };
    let sizeWidth: number;
    let sizeHeight: number;

    origin = { x: 0, y: 0 };
    sizeWidth = innerWidth;
    sizeHeight = innerHeight;

    return totalWidth < 10 ? null : (
        <div>
            <svg width={totalWidth} height={totalHeight}>
                <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
                <rect width={totalWidth} height={totalHeight} fill="#272b4d" />
                <Group top={margin.top} left={margin.left}>
                    <LinksAndNodes
                        data={data}
                        sizeWidth={sizeWidth}
                        sizeHeight={sizeHeight}
                        origin={origin}
                    />
                </Group>
            </svg>
        </div>
    );
}

export default Visualisation;