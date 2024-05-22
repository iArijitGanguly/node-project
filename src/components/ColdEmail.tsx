import { NodeProps } from 'reactflow';

import Template from './Template';

const ColdEmail: React.FC<NodeProps<{ label: string }>> = ({ data: { label }, id }) => {
  return(
    <div>
      <Template label={label} id={id} />
    </div>
  );
};

export default ColdEmail;