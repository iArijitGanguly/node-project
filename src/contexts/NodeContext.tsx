import { createContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Edge, Node } from 'reactflow';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NodeContext = createContext<any | null>(null);

type Props = {
  children: React.ReactNode
};

type CustomNodeData = {
  label?: JSX.Element | string;
}

interface CustomNode extends Node<CustomNodeData> {}

export const NodeProvider: React.FC<Props> = ({ children }) => {
  const [prevNodeId, setPrevNodeId] = useState<string>('1');
  const [createId, setCreateId] = useState<number>(2);
  const initialNodes: CustomNode[] = [
    {
      id: '1',
      position: { x: 100, y: 100 },
      data: { label: 'Sequence Start Point' },
      type: 'startPoint'
    },
    {
      id: '2',
      position: { x: 171, y: 200},
      data: { label: <FaPlus /> },
      type: 'addNodes'
    }
  ];

  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  // useEffect(() => {
  //   console.log(prevNodeId);
  // }, [prevNodeId]);

  useEffect(() => {
    const initialEdge: Edge = {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'straight',
    };
    setEdges([initialEdge]);
  }, []);

  const addNode = (label: string) => {
    const newId = `${createId + 1}`;
    const lastNode = nodes[nodes.length - 1];
    const newNodePosition = { x: lastNode.position.x - 50, y: lastNode.position.y + 10 };

    const newNode: CustomNode = {
      id: newId,
      type: label == 'Cold Email' ? 'coldEmail' : 'delay',
      position: newNodePosition,
      data: { label }
    };
    setNodes((prevNodes) => {
      const plusNode = prevNodes.find((node) => node.data.label && (node.data.label as JSX.Element).type == FaPlus);
      const updatedPlusNode = plusNode
        ? { ...plusNode, position: { x: newNode.position.x + 50 , y: newNode.position.y + 100 } }
        : null;

      return updatedPlusNode
        ? [...prevNodes.filter((node) => node.id !== plusNode?.id), newNode, updatedPlusNode]
        : [...prevNodes, newNode];
    });

    const newEdge: Edge = {
      id: `e${prevNodeId} - ${newId}`,
      source: prevNodeId,
      target: newId
    };
    const plusEdge: Edge = {
      id: `e${newId}-2`,
      source: newId,
      target: '2',
      type: 'straight',
    };
    setEdges((prevEdges) => {
      const edgesWithoutPlusEdge = prevEdges.filter((edge) => edge.target !== '2');
      return [...edgesWithoutPlusEdge, newEdge, plusEdge];
    });
    setCreateId(createId + 1);
    setPrevNodeId(newId);
  };

  const removeNode = (nodeId: string) => {
    const lastNode = nodes[nodes.length - 2];
    const removeNodeIndex = nodes.findIndex((node) => node.id == nodeId);
    if(nodeId == lastNode.id) {
      const plusNodeIndex = nodes.findIndex((node) => node.id == '2');
      const plusNode = nodes[plusNodeIndex];
      const updatedPlusNode = { ...plusNode, position: { x: plusNode.position.x, y: plusNode.position.y - 110 } };
      const newNodeState = nodes.filter((node) => node.id != nodeId && node.id != plusNode.id);
      setNodes([...newNodeState, updatedPlusNode]);

      const newLastNode = newNodeState[newNodeState.length - 1];
      const plusEdge: Edge = {
        id: `e${newLastNode.id} - 2`,
        source: newLastNode.id,
        target: '2',
        type: 'straight',
      };
      setEdges((prevEdges) => {
        const edgesWithoutPlusEdge = prevEdges.filter((edge) => edge.target !== '2');
        return [...edgesWithoutPlusEdge, plusEdge];
      });
      const newPrevNodeId = nodes[removeNodeIndex - 1];
      setPrevNodeId(newPrevNodeId.id);
    }
    else {
      const prevNode = nodes[removeNodeIndex - 1];
      const nextNode = nodes[removeNodeIndex + 1];

      const newNodeState = nodes.map((node, index) => {
        if(prevNode.id == '1') {
          return node.id == '1' ? node : { ...node, position: { x: node.position.x, y: node.position.y - 110 } };
        }
        else if(index > removeNodeIndex) {
          return { ...node, position: { x: node.position.x, y: node.position.y - 110 } };
        }
        return node;
      }).
        filter((node) => node.id != nodeId);
      setNodes(newNodeState);

      setEdges((prevEdges) => {
        const edgesWithoutRemovedNode = prevEdges.filter((edge) => edge.source != nodeId && edge.target != nodeId);

        if(prevNode && nextNode) {
          const newEdge: Edge = {
            id: `e${prevNode.id}-${nextNode.id}`,
            source: prevNode.id,
            target: nextNode.id,
            type: 'straight',
          };
          return [...edgesWithoutRemovedNode, newEdge];
        }
        return edgesWithoutRemovedNode;
      });
    }
  };

  return(
    <NodeContext.Provider value={{ nodes, edges, addNode, removeNode }}>
      { children }
    </NodeContext.Provider>
  );
};