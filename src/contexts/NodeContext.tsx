import { createContext, useState } from 'react';
import { Edge } from 'reactflow';

import { initialEdges,initialNodes } from '../constants/constant';
import { ChildrenProps, CustomNode, INodeContext } from '../types/types';

export const NodeContext = createContext<INodeContext>(null!);

export const NodeProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [prevNodeId, setPrevNodeId] = useState<string>('1');
  const [createId, setCreateId] = useState<number>(2);
  const [leadId, setLeadId] = useState<number>(-1);

  const addNode = (label: string) => {
    const newId = `${createId + 1}`;
    const lastNode = nodes[nodes.length - 1];
    const newNodePosition = {
      x: lastNode.position.x - 50,
      y: lastNode.position.y + 10,
    };

    const newNode: CustomNode = {
      id: newId,
      type: label == 'Cold Email' ? 'coldEmail' : 'delay',
      position: newNodePosition,
      data: { label },
    };
    setNodes((prevNodes) => {
      const plusNodeIndex = prevNodes.findIndex((node) => node.id == '2');
      const plusNode = prevNodes[plusNodeIndex];
      const updatedPlusNode = {
        ...plusNode,
        position: {
          x: newNode.position.x + 50,
          y: newNode.position.y + 100,
        },
      };

      return [
        ...prevNodes.filter((node) => node.id !== plusNode.id),
        newNode,
        updatedPlusNode,
      ];
    });

    const newEdge: Edge = {
      id: `e${prevNodeId} - ${newId}`,
      source: prevNodeId,
      target: newId,
    };
    const plusEdge: Edge = {
      id: `e${newId}-2`,
      source: newId,
      target: '2',
      type: 'straight',
    };
    setEdges((prevEdges) => {
      const edgesWithoutPlusEdge = prevEdges.filter(
        (edge) => edge.target !== '2'
      );
      return [...edgesWithoutPlusEdge, newEdge, plusEdge];
    });
    setCreateId(createId + 1);
    setPrevNodeId(newId);
  };

  const removeNode = (nodeId: string) => {
    const lastNode = nodes[nodes.length - 2];
    const removeNodeIndex = nodes.findIndex((node) => node.id == nodeId);
    if (nodeId == lastNode.id) {
      const plusNodeIndex = nodes.findIndex((node) => node.id == '2');
      const plusNode = nodes[plusNodeIndex];
      const updatedPlusNode = {
        ...plusNode,
        position: { x: plusNode.position.x, y: plusNode.position.y - 110 },
      };
      const newNodeState = nodes.filter(
        (node) => node.id != nodeId && node.id != plusNode.id
      );
      setNodes([...newNodeState, updatedPlusNode]);

      const newLastNode = newNodeState[newNodeState.length - 1];
      const plusEdge: Edge = {
        id: `e${newLastNode.id} - 2`,
        source: newLastNode.id,
        target: '2',
        type: 'straight',
      };
      setEdges((prevEdges) => {
        const edgesWithoutPlusEdge = prevEdges.filter(
          (edge) => edge.target !== '2'
        );
        return [...edgesWithoutPlusEdge, plusEdge];
      });
      const newPrevNodeId = nodes[removeNodeIndex - 1];
      setPrevNodeId(newPrevNodeId.id);
    } else {
      const prevNode = nodes[removeNodeIndex - 1];
      const nextNode = nodes[removeNodeIndex + 1];

      const newNodeState = nodes
        .map((node, index) => {
          if (prevNode.id == '1') {
            return (node.id == '1' || node.type == 'leadNode' || node.type == 'addLeads')
              ? node
              : {
                ...node,
                position: { x: node.position.x, y: node.position.y - 110 },
              };
          } else if (index > removeNodeIndex) {
            return {
              ...node,
              position: { x: node.position.x, y: node.position.y - 110 },
            };
          }
          return node;
        })
        .filter((node) => node.id != nodeId);
      setNodes(newNodeState);

      setEdges((prevEdges) => {
        const edgesWithoutRemovedNode = prevEdges.filter(
          (edge) => edge.source != nodeId && edge.target != nodeId
        );

        if (prevNode && nextNode) {
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

  const addLeads = (label: string) => {
    const leadNode = nodes.find((node) => node.type == 'leadNode');
    const leadNodePosition = {
      x: Math.floor(Math.random() * (400 - 200)) + 280,
      y: Math.floor(Math.random() * (50 - 10)) + 10,
    };
    let newLeadNode: CustomNode;
    leadNode
      ? (newLeadNode = {
        id: `${leadId}`,
        type: 'leadNode',
        position: leadNodePosition,
        data: { label },
      })
      : (newLeadNode = {
        id: `${leadId}`,
        type: 'leadNode',
        position: { x: 122, y: 50 },
        data: { label },
      });
    setNodes((prevNodes) => [newLeadNode, ...prevNodes]);
    setLeadId(leadId - 1);

    const newEdge: Edge = {
      id: `f-(${leadId})`,
      source: `${leadId}`,
      target: '1',
      type: 'straight'
    };
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  const removeLeads = (nodeId: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id != nodeId));
  };

  return (
    <NodeContext.Provider value={{ nodes, edges, addNode, removeNode, addLeads, removeLeads }}>
      {children}
    </NodeContext.Provider>
  );
};
