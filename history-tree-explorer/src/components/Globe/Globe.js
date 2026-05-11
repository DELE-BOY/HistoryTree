import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import './Globe.css';

// Load and convert world data from TopoJSON to GeoJSON
const worldFeatures = feature(worldData, worldData.objects.countries);

// Convert longitude/latitude to 3D sphere vector
const latLngToVector3 = (lon, lat, radius = 5) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};

const AFRICAN_COUNTRY_NAMES = {
  'DZ': 'Algeria', 'AO': 'Angola', 'BJ': 'Benin', 'BW': 'Botswana', 'BF': 'Burkina Faso', 'BI': 'Burundi',
  'CM': 'Cameroon', 'CV': 'Cape Verde', 'CF': 'Central African Republic', 'TD': 'Chad', 'KM': 'Comoros', 'CG': 'Congo',
  'CD': 'Congo (Kinshasa)', 'DJ': 'Djibouti', 'EG': 'Egypt', 'GQ': 'Equatorial Guinea', 'ER': 'Eritrea', 'SZ': 'Eswatini',
  'ET': 'Ethiopia', 'GA': 'Gabon', 'GM': 'Gambia', 'GH': 'Ghana', 'GN': 'Guinea', 'GW': 'Guinea-Bissau',
  'CI': 'Ivory Coast', 'KE': 'Kenya', 'LS': 'Lesotho', 'LR': 'Liberia', 'LY': 'Libya', 'MG': 'Madagascar',
  'MW': 'Malawi', 'ML': 'Mali', 'MR': 'Mauritania', 'MU': 'Mauritius', 'MA': 'Morocco', 'MZ': 'Mozambique',
  'NA': 'Namibia', 'NE': 'Niger', 'NG': 'Nigeria', 'RW': 'Rwanda', 'SN': 'Senegal', 'SC': 'Seychelles',
  'SL': 'Sierra Leone', 'SO': 'Somalia', 'ZA': 'South Africa', 'SS': 'South Sudan', 'SD': 'Sudan', 'TZ': 'Tanzania',
  'TG': 'Togo', 'TN': 'Tunisia', 'UG': 'Uganda', 'ZM': 'Zambia', 'ZW': 'Zimbabwe'
};

const countries = [
  { name: 'Nigeria', coordinates: [9.08200, 8.67530], code: 'NG' },
  { name: 'Kenya', coordinates: [37.90619, -0.02356], code: 'KE' },
  { name: 'South Africa', coordinates: [22.93751, -30.55948], code: 'ZA' },
  { name: 'Egypt', coordinates: [30.80250, 26.82055], code: 'EG' },
  { name: 'Ethiopia', coordinates: [40.48967, 9.14500], code: 'ET' },
  // ... (truncated for brevity - would include all countries)
];

// Pre-compute borders ONCE at module level (outside component)
const borderGeometries = worldFeatures.features.flatMap((feature, i) => {
  const { geometry } = feature;
  const polygons = geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates];
  
  return polygons.flatMap((polygon, j) => {
    const points = polygon[0].map(([lon, lat]) => latLngToVector3(lon, lat, 5.02));
    if (points.length < 2) return [];
    
    const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
    return [{ key: `border-${i}-${j}`, geometry: geometryLine }];
  });
});

// Country borders component
const CountryBorders = React.memo(() => (
  <group>
    {borderGeometries.map(({ key, geometry }) => (
      <line key={key} geometry={geometry}>
        <lineBasicMaterial color="#2ecc71" opacity={0.7} transparent />
      </line>
    ))}
  </group>
));

// Ocean labels component
const OceanLabels = React.memo(() => {
  const oceans = [
    { name: 'Atlantic Ocean', lon: -30, lat: 20 },
    { name: 'Pacific Ocean', lon: 150, lat: 10 },
    { name: 'Indian Ocean', lon: 80, lat: -20 }
  ];

  return (
    <group>
      {oceans.map((ocean) => {
        const position = latLngToVector3(ocean.lon, ocean.lat, 5.1);
        return (
          <Html key={ocean.name} position={[position.x, position.y, position.z]} center distanceFactor={12}>
            <div style={{
              color: '#87CEEB',
              fontSize: '12px',
              fontWeight: '400',
              fontStyle: 'italic',
              textShadow: '0 0 4px rgba(0,0,0,0.6)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              opacity: 0.7
            }}>
              {ocean.name}
            </div>
          </Html>
        );
      })}
    </group>
  );
});

// Country marker component
const CountryMarker = React.memo(({ position, name, code, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onClick(name); }}
        scale={hovered ? 1.4 : 1}
      >
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial 
          color={hovered ? '#FFD700' : '#FF6B35'} 
          transparent
          opacity={0.95}
        />
      </mesh>

      <Html position={[0, 0.12, 0]} center distanceFactor={10}>
        <div style={{
          color: '#ffffff',
          fontSize: '8px',
          fontWeight: '600',
          textShadow: '0 0 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          {code}
        </div>
      </Html>

      <Html position={[0, 0.25, 0]} center distanceFactor={8}>
        <div style={{
          color: '#FFD700',
          fontSize: '10px',
          fontWeight: '500',
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 6px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none'
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
});

// Earth sphere component - SIMPLIFIED
const EarthSphere = React.memo(() => (
  <>
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial 
        color="#1a5f9e"
        roughness={0.7}
        metalness={0.1}
        opacity={1.0}
      />
    </mesh>
    
    <CountryBorders />
    <OceanLabels />
  </>
));

// Main globe component
const ImprovedEarth = ({ onCountrySelect, lastInteractionTime }) => {
  const globeRef = useRef();

  const countryMarkers = useMemo(() => 
    countries.map(c => {
      const [lon, lat] = c.coordinates;
      const vec = latLngToVector3(lon, lat, 5.05);
      return {
        key: c.code,
        position: [vec.x, vec.y, vec.z],
        name: c.name,
        code: c.code
      };
    }),
    []
  );

  useFrame((state, delta) => {
    if (globeRef.current) {
      const now = Date.now();
      const timeSinceInteraction = now - lastInteractionTime;
      const twoMinutes = 2 * 60 * 1000;
      
      if (timeSinceInteraction > twoMinutes) {
        globeRef.current.rotation.y += 0.0008;
      }
    }
  });

  return (
    <group ref={globeRef}>
      <EarthSphere />
      
      {countryMarkers.map(c => (
        <CountryMarker
          key={c.key}
          position={c.position}
          name={c.name}
          code={c.code}
          onClick={onCountrySelect}
        />
      ))}
    </group>
  );
};

const GlobeComponent = ({ onCountrySelect }) => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  
  const handleInteraction = () => {
    setLastInteractionTime(Date.now());
  };
  
  return (
    <div 
      className="globe-container"
      onMouseDown={handleInteraction}
      onWheel={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 45 }} 
        gl={{ 
          alpha: false, 
          antialias: true, 
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#b8d4f1" />
        <hemisphereLight skyColor="#87ceeb" groundColor="#1a3a52" intensity={0.3} />
        
        <OrbitControls 
          enableZoom 
          enablePan={false} 
          minDistance={7} 
          maxDistance={15} 
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          onChange={handleInteraction}
        />
        
        <ImprovedEarth 
          onCountrySelect={onCountrySelect}
          lastInteractionTime={lastInteractionTime}
        />
      </Canvas>
      
      <div className="instructions">
        Click on an orange marker to explore that country's historical timeline
      </div>
    </div>
  );
};

export default GlobeComponent;
