import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from 'three';
import { planetData } from "../data/solarSystem";
// import { Howl } from "howler"; // Howler removed
// Celestial Body Component
const CelestialBody = ({
    position,
    size,
    color,
    speed,
    onClick,
    isSelected,
    name,
    isPaused
}: {
    position: [number, number, number];
    size: number;
    color: string;
    speed: number;
    onClick: () => void;
    isSelected: boolean;
    name: string;
    isPaused: boolean;
}) => {
    const meshRef = useRef<any>(null);
    // Random start angle so planets aren't all aligned
    const angleRef = useRef(Math.random() * Math.PI * 2);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;

            if (speed > 0) {
                // If not paused, advance the angle
                if (!isPaused) {
                    angleRef.current += delta * speed * 0.2; // Slower, more majestic speed
                }

                const radius = position[0];
                const x = Math.sin(angleRef.current) * radius;
                const z = Math.cos(angleRef.current) * radius;

                meshRef.current.position.x = x;
                meshRef.current.position.z = z;
            }
        }
    });

    return (
        <group>
            <mesh
                ref={meshRef}
                name={name} // Important for CameraController to find this object
                onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={isSelected ? color : undefined}
                    emissiveIntensity={isSelected ? 0.5 : 0}
                />
                {/* Label */}
                <Html distanceFactor={15}>
                    <div className="pointer-events-none text-xs text-white font-mono bg-black/50 px-1 rounded transform -translate-y-8 text-center hidden group-hover:block">
                        {name}
                    </div>
                </Html>
            </mesh>
        </group>
    );
};

// Camera Controller Component
const CameraController = ({ selectedPlanet, controlsRef }: { selectedPlanet: any, controlsRef: any }) => {
    const { camera, scene } = useThree();

    useFrame(() => {
        if (selectedPlanet) {
            // Find the actual planet mesh in the scene to get its real-time position
            // This works regardless of how the planet moves (physics, math, paused, etc)
            const planetMesh = scene.getObjectByName(selectedPlanet.name);

            if (planetMesh) {
                const targetPos = new THREE.Vector3();
                planetMesh.getWorldPosition(targetPos);

                // Planet size logic for offset
                const planetInfo = planetData.find(p => p.name === selectedPlanet.name);
                const size = planetInfo ? planetInfo.size : 1;

                // Calculate desired camera position
                // Offset depends on planet size to avoid clipping
                const offsetDistance = size * 4 + 5;
                const cameraOffset = new THREE.Vector3(0, offsetDistance * 0.4, offsetDistance);
                const cameraPos = targetPos.clone().add(cameraOffset);

                // Smoothly interpolate camera position
                camera.position.lerp(cameraPos, 0.05);

                // Smoothly update controls target to look at the planet
                if (controlsRef.current) {
                    controlsRef.current.target.lerp(targetPos, 0.05);
                    controlsRef.current.update();
                }
            }
        }
    });

    return null;
};

// Main Scene
export const SolarSystem = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
    const controlsRef = useRef<any>(null);
    // const soundRef = useRef<Howl | null>(null);

    // Stop sound when unmounting
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const handlePlanetClick = (planet: any) => {
        if (selectedPlanet?.name === planet.name) return;

        setSelectedPlanet(planet);

        // Play Sound (Text to Speech)
        window.speechSynthesis.cancel(); // Stop previous speech

        const text = `${planet.name}. ${planet.description}. ${planet.fact}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID'; // Set language to Indonesian
        utterance.rate = 0.9; // Slightly slower for better clarity

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="w-full h-screen bg-black relative flex flex-col">
            {/* Overlay UI */}
            <div className="absolute top-0 left-0 p-6 z-10 w-full flex justify-between items-start pointer-events-none">
                <div>
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg font-sans">
                        🌌 Jelajah Tata Surya
                    </h1>
                    <p className="text-blue-300 mt-2">Klik planet untuk melihat detail!</p>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    {/* Buttons removed as requested */}
                </div>
            </div>



            {/* 3D Canvas */}
            <div className="flex-1 cursor-crosshair">
                <Canvas camera={{ position: [0, 40, 50], fov: 60 }} onPointerMissed={() => setSelectedPlanet(null)}>
                    <color attach="background" args={["#000000"]} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" distance={100} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <OrbitControls
                        ref={controlsRef}
                        enableZoom={true}
                        enablePan={true}
                        maxDistance={100}
                        minDistance={2}
                    />

                    <CameraController selectedPlanet={selectedPlanet} controlsRef={controlsRef} />

                    {/* Render Planets */}
                    {planetData.map((planet, index) => (
                        <CelestialBody
                            key={index}
                            name={planet.name}
                            position={[planet.distance, 0, 0]}
                            size={planet.size}
                            color={planet.color}
                            speed={planet.speed}
                            isSelected={selectedPlanet?.name === planet.name}
                            onClick={() => handlePlanetClick(planet)}
                            isPaused={selectedPlanet !== null} // Pause all planets when one is selected
                        />
                    ))}

                    {/* Orbits visualization */}
                    {
                        planetData.map((planet, i) => (
                            planet.distance > 0 && (
                                <mesh key={`orbit-${i}`} rotation={[-Math.PI / 2, 0, 0]}>
                                    <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 64]} />
                                    <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={2} />
                                </mesh>
                            )
                        ))
                    }
                </Canvas >
            </div >

            {/* Info Panel (Bottom) */}
            {
                selectedPlanet && (
                    <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-gray-900/90 backdrop-blur-xl border border-gray-700 p-6 rounded-2xl text-white shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-3xl font-bold text-amber-400">{selectedPlanet.name}</h2>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedPlanet(null); }} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-4">{selectedPlanet.description}</p>
                        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 mb-4">
                            <span className="text-blue-300 font-bold mr-2">Tahukah kamu?</span>
                            <span className="text-gray-200">{selectedPlanet.fact}</span>
                        </div>

                    </div>
                )
            }
        </div >
    );
};
