import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        lab_number: '',
        equipment_type: '',
        issue_description: '',
        reported_by: '',
        severity: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('equipment-issues.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        IT Support Desk
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        Report Equipment Issue
                    </h2>
                </div>
            }
        >
            <Head title="Report Equipment Issue" />

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-8">
                        <Link
                            href={route('equipment-issues.index')}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                            Back to Equipment Issues
                        </Link>

                        <h1 className="mt-5 text-3xl font-bold text-gray-900">
                            Report Equipment Issue
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Provide the details of the damaged or malfunctioning equipment.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <form onSubmit={submit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Laboratory
                                </label>

                                <select
                                    value={data.lab_number}
                                    onChange={(e) =>
                                        setData('lab_number', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">
                                        Select laboratory
                                    </option>
                                    <option value="Lab A">Lab A</option>
                                    <option value="Lab B">Lab B</option>
                                    <option value="Lab C">Lab C</option>
                                    <option value="Mac Lab">Mac Lab</option>
                                </select>

                                {errors.lab_number && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.lab_number}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Equipment Type
                                </label>

                                <select
                                    value={data.equipment_type}
                                    onChange={(e) =>
                                        setData('equipment_type', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">
                                        Select equipment
                                    </option>
                                    <option value="Monitor">Monitor</option>
                                    <option value="Keyboard">Keyboard</option>
                                    <option value="Mouse">Mouse</option>
                                    <option value="LAN Cable">LAN Cable</option>
                                </select>

                                {errors.equipment_type && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.equipment_type}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Issue Description
                                </label>

                                <textarea
                                    rows="5"
                                    value={data.issue_description}
                                    onChange={(e) =>
                                        setData(
                                            'issue_description',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Describe the problem..."
                                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                />

                                {errors.issue_description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.issue_description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Reported By
                                </label>

                                <input
                                    type="text"
                                    value={data.reported_by}
                                    onChange={(e) =>
                                        setData('reported_by', e.target.value)
                                    }
                                    placeholder="Student name or College ID"
                                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                />

                                {errors.reported_by && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.reported_by}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Severity
                                </label>

                                <select
                                    value={data.severity}
                                    onChange={(e) =>
                                        setData('severity', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">
                                        Select severity
                                    </option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>

                                {errors.severity && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.severity}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

                                <Link
                                    href={route('equipment-issues.index')}
                                    className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit Issue'}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}