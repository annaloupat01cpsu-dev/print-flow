import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#fbfaf8]">

            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    <Link
                        href="/"
                        className="text-xl font-extrabold tracking-tight text-slate-900"
                    >
                        printflow<span className="text-orange-600">.</span>
                    </Link>

                    <Link
                        href="/"
                        className="text-sm font-semibold text-slate-700 transition hover:text-orange-700"
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