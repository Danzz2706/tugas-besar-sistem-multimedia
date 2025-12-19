import { Link } from 'react-router-dom'

export const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-6">About Page</h1>
            <p className="text-neutral-400 mb-8 max-w-lg text-center">
                This template is set up with React 18, Vite, Tailwind CSS v4, React Router v6, and Zustand.
            </p>
            <Link to="/" className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors">
                Back to Home
            </Link>
        </div>
    )
}
