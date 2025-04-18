import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import './Globe.css';

// Countries data - simplified for this example
const countries = [
  { name: 'Nigeria', coordinates: [9.082, 8.6753], color: '#00FF00' },
  { name: 'United States', coordinates: [-95.7129, 37.0902], color: '#FF0000' },
  { name: 'India', coordinates: [78.9629, 20.5937], color: '#FFA500' },
  { name: 'Brazil', coordinates: [-51.9253, -14.2350], color: '#FFFF00' },
  { name: 'China', coordinates: [104.1954, 35.8617], color: '#FF00FF' }
];

const GlobeMarker = ({ position, color, onClick, name }) => {
  return (
    <mesh position={position} onClick={(e) => { e.stopPropagation(); onClick(name); }}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const GlobeComponent = ({ onCountrySelect }) => {
  const globeRef = useRef();

  // Convert lat/long to 3D coordinates
  const latLongToVector3 = (lat, long) => {
    const radius = 5;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z];
  };

  // Handle country selection
  const handleCountryClick = (countryName) => {
    onCountrySelect(countryName);
  };

  return (
    <div className="globe-container">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Earth sphere */}
        <mesh ref={globeRef}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshStandardMaterial 
            color="#1E3F66" 
            metalness={0.1}
            roughness={0.7}
          />
        </mesh>
        
        {/* Country markers */}
        {countries.map((country) => (
          <GlobeMarker 
            key={country.name}
            position={latLongToVector3(country.coordinates[1], country.coordinates[0])}
            color={country.color}
            onClick={handleCountryClick}
            name={country.name}
          />
        ))}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={7}
          maxDistance={15}
        />
      </Canvas>
      <div className="instructions">
        Click on a country marker to explore its historical timeline
      </div>
    </div>
  );
};

export default GlobeComponent;