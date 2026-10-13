import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ issues, flash }) {
    const [search, setSearch] = useState('');
    const [severityFilter, setSeverityFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredIssues = issues.filter((issue) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
            issue.lab_number.toLowerCase().includes(searchValue) ||
            issue.equipment_type.toLowerCase().includes(searchValue) ||
            issue.issue_description.toLowerCase().includes(searchValue) ||
            issue.reported_by.toLowerCase().includes(searchValue);

        const matchesSeverity =
            severityFilter === 'All' ||
            issue.severity === severityFilter;

        const matchesStatus =
            statusFilter === 'All' ||
            issue.status === statusFilter;

        return matchesSearch && matchesSeverity && matchesStatus;
    });

    const openIssues = issues.filter(
        (issue) => issue.status === 'Open'
    ).length;

    const highSeverity = issues.filter(
        (issue) => issue.severity === 'High' &&
        issue.status === 'Open'
    ).length;

    const resolvedIssues = issues.filter(
        (issue) => issue.status === 'Resolved'
    ).length;

    const deleteIssue = (id) => {
        if (confirm('Are you sure you want to delete this issue?')) {
            router.delete(route('equipment-issues.destroy', id));
        }
    };

    const resolveIssue = (id) => {
        if (confirm('Mark this issue as resolved?')) {
            router.patch(
                route('equipment-issue.resolve', id)
            );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        IT Support Desk
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        Equipment Issue Logger
                    </h2>
                </div>
            }
        >
            <Head title="Equipment Issues" />

            {flash?.success && (
                <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-meduim text-green-700">
                        {flash.success}
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Computer Lab Diagnostics
                            </p>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                Fault Tracking Desk
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                                Report, monitor, and manage damaged or malfunctioning laboratory equipment.
                            </p>
                        </div>

                        <Link
                            href={route('equipment-issues.create')}
                            className="inline-flex w-fit items-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Report Equipment Issue
                        </Link>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Open Tickets
                            </p>

                            <p className="mt-3 text-3xl font-bold text-gray-900">
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

                        <div className="border-b border-gray-200 p-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Reported Equipment Issues
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    View and manage laboratory equipment faults.
                                </p>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">

                                <div className="md:col-span-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Search
                                    </label>

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search issues..."
                                        className="mt-2 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Severity
                                    </label>

                                    <select
                                        value={severityFilter}
                                        onChange={(e) =>
                                            setSeverityFilter(e.target.value)
                                        }
                                        className="mt-2 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="All">
                                            All Severity
                                        </option>

                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Status
                                    </label>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="mt-2 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="All">
                                            All Status
                                        </option>

                                        <option value="Open">
                                            Open
                                        </option>

                                        <option value="Resolved">
                                            Resolved
                                        </option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        {filteredIssues.length === 0 ? (
                            <div className="p-12 text-center">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    No equipment issues found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    There are currently no reports matching your search or filters.
                                </p>

                                <Link
                                    href={route('equipment-issues.create')}
                                    className="mt-6 inline-flex rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    Report an Issue
                                </Link>
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
                                                Issue
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

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredIssues.map((issue) => (
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

                                                <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                                                    {issue.issue_description}
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

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">

                                                        {issue.status === 'Open' && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    resolveIssue(issue.id)
                                                                }
                                                                className="text-sm font-semibold text-green-600 hover:text-green-800"
                                                            >
                                                                Resolve
                                                            </button>
                                                        )}

                                                        <Link
                                                            href={route(
                                                                'equipment-issues.edit',
                                                                issue.id
                                                            )}
                                                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteIssue(issue.id)
                                                            }
                                                            className="text-sm font-semibold text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
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