import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import './Globe.css';

// Countries data
const countries = [
  { name: 'Nigeria',            coordinates: [  9.082,   8.6753], code: 'NG' },
  { name: 'United States',      coordinates: [-95.7129, 37.0902], code: 'US' },
  { name: 'India',              coordinates: [ 78.9629, 20.5937], code: 'IN' },
  { name: 'Brazil',             coordinates: [-51.9253,-14.2350], code: 'BR' },
  { name: 'China',              coordinates: [104.1954, 35.8617], code: 'CN' },
  { name: 'Afghanistan',        coordinates: [ 67.70995, 33.93911], code: 'AF' },
  { name: 'Algeria',            coordinates: [  1.65963, 28.03389], code: 'DZ' },
  { name: 'Argentina',          coordinates: [-63.61667,-38.41610], code: 'AR' },
  { name: 'Australia',          coordinates: [133.77514,-25.27440], code: 'AU' },
  { name: 'Austria',            coordinates: [ 14.55007, 47.51623], code: 'AT' },
  { name: 'Bangladesh',         coordinates: [ 90.35633, 23.68499], code: 'BD' },
  { name: 'Belgium',            coordinates: [  4.46994, 50.50389], code: 'BE' },
  { name: 'Bolivia',            coordinates: [-63.58865,-16.29015], code: 'BO' },
  { name: 'Botswana',           coordinates: [ 24.68487,-22.32847], code: 'BW' },
  { name: 'Bulgaria',           coordinates: [ 25.48583, 42.73388], code: 'BG' },
  { name: 'Cambodia',           coordinates: [104.99096, 12.56568], code: 'KH' },
  { name: 'Cameroon',           coordinates: [ 12.35472,  7.36972], code: 'CM' },
  { name: 'Canada',             coordinates: [-106.34677,56.13037], code: 'CA' },
  { name: 'Chile',              coordinates: [-71.54297,-35.67515], code: 'CL' },
  { name: 'Colombia',           coordinates: [-74.29733,  4.57087], code: 'CO' },
  { name: 'Costa Rica',         coordinates: [-83.75343,  9.74892], code: 'CR' },
  { name: 'Croatia',            coordinates: [ 15.20000, 45.10000], code: 'HR' },
  { name: 'Cuba',               coordinates: [-77.78117, 21.52176], code: 'CU' },
  { name: 'Czech Republic',     coordinates: [ 15.47296, 49.81749], code: 'CZ' },
  { name: 'Denmark',            coordinates: [  9.50179, 56.26392], code: 'DK' },
  { name: 'Dominican Republic', coordinates: [-70.16265, 18.73569], code: 'DO' },
  { name: 'Ecuador',            coordinates: [-78.18341, -1.83124], code: 'EC' },
  { name: 'Egypt',              coordinates: [ 30.80250, 26.82055], code: 'EG' },
  { name: 'El Salvador',        coordinates: [-88.89653, 13.79419], code: 'SV' },
  { name: 'Ethiopia',           coordinates: [ 40.48967,  9.14500], code: 'ET' },
  { name: 'Finland',            coordinates: [ 25.74815, 61.92411], code: 'FI' },
  { name: 'France',             coordinates: [  2.21375, 46.22764], code: 'FR' },
  { name: 'Germany',            coordinates: [ 10.45153, 51.16569], code: 'DE' },
  { name: 'Ghana',              coordinates: [ -1.02319,  7.94653], code: 'GH' },
  { name: 'Greece',             coordinates: [ 21.82431, 39.07421], code: 'GR' },
  { name: 'Guatemala',          coordinates: [-90.23076, 15.78347], code: 'GT' },
  { name: 'Haiti',              coordinates: [-72.28522, 18.97119], code: 'HT' },
  { name: 'Honduras',           coordinates: [-86.24190, 15.20000], code: 'HN' },
  { name: 'Hungary',            coordinates: [ 19.50330, 47.16249], code: 'HU' },
  { name: 'Iceland',            coordinates: [-19.02084, 64.96305], code: 'IS' },
  { name: 'Indonesia',          coordinates: [113.92133, -0.78928], code: 'ID' },
  { name: 'Iran',               coordinates: [ 53.68805, 32.42791], code: 'IR' },
  { name: 'Iraq',               coordinates: [ 43.67929, 33.22319], code: 'IQ' },
  { name: 'Ireland',            coordinates: [ -8.24389, 53.41291], code: 'IE' },
  { name: 'Israel',             coordinates: [ 34.85161, 31.04605], code: 'IL' },
  { name: 'Italy',              coordinates: [ 12.56738, 41.87194], code: 'IT' },
  { name: 'Japan',              coordinates: [138.25292, 36.20482], code: 'JP' },
  { name: 'Kenya',              coordinates: [ 37.90619, -0.02356], code: 'KE' },
  { name: 'South Korea',        coordinates: [127.76692, 35.90776], code: 'KR' },
  { name: 'Kuwait',             coordinates: [ 47.48177, 29.31166], code: 'KW' },
  { name: 'Malaysia',           coordinates: [101.97577,  4.21048], code: 'MY' },
  { name: 'Mexico',             coordinates: [-102.55278,23.63450], code: 'MX' },
  { name: 'Morocco',            coordinates: [ -7.09262, 31.79170], code: 'MA' },
  { name: 'Mozambique',         coordinates: [ 35.52956,-18.66570], code: 'MZ' },
  { name: 'Myanmar',            coordinates: [ 95.95622, 21.91397], code: 'MM' },
  { name: 'Nepal',              coordinates: [ 84.12401, 28.39486], code: 'NP' },
  { name: 'Netherlands',        coordinates: [  5.29127, 52.13263], code: 'NL' },
  { name: 'New Zealand',        coordinates: [174.88597,-40.90056], code: 'NZ' },
  { name: 'Nicaragua',          coordinates: [-85.20723, 12.86542], code: 'NI' },
  { name: 'Norway',             coordinates: [  8.46895, 60.47202], code: 'NO' },
  { name: 'Oman',               coordinates: [ 55.92326, 21.51258], code: 'OM' },
  { name: 'Pakistan',           coordinates: [ 69.34512, 30.37532], code: 'PK' },
  { name: 'Panama',             coordinates: [-80.78213,  8.53798], code: 'PA' },
  { name: 'Paraguay',           coordinates: [-58.44383,-23.44250], code: 'PY' },
  { name: 'Peru',               coordinates: [-75.01515, -9.18997], code: 'PE' },
  { name: 'Philippines',        coordinates: [121.77402, 12.87972], code: 'PH' },
  { name: 'Poland',             coordinates: [ 19.14514, 51.91944], code: 'PL' },
  { name: 'Portugal',           coordinates: [ -8.22445, 39.39987], code: 'PT' },
  { name: 'Qatar',              coordinates: [ 51.18388, 25.35483], code: 'QA' },
  { name: 'Romania',            coordinates: [ 24.96676, 45.94316], code: 'RO' }
];

