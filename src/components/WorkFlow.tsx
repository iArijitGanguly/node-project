import 'reactflow/dist/style.css';

import { useContext } from 'react';
// import { useCallback } from 'react';
import ReactFlow, {  Background, Controls } from 'reactflow';

import { NodeContext } from '../contexts/NodeContext';
import AddNodes from './AddNodes';
import ColdEmail from './ColdEmail';
import Delay from './Delay';
import StartPoint from './StartPoint';

const nodeTypes = {
  'startPoint': StartPoint,
  'addNodes': AddNodes,
  'coldEmail': ColdEmail,
  'delay': Delay
};

const WorkFlow: React.FC = () => {
  const { nodes, edges } = useContext(NodeContext);

  //   const onConnect = useCallback((connection: Connection) => {
  //     const edge = { ...connection, animated: true, id: `${edges.length + 1}` };
  //     setEdges((prevEdges) => {
  //       return addEdge(edge, prevEdges);
  //     });
  //   }, []);
  return (
    <div className='h-screen border-[1px] border-solid border-black'>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkFlow;