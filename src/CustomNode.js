import React, { useState } from 'react';
import { Handle } from 'reactflow';
import './CustomNode.css';

import { useDispatch } from 'react-redux';
import { deleteNode } from './actions/nodeActions';

const CustomNode = ({ id, data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteNode = () => {
    dispatch(deleteNode(id));
  };

  return (
    <div 
      className="custom-node" 
      style={{ 
        padding: '10px', 
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        background: '#f9f9f9' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div 
          onClick={handleDeleteNode} 
          className="close-icon" 
          style={{
            width: '15px',
            height: '15px',
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            zIndex: 10,
          }}
        >
          <p style={{ fontSize: '10px' }}>x</p>
        </div>
      )}
      {data.label}
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );
};

export default CustomNode;
