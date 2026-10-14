import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Barangay Services" />

            <div className="min-h-screen bg-gray-50 text-gray-900">

                <nav className="border-b border-gray-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                        <Link
                            href="/"
                            className="text-xl font-bold text-indigo-600"
                        >
                            Barangay Services
                        </Link>

                        <div className="flex items-center gap-6">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-sm font-semibold text-gray-700 transition hover:text-indigo-600"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-gray-700 transition hover:text-indigo-600"
                                    >
                                        Log In
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={route('staff.login')}
                                        className="text-sm font-semibold text-green-800 transition hover:text-green-950"
                                    >
                                        Staff sign in
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                </nav>

                <main>

                    <section className="border-b border-gray-200 bg-white">
                        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

                            <div className="max-w-3xl">

                                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                                    Community support
                                </p>

                                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                    Barangay Services
                                    <span className="block text-indigo-600">
                                        for Every Resident
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                                    Report neighborhood problems with a photo, follow their progress, and help your barangay respond where it matters.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">

                                    <Link
                                        href={
                                            auth?.user
                                                ? route('equipment-issues.create')
                                                : route('login')
                                        }
                                        className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                    >
                                        Report a Community Problem
                                    </Link>

                                    <Link
                                        href={
                                            auth?.user
                                                ? route('equipment-issues.index')
                                                : route('login')
                                        }
                                        className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Browse Issue Reports
                                    </Link>

                                </div>

                            </div>

                        </div>
                    </section>

                    <section className="py-16 sm:py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                            <div className="max-w-2xl">
                                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                                    Community support
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                    From resident report to local response
                                </h2>

                                <p className="mt-4 text-gray-600">
                                    Keep reports, locations, and photo evidence together so staff can coordinate a clear response.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-6 md:grid-cols-3">

                                <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                                        01
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                                        Describe the issue
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Choose a service category, add a location, and attach a photo of the concern.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                                        02
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                                        Follow community reports
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        See open and resolved issues in one shared register.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                                        03
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                                        Coordinate a response
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Barangay staff can review reports and mark completed work as resolved.
                                    </p>
                                </div>

                            </div>

                        </div>
                    </section>

                    <section className="border-y border-gray-200 bg-white">
                        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">

                            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                                Barangay Services
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                Better neighborhood reporting, in one place
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600">
                                A shared record of community concerns and the follow-up they receive.
                            </p>

                            <Link
                                href={
                                    auth?.user
                                        ? route('dashboard')
                                        : route('login')
                                }
                                className="mt-7 inline-flex rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Go to Support Desk
                            </Link>

                        </div>
                    </section>

                </main>

                <footer className="bg-gray-900">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

                        <div>
                            <p className="font-semibold text-white">
                                Barangay Services
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Community issue reporting
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            Resident and staff portal
                        </p>

                    </div>
                </footer>

            </div>
        </>
    );
}