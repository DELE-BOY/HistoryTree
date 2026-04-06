import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import './Globe.css';

// African countries with their coordinates
const countries = [
  { name: 'Algeria',          coordinates: [1.65963,   28.03389], code: 'DZ' },
  { name: 'Angola',           coordinates: [17.87389, -11.20269], code: 'AO' },
  { name: 'Benin',            coordinates: [2.31583,    9.30769], code: 'BJ' },
  { name: 'Botswana',         coordinates: [24.68487, -22.32847], code: 'BW' },
  { name: 'Burkina Faso',     coordinates: [-1.56159,  12.23833], code: 'BF' },
  { name: 'Burundi',          coordinates: [29.91889,  -3.37306], code: 'BI' },
  { name: 'Cameroon',         coordinates: [12.35472,   7.36972], code: 'CM' },
  { name: 'Cape Verde',       coordinates: [-24.01319, 16.00208], code: 'CV' },
  { name: 'Central African Republic', coordinates: [20.93944, 6.61111], code: 'CF' },
  { name: 'Chad',             coordinates: [18.73221,  15.45417], code: 'TD' },
  { name: 'Comoros',          coordinates: [43.87222, -11.64553], code: 'KM' },
  { name: 'Congo (Brazzaville)', coordinates: [15.82766, -0.22802], code: 'CG' },
  { name: 'Congo (Kinshasa)',    coordinates: [21.75870, -4.03833], code: 'CD' },
  { name: 'Djibouti',         coordinates: [42.59028,  11.82514], code: 'DJ' },
  { name: 'Egypt',            coordinates: [30.80250,  26.82055], code: 'EG' },
  { name: 'Equatorial Guinea',coordinates: [10.26789,   1.65080], code: 'GQ' },
  { name: 'Eritrea',          coordinates: [39.78233,  15.17939], code: 'ER' },
  { name: 'Eswatini',         coordinates: [31.46587, -26.52250], code: 'SZ' },
  { name: 'Ethiopia',         coordinates: [40.48967,   9.14500], code: 'ET' },
  { name: 'Gabon',            coordinates: [11.60944,  -0.80369], code: 'GA' },
  { name: 'Gambia',           coordinates: [-15.31014,  13.44318], code: 'GM' },
  { name: 'Ghana',            coordinates: [-1.02319,   7.94653], code: 'GH' },
  { name: 'Guinea',           coordinates: [-9.69664,   9.94559], code: 'GN' },
  { name: 'Guinea-Bissau',    coordinates: [-15.18041,  11.80375], code: 'GW' },
  { name: 'Ivory Coast',      coordinates: [-5.54708,   7.54005], code: 'CI' },
  { name: 'Kenya',            coordinates: [37.90619,  -0.02356], code: 'KE' },
  { name: 'Lesotho',          coordinates: [28.23361, -29.60999], code: 'LS' },
  { name: 'Liberia',          coordinates: [-9.42950,   6.42806], code: 'LR' },
  { name: 'Libya',            coordinates: [17.22833,  26.33510], code: 'LY' },
  { name: 'Madagascar',       coordinates: [46.86911, -18.76695], code: 'MG' },
  { name: 'Malawi',           coordinates: [34.30153, -13.25431], code: 'MW' },
  { name: 'Mali',             coordinates: [-3.99616,  17.57069], code: 'ML' },
  { name: 'Mauritania',       coordinates: [-10.94083, 21.00789], code: 'MR' },
  { name: 'Mauritius',        coordinates: [57.55215, -20.34840], code: 'MU' },
  { name: 'Morocco',          coordinates: [-7.09262,  31.79170], code: 'MA' },
  { name: 'Mozambique',       coordinates: [35.52956, -18.66570], code: 'MZ' },
  { name: 'Namibia',          coordinates: [18.49041, -22.95764], code: 'NA' },
  { name: 'Niger',            coordinates: [8.08167,   17.60779], code: 'NE' },
  { name: 'Nigeria',          coordinates: [9.08200,    8.67530], code: 'NG' },
  { name: 'Rwanda',           coordinates: [29.87388,  -1.94028], code: 'RW' },
  { name: 'Senegal',          coordinates: [-14.45236,  14.49740], code: 'SN' },
  { name: 'Seychelles',       coordinates: [55.46068,  -4.67957], code: 'SC' },
  { name: 'Sierra Leone',     coordinates: [-11.77989,   8.46056], code: 'SL' },
  { name: 'Somalia',          coordinates: [46.19962,   5.15215], code: 'SO' },
  { name: 'South Africa',     coordinates: [22.93751, -30.55948], code: 'ZA' },
  { name: 'South Sudan',      coordinates: [31.30698,   6.87699], code: 'SS' },
  { name: 'Sudan',            coordinates: [30.21764,  12.86280], code: 'SD' },
  { name: 'Tanzania',         coordinates: [34.88882,  -6.36903], code: 'TZ' },
  { name: 'Togo',             coordinates: [0.82478,    8.61954], code: 'TG' },
  { name: 'Tunisia',          coordinates: [9.53750,   33.88692], code: 'TN' },
  { name: 'Uganda',           coordinates: [32.29027,   1.37333], code: 'UG' },
  { name: 'Zambia',           coordinates: [27.84933, -13.13390], code: 'ZM' },
  { name: 'Zimbabwe',         coordinates: [29.15486, -19.01544], code: 'ZW' }
];

