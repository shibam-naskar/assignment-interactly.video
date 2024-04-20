import { ADD_NODE, UPDATE_NODE_LABEL, DELETE_NODE } from '../actions/types';

const initialState = {
  nodes: [],
  edges: [],
};

const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.payload],
      };
    case UPDATE_NODE_LABEL:
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.nodeId
            ? { ...node, data: { ...node.data, label: action.payload.label } }
            : node
        ),
      };
    case DELETE_NODE:
      return {
        ...state,
        nodes: state.nodes?.filter((node) => node.id !== action.payload) ?? [],
        edges: state.edges?.filter(
          (edge) => edge.source !== action.payload && edge.target !== action.payload
        ) ?? [],
      };
    default:
      return state;
  }
};

export default nodeReducer;