// Country marker component (unchanged)
const CountryMarker = ({ position, code, name, onClick }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.3, 0.3, 0.1]} />
      <meshStandardMaterial color="#1a365d" />
    </mesh>
    <Html position={[0, 0, 0.05]} center distanceFactor={15}>
      <div className="country-marker" onClick={(e) => { e.stopPropagation(); onClick(name); }}>
        <div className="country-code">{code}</div>
        <div className="country-name">{name}</div>
      </div>
    </Html>
  </group>
);

// Globe with unified ref for rotation
const ImprovedEarth = ({ onCountrySelect }) => {
  // Single ref for the entire globe (oceans, continents, clouds, markers)
  const globeRef = useRef();
  const cloudsRef = useRef();

  // lat/long to 3D
  const latLongToVector3 = (lat, long, radius = 5) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return [x, y, z];
  };

  // Rotation effect on globeRef and cloudsRef
  useEffect(() => {
    const id = setInterval(() => {
      if (globeRef.current) globeRef.current.rotation.y += 0.001;
      if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0012;
    }, 10);
    return () => clearInterval(id);
  }, []);

  return (
    <group ref={globeRef}>
      {/* Ocean sphere */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshPhongMaterial
          color="#1E90FF"
          shininess={60}
          specular={new THREE.Color('#FFFFFF')}
          opacity={0.9}
          transparent
        />
      </mesh>

      {/* Continents (segmented spheres) */}
      <mesh>
        <sphereGeometry args={[5.05, 32, 32, Math.PI * 1.25, Math.PI * 0.4, Math.PI * 0.2, Math.PI * 0.4]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.8} />
      </mesh>
      {/* Repeat for other continents similarly... */}

      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[5.1, 32, 32]} />
        <meshPhongMaterial
          color="#FFFFFF"
          opacity={0.3}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Country markers */}
      {countries.map((c) => (
        <CountryMarker
          key={c.code}
          position={latLongToVector3(c.coordinates[1], c.coordinates[0], 5.06)}
          code={c.code}
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
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

      <ImprovedEarth onCountrySelect={onCountrySelect} />

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={7}
        maxDistance={15}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </Canvas>
    <div className="instructions">Click on a country flag to explore its historical timeline</div>
  </div>
);

export default GlobeComponent;
