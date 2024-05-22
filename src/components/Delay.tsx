import { NodeProps } from 'reactflow';

import Template from './Template';

const Delay: React.FC<NodeProps<{ label: string }>> = ({ data: { label }, id }) => {
  return(
    <div>
      <Template label={label} id={id} />
    </div>
  );
};

export default Delay;