import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">

            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    <Link
                        href="/"
                        className="text-xl font-bold text-indigo-600"
                    >
                        IT Support Desk
                    </Link>

                    <Link
                        href="/"
                        className="text-sm font-semibold text-gray-700 transition hover:text-indigo-600"
                    >
                        Back to Home
                    </Link>

                </div>
            </nav>

            <main>
                {children}
            </main>

        </div>
    );
}