// Optimized country marker with circular visual indicator
const CountryMarker = React.memo(({ position, name, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <group position={position}>
      {/* Circular marker */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onClick(name); }}
      >
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial 
          color={hovered ? '#FFD700' : '#FF6B35'} 
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Country name label - ALWAYS VISIBLE */}
      <Html position={[0, 0.15, 0]} center distanceFactor={8}>
        <div className="country-label-permanent" style={{
          color: hovered ? '#FFD700' : '#ffffff',
          fontSize: '9px',
          fontWeight: '500',
          textShadow: '0 0 3px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
});

// Continent outline data - simplified paths
const ContinentOutlines = () => {
  const createContinentFill = (coordinates, color) => {
    const shape = new THREE.Shape();
    coordinates.forEach(([long, lat], i) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (long + 180) * (Math.PI / 180);
      const radius = 5.01;
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    
    const geometry = new THREE.ShapeGeometry(shape);
    return (
      <mesh key={Math.random()} geometry={geometry}>
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    );
  };

  const createContinentLine = (coordinates, color, opacity, linewidth = 3) => {
    const points = coordinates.map(([long, lat]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (long + 180) * (Math.PI / 180);
      const radius = 5.03;
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    });
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return (
      <line key={Math.random()} geometry={geometry}>
        <lineBasicMaterial color={color} opacity={opacity} transparent linewidth={linewidth} />
      </line>
    );
  };

  // Detailed Africa outline
  const africaOutline = [
    [-17, 33], [-11, 35], [-6, 37], [3, 37], [10, 37], [16, 35], [25, 32], 
    [31, 31], [35, 30], [37, 27], [39, 22], [41, 16], [43, 12], [47, 11],
    [51, 10], [51, 2], [51, -5], [50, -10], [47, -15], [43, -18], [40, -25],
    [36, -28], [33, -32], [30, -34], [25, -34], [20, -34], [17, -30], 
    [15, -25], [13, -18], [11, -10], [9, -2], [7, 5], [3, 8], [-1, 11],
    [-5, 14], [-10, 18], [-15, 23], [-17, 28], [-17, 33]
  ];

  // African country borders
  const africanBorders = [
    [[25, 32], [25, 22]], [[10, 23], [16, 23]], [[-5, 15], [-5, 5]],
    [[9, 13], [9, 4]], [[25, 22], [35, 10]], [[35, 0], [40, -6]],
    [[22, -8], [22, -18]], [[20, -22], [32, -22]],
  ];

  // Other continents (simplified for gray fill)
  const northAmerica = [[-168, 65], [-141, 69], [-95, 69], [-75, 62], [-60, 52], [-80, 45], [-125, 50], [-125, 32], [-117, 32], [-110, 25], [-105, 20], [-97, 18], [-90, 15], [-88, 18], [-82, 25], [-80, 28], [-75, 35], [-70, 42], [-67, 45], [-60, 50], [-55, 55], [-65, 60], [-80, 62], [-95, 69]];
  const southAmerica = [[-81, 12], [-78, 1], [-75, -10], [-70, -18], [-65, -22], [-60, -30], [-58, -38], [-65, -40], [-68, -45], [-72, -53], [-68, -55], [-65, -52], [-60, -42], [-57, -35], [-52, -28], [-48, -18], [-45, -5], [-50, 2], [-58, 5], [-68, 10], [-75, 10], [-81, 12]];
  const europe = [[-10, 53], [-5, 58], [5, 58], [15, 55], [25, 54], [30, 60], [40, 68], [60, 70], [65, 68], [60, 60], [50, 55], [40, 52], [30, 48], [20, 45], [10, 43], [0, 43], [-5, 48], [-10, 53]];
  const asia = [[26, 70], [40, 72], [60, 72], [80, 70], [100, 65], [120, 55], [135, 45], [145, 50], [155, 60], [170, 65], [180, 65], [-170, 60], [-160, 55], [140, 35], [130, 25], [120, 20], [110, 10], [100, 8], [95, 18], [80, 25], [70, 30], [60, 35], [50, 38], [40, 42], [35, 45], [30, 50], [26, 70]];
  const australia = [[113, -10], [130, -11], [140, -15], [145, -20], [150, -28], [153, -35], [150, -38], [145, -38], [138, -35], [130, -32], [120, -30], [115, -22], [113, -15], [113, -10]];

  return (
    <group>
      {/* Other continents - gray filled meshes on the sphere */}
      {[northAmerica, southAmerica, europe, asia, australia].map((continent, i) => (
        <React.Fragment key={i}>
          {/* Gray fill */}
          {continent.map((coord, j) => {
            if (j === 0 || j === continent.length - 1) return null;
            const [long1, lat1] = continent[j - 1];
            const [long2, lat2] = coord;
            const [long3, lat3] = continent[j + 1] || continent[0];
            
            const toVec = ([lng, lt]) => {
              const phi = (90 - lt) * (Math.PI / 180);
              const theta = (lng + 180) * (Math.PI / 180);
              const r = 5.015;
              return new THREE.Vector3(
                -(r * Math.sin(phi) * Math.cos(theta)),
                r * Math.cos(phi),
                r * Math.sin(phi) * Math.sin(theta)
              );
            };
            
            const v1 = toVec([long1, lat1]);
            const v2 = toVec([long2, lat2]);
            const v3 = toVec([long3, lat3]);
            
            const geom = new THREE.BufferGeometry();
            geom.setAttribute('position', new THREE.Float32BufferAttribute([
              v1.x, v1.y, v1.z,
              v2.x, v2.y, v2.z,
              v3.x, v3.y, v3.z
            ], 3));
            
            return (
              <mesh key={`${i}-${j}`} geometry={geom}>
                <meshStandardMaterial color="#6b6b6b" side={THREE.DoubleSide} opacity={0.7} transparent />
              </mesh>
            );
          })}
          {/* Outline */}
          {createContinentLine(continent, '#888888', 0.6, 2)}
        </React.Fragment>
      ))}
      
      {/* Africa - bright green outline, very prominent */}
      {createContinentLine(africaOutline, '#2ecc71', 1.0, 4)}
      
      {/* African country borders - lighter green */}
      {africanBorders.map((border, i) => 
        createContinentLine(border, '#52b36a', 0.8, 2)
      )}
    </group>
  );
};

// Create Earth with visible continents
const EarthSphere = () => {
  return (
    <>
      {/* Ocean - solid blue sphere */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          color="#1a5f9e"
          roughness={0.7}
          metalness={0.1}
          opacity={1.0}  // Fully opaque
        />
      </mesh>
      
      {/* Continent outlines */}
      <ContinentOutlines />
    </>
  );
};

const ImprovedEarth = ({ onCountrySelect, lastInteractionTime }) => {
  const globeRef = useRef();

   const latLongToVector3 = (lat, long, radius = 5) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return [x, y, z];
  };

  // Memoize country markers to avoid recreating them
  const countryMarkers = useMemo(() => 
    countries.map(c => ({
      key: c.code,
      position: latLongToVector3(c.coordinates[1], c.coordinates[0], 5.15),
      name: c.name
    })),
    []
  );

  // Auto-rotation only after 2 minutes of inactivity
  useFrame((state, delta) => {
    if (globeRef.current) {
      const now = Date.now();
      const timeSinceInteraction = now - lastInteractionTime;
      const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds
      
      if (timeSinceInteraction > twoMinutes) {
        globeRef.current.rotation.y += 0.0008;
      }
    }
  });

  return (
    <group ref={globeRef}>
      <EarthSphere />
      
      {/* Country markers */}
      {countryMarkers.map(c => (
        <CountryMarker
          key={c.key}
          position={c.position}
          name={c.name}
          onClick={onCountrySelect}
        />
      ))}
    </group>
  );
};

const GlobeComponent = ({ onCountrySelect }) => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  
  // Update interaction time when user interacts
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