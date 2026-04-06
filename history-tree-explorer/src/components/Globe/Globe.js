import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import './Globe.css';

// Load and convert world data from TopoJSON to GeoJSON
const worldFeatures = feature(worldData, worldData.objects.countries);

// Helper function to extract coordinates from GeoJSON feature
const extractCoordinates = (geometry) => {
  if (!geometry || !geometry.coordinates) return [];
  
  const coords = [];
  const processRing = (ring) => {
    return ring.map(([lon, lat]) => [lon, lat]);
  };
  
  if (geometry.type === 'Polygon') {
    // Use only the outer ring (first ring), ignore holes
    return processRing(geometry.coordinates[0]);
  } else if (geometry.type === 'MultiPolygon') {
    // Return the largest polygon
    let largestRing = [];
    geometry.coordinates.forEach(polygon => {
      const ring = processRing(polygon[0]);
      if (ring.length > largestRing.length) {
        largestRing = ring;
      }
    });
    return largestRing;
  }
  return coords;
};

// Predefined regions extracted from world data
const getRegionFromFeatures = (featureFilter) => {
  const coordinates = [];
  worldFeatures.features.forEach((feat) => {
    if (featureFilter(feat)) {
      const coords = extractCoordinates(feat.geometry);
      if (coords.length > 0) {
        coordinates.push(...coords);
      }
    }
  });
  return coordinates;
};

// Convert longitude/latitude to 3D sphere vector
const latLngToVector3 = (lon, lat, radius = 5) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// African country codes (short form) - maps to full names for filtering
const AFRICAN_COUNTRY_CODES = ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'];

// Map codes to country names for filtering
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

// African countries with their coordinates for markers
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

// Draw country borders from GeoJSON
const CountryBorders = () => {
  return (
    <group>
      {worldFeatures.features.map((feature, i) => {
        const { geometry } = feature;

        const polygons =
          geometry.type === "MultiPolygon"
            ? geometry.coordinates
            : [geometry.coordinates];

        return polygons.map((polygon, j) => {
          const points = polygon[0].map(([lon, lat]) =>
            latLngToVector3(lon, lat, 5.02)
          );

          if (points.length < 2) return null;

          const curve = new THREE.CatmullRomCurve3(points, true);
          const smoothPoints = curve.getPoints(200);

          const geometryLine = new THREE.BufferGeometry().setFromPoints(smoothPoints);

          return (
            <line key={`border-${i}-${j}`} geometry={geometryLine}>
              <lineBasicMaterial color="#2ecc71" opacity={0.7} transparent />
            </line>
          );
        });
      })}
    </group>
  );
};

