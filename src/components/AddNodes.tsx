import { useContext, useRef } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import { ADD_NODE_OPTIONS } from '../constants/constant';
import { NodeContext } from '../contexts/NodeContext';

const AddNodes: React.FC<NodeProps<{ label: JSX.Element }>> = ({ data: { label } }) => {
  const dialofRef = useRef<HTMLDialogElement>(null!);
  const { addNode } = useContext(NodeContext);
  return (
    <div>
      <button
        className="border-[2px] border-solid border-blue-600 p-3 text-blue-600"
        onClick={() => dialofRef.current.showModal()}
      >
        {label}
      </button>
      <dialog id="my_modal_1" className="modal" ref={dialofRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Nodes</h3>
          <div className="flex justify-around">
            {
              ADD_NODE_OPTIONS.map((nodeOption) => (
                <p key={nodeOption.id} className="btn py-4 cursor-pointer" 
                  onClick={() => addNode(nodeOption.label)}
                >
                  { nodeOption.label }
                </p>
              ))
            }
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default AddNodes;
