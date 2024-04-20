import { ADD_NODE, UPDATE_NODE_LABEL, DELETE_NODE } from './types';

export const addNode = (node) => ({
  type: ADD_NODE,
  payload: node,
});

export const updateNodeLabel = (nodeId, label) => ({
  type: UPDATE_NODE_LABEL,
  payload: { nodeId, label },
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  payload: nodeId,
});
