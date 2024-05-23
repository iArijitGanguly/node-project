import { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { NodeProps } from 'reactflow';

import { NodeContext } from '../contexts/NodeContext';

const AddLeads: React.FC<NodeProps<{ label: string }>> = ({ data: { label } }) => {
  const { nodes, addLeads } = useContext(NodeContext);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const handleClick = () => {
    const presentLeadNodes = nodes.filter((node) => node.type == 'leadNode'); 
    if (presentLeadNodes.length == 2) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 1000);
      return;
    }
    addLeads('Lead');
  };
  return (
    <div className="relative">
      <div
        className="border-[1px] border-solid border-black p-4 rounded-lg flex justify-center items-center gap-x-2 cursor-pointer"
        onClick={handleClick}
      >
        <FaPlus />
        {label}
      </div>
      <p
        className={`${
          showWarning ? 'block' : 'hidden'
        } text-red-500 text-sm absolute`}
      >
        Can not create more than 2 leads
      </p>
    </div>
  );
};

export default AddLeads;
