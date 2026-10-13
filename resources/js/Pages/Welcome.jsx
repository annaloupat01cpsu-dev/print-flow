import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="IT Support Desk" />

            <div className="min-h-screen bg-gray-50 text-gray-900">

                <nav className="border-b border-gray-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                        <Link
                            href="/"
                            className="text-xl font-bold text-indigo-600"
                        >
                            IT Support Desk
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
                                    Computer Lab Diagnostics
                                </p>

                                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                    Computer Lab Equipment
                                    <span className="block text-indigo-600">
                                        Issue Logger
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                                    Report damaged or malfunctioning laboratory
                                    equipment, monitor reported issues, and
                                    track their resolution through one
                                    centralized support desk.
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
                                        Report an Issue
                                    </Link>

                                    <Link
                                        href={
                                            auth?.user
                                                ? route('equipment-issues.index')
                                                : route('login')
                                        }
                                        className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        View Equipment Issues
                                    </Link>

                                </div>

                            </div>

                        </div>
                    </section>

                    <section className="py-16 sm:py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                            <div className="max-w-2xl">
                                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                                    Support Workflow
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                    Keep laboratory issues organized
                                </h2>

                                <p className="mt-4 text-gray-600">
                                    The system provides a simple way to record
                                    equipment problems and monitor their status
                                    from report to resolution.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-6 md:grid-cols-3">

                                <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                                        01
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                                        Report Equipment Issues
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Record the laboratory, equipment type,
                                        issue description, reporter, and
                                        severity of the problem.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                                        02
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                                        Track Open Tickets
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        View reported problems in one place and
                                        identify issues that still require
                                        attention.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                                        03
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                                        Monitor Resolution
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Update issue information and mark
                                        equipment problems as resolved when
                                        completed.
                                    </p>
                                </div>

                            </div>

                        </div>
                    </section>

                    <section className="border-y border-gray-200 bg-white">
                        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">

                            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                                IT Support Desk
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                Computer Lab Diagnostics & Fault Tracking
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600">
                                A centralized system for reporting,
                                monitoring, and managing laboratory equipment
                                issues.
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
                                IT Support Desk
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Computer Lab Diagnostics & Fault Tracking
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            Equipment Issue Logger
                        </p>

                    </div>
                </footer>

            </div>
        </>
    );
}