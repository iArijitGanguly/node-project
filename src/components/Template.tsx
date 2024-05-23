import { useContext } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { Handle, Position } from 'reactflow';

import { NodeContext } from '../contexts/NodeContext';

const Template: React.FC<{ label: string; id: string }> = ({ label, id }) => {
  const { removeNode, removeLeads } = useContext(NodeContext);
  const handleClick = () => {
    if(label == 'Cold Email' || label == 'Delay/Wait') {
      removeNode(id);
    }
    else {
      removeLeads(id);
    }
  };
  return (
    <div className='h-16 w-36 border-[1px] border-solid border-black flex justify-center items-center gap-x-3 relative group'>
      <div
        className='absolute -top-2 -right-2 border-[1px] border-solid border-red-500 text-red-500 font-[800] bg-red-200 hidden group-hover:block transition-all duration-500 cursor-pointer'
        onClick={handleClick}
      >
        <RxCross2 />
      </div>
      {label == 'Cold Email' && <MdOutlineMail fontSize='2rem' />}
      {label == 'Delay/Wait' && <FaRegClock fontSize='1.7rem' />}
      <p>{label}</p>
      <div>
        {(label == 'Cold Email' || label == 'Delay/Wait') && <Handle type='target' position={Position.Top} />}
        <Handle type='source' position={Position.Bottom} />
      </div>
    </div>
  );
};

export default Template;
