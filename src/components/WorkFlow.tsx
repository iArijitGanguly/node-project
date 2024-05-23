import 'reactflow/dist/style.css';

import { useContext } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';

import { NodeContext } from '../contexts/NodeContext';
import AddLeads from './AddLeads';
import AddNodes from './AddNodes';
import ColdEmail from './ColdEmail';
import Delay from './Delay';
import LeadNodes from './LeadNodes';
import StartPoint from './StartPoint';

const nodeTypes = {
  'addLeads': AddLeads,
  'startPoint': StartPoint,
  'addNodes': AddNodes,
  'coldEmail': ColdEmail,
  'delay': Delay,
  'leadNode': LeadNodes
};

const WorkFlow: React.FC = () => {
  const { nodes, edges } = useContext(NodeContext);
  return (
    <div className='h-screen border-[1px] border-solid border-black'>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default WorkFlow;