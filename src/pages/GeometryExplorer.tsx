import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import * as THREE from "three";
// import { Howl } from "howler"; // Howler removed

const Shape = ({ position, type, color, label, onClick, active }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    let geometry;
    switch (type) {
        case 'cube': geometry = <boxGeometry args={[1.5, 1.5, 1.5]} />; break;
        case 'sphere': geometry = <sphereGeometry args={[1, 32, 32]} />; break;
        case 'cone': geometry = <coneGeometry args={[1, 2, 32]} />; break;
        case 'cylinder': geometry = <cylinderGeometry args={[1, 1, 2, 32]} />; break;
        case 'torus': geometry = <torusGeometry args={[1, 0.4, 16, 100]} />; break;
        default: geometry = <boxGeometry args={[1, 1, 1]} />;
    }

    return (
        <group position={position} onClick={(e) => { e.stopPropagation(); onClick(); }}>
            <mesh ref={meshRef} scale={active ? 1.2 : 1}>
                {geometry}
                <meshStandardMaterial color={active ? "#ffeb3b" : color} roughness={0.3} metalness={0.1} />
            </mesh>
            <Text position={[0, -2, 0]} fontSize={0.3} color="white">
                {label}
            </Text>
        </group>
    );
};

export const GeometryExplorer = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'3d' | '2d'>('3d');
    const [activeShape, setActiveShape] = useState<any>(null);
    // const soundRef = useRef<Howl | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const shapes3D = [
        { id: 1, type: 'cube', position: [-4, 0, 0], color: "#ef4444", label: "Kubus", desc: "V = s x s x s", sound: "cube_sound_url" },
        { id: 2, type: 'sphere', position: [-2, 0, 0], color: "#3b82f6", label: "Bola", desc: "V = 4/3 x π x r³", sound: "sphere_sound_url" },
        { id: 3, type: 'cone', position: [0, 0, 0], color: "#10b981", label: "Kerucut", desc: "V = 1/3 x π x r² x t", sound: "cone_sound_url" },
        { id: 4, type: 'cylinder', position: [2, 0, 0], color: "#f59e0b", label: "Tabung", desc: "V = π x r² x t", sound: "cylinder_sound_url" },
        { id: 5, type: 'torus', position: [4, 0, 0], color: "#8b5cf6", label: "Donat", desc: "Bentuk Cincin", sound: "torus_sound_url" },
    ];

    const shapes2D = [
        { id: 11, type: 'cube', position: [-3, 0, 0], color: "#f43f5e", label: "Persegi", desc: "L = s x s", sound: "square_sound_url" }, // Reusing cube geometry but flattened/managed via type check if needed or new geometry
        { id: 12, type: 'cylinder', position: [-1, 0, 0], color: "#3b82f6", label: "Lingkaran", desc: "L = π x r²", sound: "circle_sound_url" }, // Using cylinder as circle proxy or specific geometry
        { id: 13, type: 'cone', position: [1, 0, 0], color: "#10b981", label: "Segitiga", desc: "L = 1/2 x a x t", sound: "triangle_sound_url" }, // Using cone as triangle proxy
        { id: 14, type: 'cube', position: [3, 0, 0], color: "#f59e0b", label: "Persegi Panjang", desc: "L = p x l", sound: "rectangle_sound_url" },
    ];

    const currentShapes = mode === '3d' ? shapes3D : shapes2D;

    // Cleanup sound on unmount
    // Cleanup sound on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const handleShapeClick = (shape: any) => {
        if (activeShape?.id === shape.id) {
            // Toggle sound if clicking same shape
            if (isPlaying) {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
            } else {
                const text = `${shape.label}. ${shape.desc}`;
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'id-ID';
                utterance.rate = 0.9;
                utterance.onend = () => setIsPlaying(false);
                window.speechSynthesis.speak(utterance);
                setIsPlaying(true);
            }
            return;
        }

        setActiveShape(shape);

        // Stop previous sound
        window.speechSynthesis.cancel();

        // Play new sound
        const text = `${shape.label}. ${shape.desc}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
    };

    return (
        <div className="h-screen w-full bg-slate-900 relative">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 p-6 z-10 w-full flex justify-between items-start pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="pointer-events-auto flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <div className="flex flex-col items-end gap-4 pointer-events-auto">
                    <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl text-white text-right max-w-sm">
                        <h1 className="text-2xl font-bold mb-1">Geometry Explorer</h1>
                        <p className="text-gray-300 text-sm">Klik bangun untuk belajar rumusnya!</p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="bg-slate-800/80 backdrop-blur-md p-1 rounded-lg flex border border-slate-700">
                        <button
                            onClick={() => { setMode('3d'); setActiveShape(null); }}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${mode === '3d' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Bangun Ruang (3D)
                        </button>
                        <button
                            onClick={() => { setMode('2d'); setActiveShape(null); }}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${mode === '2d' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Bangun Datar (2D)
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            {activeShape && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-20 w-80 text-center animate-in fade-in slide-in-from-bottom-4 pointer-events-auto">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeShape.label}</h2>
                        {isPlaying ? (
                            <Volume2 className="w-5 h-5 text-blue-500 animate-pulse" />
                        ) : (
                            <VolumeX className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-mono text-lg bg-slate-100 dark:bg-slate-700/50 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                        {activeShape.desc}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        {isPlaying ? "Sedang memutar penjelasan..." : "Klik lagi untuk memutar suara"}
                    </p>
                </div>
            )}

            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 2, 8], fov: 60 }} onPointerMissed={() => setActiveShape(null)}>
                <color attach="background" args={["#0f172a"]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <group position={[0, 0, 0]}>
                    {currentShapes.map((shape: any) => (
                        <Shape
                            key={shape.id}
                            {...shape}
                            active={activeShape?.id === shape.id}
                            onClick={() => handleShapeClick(shape)}
                        />
                    ))}
                </group>

                <OrbitControls enableZoom={true} enablePan={true} />
            </Canvas>
        </div>
    );
};
