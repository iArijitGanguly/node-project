import { Handle, NodeProps, Position } from 'reactflow';

const StartPoint: React.FC<NodeProps<{ label: string }>> = ({ data: { label } }) => {
  return(
    <div className='border-[1px] border-solid border-black p-2 rounded-lg'>
      <div className='bg-[#410566] text-white p-2 rounded-md cursor-pointer'>
        {label}
      </div>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

export default StartPoint;