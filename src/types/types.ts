import { Edge, Node } from 'reactflow';

export type CustomNodeData = {
    label?: string;
};

export type ChildrenProps = {
    children: React.ReactNode;
};

export interface CustomNode extends Node<CustomNodeData> {}

export interface INodeContext {
    nodes: CustomNode[],
    edges: Edge[],
    addNode: (label: string) => void,
    removeNode: (nodeId: string) => void,
    addLeads: (label: string) => void,
    removeLeads: (nodeId: string) => void
}