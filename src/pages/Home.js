import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import CustomNode from '../CustomNode';
import '../App.css';
import { Provider } from 'react-redux';
import store from '../store';
import { addNode, updateNodeLabel } from '../actions/nodeActions';
import 'reactflow/dist/style.css';

const nodeTypes = {
  customNode: CustomNode
};

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [popup, setPopup] = useState({ isVisible: false, nodeId: null });
  
  

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentNodes = store.getState().nodes.nodes;
      setNodes(currentNodes);
    });

    return () => {
      unsubscribe();
    };
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event, node) => {
    
    setPopup({ isVisible: true, nodeId: node.id });
  }, []);

  

  const handleSetClick = () => {
    const clickedNodeIndex = store.getState().nodes.nodes.findIndex((node) => node.id === popup.nodeId);

    if (clickedNodeIndex !== -1) {
      store.dispatch(updateNodeLabel(popup.nodeId, document.getElementById('inputText').value));
    }

    setPopup({ isVisible: false, nodeId: null });
  };

  const handleAddNode = () => {
    var uid = uuidv4();
    const randomX = Math.random() * window.innerWidth * 0.6;
    const randomY = Math.random() * (window.innerHeight / 2);

    const rootNode = { id: `${uid}`, position: { x: randomX, y: randomY }, type: 'customNode', data: { label: 'node' } };
    const leafNode1 = { id: `${uid}1`, position: { x: randomX - 100, y: randomY + 100 }, type: 'customNode', data: { label: 'node' } };
    const leafNode2 = { id: `${uid}2`, position: { x: randomX + 100, y: randomY + 100 }, type: 'customNode', data: { label: 'node' } };

    const edge1 = { id: `${uid}-1`, source: `${uid}`, target: `${uid}1` };
    const edge2 = { id: `${uid}-2`, source: `${uid}`, target: `${uid}2` };

    store.dispatch(addNode(rootNode));
    store.dispatch(addNode(leafNode1));
    store.dispatch(addNode(leafNode2));
    setEdges((prevEdges) => [...prevEdges, edge1, edge2]);
  };

  return (
    <Provider store={store}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <button style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 999 }} class="button" onClick={handleAddNode}>
          Create node
        </button>
        {popup.isVisible && (
          <form style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999 }} className="text-form">
            <button onClick={() => setPopup({ isVisible: false, nodeId: null })} className="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <div className="form-input-material">
              <input id="inputText" type="text" placeholder="Enter text" className="form-control-material" />
            </div>
            <button onClick={handleSetClick} className="btn btn-primary btn-ghost">Set Text</button>
          </form>
        )}

        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        >
          <Background />
        </ReactFlow>
      </div>
    </Provider>
  );
}
