import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import './Globe.css';

// Utility: convert 2-letter country code to emoji flag
function countryCodeToEmoji(code) {
  return code
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

// Only African countries data
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

// CountryMarker: shows emoji flag
const CountryMarker = ({ position, flag, name, onClick }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.4, 0.4, 0.1]} />
      <meshStandardMaterial color="#1a365d" />
    </mesh>
    <Html position={[0, 0, 0.05]} center distanceFactor={15}>
      <div className="country-marker" onClick={e => { e.stopPropagation(); onClick(name); }}>
        <div className="country-flag">{flag}</div>
        <div className="country-name">{name}</div>
      </div>
    </Html>
  </group>
);

const ImprovedEarth = ({ onCountrySelect }) => {
  const globeRef = useRef();

  const latLongToVector3 = (lat, long, radius = 5) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return [x, y, z];
  };

  useFrame(() => {
    if (globeRef.current) globeRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={globeRef}>
      {/* Ocean */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshPhongMaterial
          color="#1E90FF"
          shininess={60}
          specular={new THREE.Color('#FFFFFF')}      
        />
      </mesh>

      {/* Continents */}
      <mesh>
        <sphereGeometry args={[5.05, 32, 32]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.8} />
      </mesh>

      {/* Country markers */}
      {countries.map(c => (
        <CountryMarker
          key={c.code}
          position={latLongToVector3(c.coordinates[1], c.coordinates[0], 5.06)}
          flag={countryCodeToEmoji(c.code)}
          name={c.name}
          onClick={onCountrySelect}
        />
      ))}
    </group>
  );
};

const GlobeComponent = ({ onCountrySelect }) => (
  <div className="globe-container">
    <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ alpha: false }} style={{ background: '#000033' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <OrbitControls enableZoom enablePan={false} minDistance={7} maxDistance={15} />
      <ImprovedEarth onCountrySelect={onCountrySelect} />
    </Canvas>
    <div className="instructions">Click on a country flag to explore its historical timeline</div>
  </div>
);

export default GlobeComponent;
