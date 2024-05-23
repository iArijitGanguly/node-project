import { Edge } from 'reactflow';

import { CustomNode } from '../types/types';

export const ADD_NODE_OPTIONS = [
  {
    id: '1',
    label: 'Cold Email'
  },
  {
    id: '2',
    label: 'Delay/Wait'
  }
];

export const initialNodes: CustomNode[] = [
  {
    id: '0',
    position: { x: 350, y: 150 },
    data: { label: 'Add Leads' },
    type: 'addLeads',
  },
  {
    id: '1',
    position: { x: 100, y: 150 },
    data: { label: 'Sequence Start Point' },
    type: 'startPoint',
  },
  {
    id: '2',
    position: { x: 171, y: 250 },
    data: {},
    type: 'addNodes',
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'straight',
  }
];