// Filled country meshes (optional but clean)
const CountryMeshes = () => {
  return (
    <group>
      {worldFeatures.features.map((feature, i) => {
        const { geometry } = feature;

        const polygons =
          geometry.type === "MultiPolygon"
            ? geometry.coordinates
            : [geometry.coordinates];

        return polygons.map((polygon, j) => {
          const shape = new THREE.Shape();

          polygon[0].forEach(([lon, lat], index) => {
            const v = latLngToVector3(lon, lat, 5.01);

            if (index === 0) shape.moveTo(v.x, v.y);
            else shape.lineTo(v.x, v.y);
          });

          const geometryShape = new THREE.ShapeGeometry(shape);

          return (
            <mesh key={`mesh-${i}-${j}`} geometry={geometryShape}>
              <meshStandardMaterial
                color="#333"
                opacity={0.5}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        });
      })}
    </group>
  );
};

// Optimized country marker with circular visual indicator
const CountryMarker = React.memo(({ position, name, code, onClick }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <group position={position}>
      {/* Orange dot */}
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

      {/* ALWAYS visible: country code */}
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

      {/* HOVER ONLY: full name */}
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

// Continent outline data - simplified paths
const ContinentOutlines = () => {
  const FILL_RADIUS = 5.01;
  const LINE_RADIUS = 5.02;

  const createFilledContinent = (coordinates, color, opacity = 0.7) => {
    // Calculate centroid on sphere surface
    const centroid = new THREE.Vector3();
    
    coordinates.forEach(([lon, lat]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      centroid.x += -(Math.sin(phi) * Math.cos(theta));
      centroid.y += Math.cos(phi);
      centroid.z += Math.sin(phi) * Math.sin(theta);
    });
    
    centroid.divideScalar(coordinates.length).normalize().multiplyScalar(FILL_RADIUS);
    
    // Create vertices for the filled shape on sphere surface
    const vertices = [];
    
    coordinates.forEach(([lon, lat], i) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(FILL_RADIUS * Math.sin(phi) * Math.cos(theta));
      const z = FILL_RADIUS * Math.sin(phi) * Math.sin(theta);
      const y = FILL_RADIUS * Math.cos(phi);
      
      if (i < coordinates.length - 1) {
        const [lon2, lat2] = coordinates[i + 1];
        const phi2 = (90 - lat2) * (Math.PI / 180);
        const theta2 = (lon2 + 180) * (Math.PI / 180);
        const x2 = -(FILL_RADIUS * Math.sin(phi2) * Math.cos(theta2));
        const z2 = FILL_RADIUS * Math.sin(phi2) * Math.sin(theta2);
        const y2 = FILL_RADIUS * Math.cos(phi2);
        
        // Create triangle fan from centroid
        vertices.push(centroid.x, centroid.y, centroid.z);
        vertices.push(x, y, z);
        vertices.push(x2, y2, z2);
      }
    });
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    return (
      <mesh key={Math.random()} geometry={geometry}>
        <meshStandardMaterial 
          color={color} 
          side={THREE.DoubleSide}
          opacity={opacity}
          transparent
        />
      </mesh>
    );
  };

  const createContinentLine = (coordinates, color, opacity, linewidth = 3) => {
    const points = coordinates.map(([lon, lat]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(LINE_RADIUS * Math.sin(phi) * Math.cos(theta));
      const z = LINE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const y = LINE_RADIUS * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    });
    
    // Smooth the line with Catmull-Rom curve
    const curve = new THREE.CatmullRomCurve3(points, true);
    const smoothPoints = curve.getPoints(Math.max(100, points.length * 5));
    
    const geometry = new THREE.BufferGeometry().setFromPoints(smoothPoints);
    return (
      <line key={Math.random()} geometry={geometry}>
        <lineBasicMaterial color={color} opacity={opacity} transparent linewidth={linewidth} />
      </line>
    );
  };

  // Detailed Africa outline from real world data
  const africaOutline = getRegionFromFeatures((feat) => {
    const country = feat.properties?.name || '';
    return AFRICAN_COUNTRY_CODES.some(code => country.includes(AFRICAN_COUNTRY_NAMES[code]));
  });

  // Get continental regions from world data
  const northAmerica = getRegionFromFeatures((feat) => {
    const country = feat.properties?.name || '';
    return ['United States', 'Canada', 'Mexico', 'Guatemala', 'Belize', 'Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama'].some(c => country.includes(c));
  });

  const southAmerica = getRegionFromFeatures((feat) => {
    const country = feat.properties?.name || '';
    return ['Colombia', 'Venezuela', 'Guyana', 'Suriname', 'French Guiana', 'Brazil', 'Peru', 'Ecuador', 
      'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay'].some(c => country.includes(c));
  });

  const europe = getRegionFromFeatures((feat) => {
    const country = feat.properties?.name || '';
    const europeanCountries = ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 
      'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 
      'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 
      'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 
      'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 
      'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom'];
    return europeanCountries.some(c => country.includes(c));
  });

  const asia = getRegionFromFeatures((feat) => {
    const country = feat.properties?.name || '';
    const asianCountries = ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 
      'Brunei', 'Cambodia', 'China', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 
      'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 
      'Macao', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'Oman', 'Pakistan', 'Philippines', 
      'Qatar', 'Saudi Arabia', 'Singapore', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 
      'Timor', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'West Bank', 'Yemen'];
    return asianCountries.some(c => country.includes(c));
  });

  const australia = getRegionFromFeatures((feat) => {
    const country = feat.properties?.name || '';
    return ['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 
      'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'].some(c => country.includes(c));
  });

  return (
    <group>
      {/* Gray filled continents */}
      {createFilledContinent(northAmerica, '#6b6b6b', 0.8)}
      {createFilledContinent(southAmerica, '#6b6b6b', 0.8)}
      {createFilledContinent(europe, '#6b6b6b', 0.8)}
      {createFilledContinent(asia, '#6b6b6b', 0.8)}
      {createFilledContinent(australia, '#6b6b6b', 0.8)}
      
      {/* Continent outlines */}
      {createContinentLine(northAmerica, '#888888', 0.8)}
      {createContinentLine(southAmerica, '#888888', 0.8)}
      {createContinentLine(europe, '#888888', 0.8)}
      {createContinentLine(asia, '#888888', 0.8)}
      {createContinentLine(australia, '#888888', 0.8)}
      
      {/* Africa - bright green outline, very prominent */}
      {createContinentLine(africaOutline, '#2ecc71', 1.0)}
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
      
      {/* Filled countries (subtle background) */}
      <CountryMeshes />
      
      {/* Country borders from real GeoJSON */}
      <CountryBorders />
      
      {/* Regional continent outlines */}
      <ContinentOutlines />
    </>
  );
};

const ImprovedEarth = ({ onCountrySelect, lastInteractionTime }) => {
  const globeRef = useRef();

  // Memoize country markers to avoid recreating them
 const countryMarkers = useMemo(() => 
  countries.map(c => {
    const [lon, lat] = c.coordinates;
    const vec = latLngToVector3(lon, lat, 5.05);
    return {
      key: c.code,
      position: [vec.x, vec.y, vec.z],
      name: c.name,
      code: c.code // 👈 ADD THIS
    };
  }),
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
        code={c.code} // 👈 ADD THIS
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