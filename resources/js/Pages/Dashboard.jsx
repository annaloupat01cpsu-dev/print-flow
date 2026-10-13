import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ issues }) {
    const openIssues = issues.filter(
        (issue) => issue.status === 'Open'
    ).length;

    const highSeverity = issues.filter(
        (issue) =>
            issue.severity === 'High' &&
            issue.status === 'Open'
    ).length;

    const resolvedIssues = issues.filter(
        (issue) => issue.status === 'Resolved'
    ).length;

    const totalIssues = issues.length;

    const recentIssues = issues.slice(0, 5);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        IT Support Desk
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Computer Lab Diagnostics
                            </p>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                Equipment Issue Dashboard
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                                Monitor reported laboratory equipment problems
                                and track their resolution status.
                            </p>
                        </div>

                        <Link
                            href={route('equipment-issues.create')}
                            className="inline-flex w-fit items-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Report Equipment Issue
                        </Link>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Issues
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                {totalIssues}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                All reported equipment issues
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Open Tickets
                            </p>

                            <p className="mt-3 text-3xl font-bold text-blue-600">
                                {openIssues}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                Issues requiring attention
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                High Severity
                            </p>

                            <p className="mt-3 text-3xl font-bold text-red-600">
                                {highSeverity}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                High-priority open issues
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Resolved
                            </p>

                            <p className="mt-3 text-3xl font-bold text-green-600">
                                {resolvedIssues}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                                Completed issue reports
                            </p>
                        </div>

                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        <div className="flex flex-col gap-3 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Recent Equipment Issues
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    The latest reported laboratory equipment problems.
                                </p>
                            </div>

                            <Link
                                href={route('equipment-issues.index')}
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                            >
                                View All Issues
                            </Link>
                        </div>

                        {recentIssues.length === 0 ? (
                            <div className="p-12 text-center">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    No issues reported
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    There are currently no equipment issue reports.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">

                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50 text-left">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Laboratory
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Equipment
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Reported By
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Severity
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentIssues.map((issue) => (
                                            <tr
                                                key={issue.id}
                                                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {issue.lab_number}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {issue.equipment_type}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {issue.reported_by}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                            issue.severity === 'High'
                                                                ? 'bg-red-100 text-red-700'
                                                                : issue.severity === 'Medium'
                                                                    ? 'bg-orange-100 text-orange-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        {issue.severity}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                            issue.status === 'Resolved'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                        }`}
                                                    >
                                                        {issue.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}