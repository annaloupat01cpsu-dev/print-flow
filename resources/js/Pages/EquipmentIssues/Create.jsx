import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        category: '',
        location: '',
        issue_description: '',
        severity: '',
        photo: null,
    });
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (!data.photo) {
            setPhotoPreview(null);
            return;
        }

        const previewUrl = URL.createObjectURL(data.photo);
        setPhotoPreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [data.photo]);

    const submit = (e) => {
        e.preventDefault();

        post(route('equipment-issues.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        Barangay Services
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        Report a Community Issue
                    </h2>
                </div>
            }
        >
            <Head title="Report a Community Issue" />

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-8">
                        <Link
                            href={route('equipment-issues.index')}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                            Back to Community Issues
                        </Link>

                        <h1 className="mt-5 text-3xl font-bold text-gray-900">
                            Report a Community Issue
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Share what is happening in your neighborhood so barangay staff can follow up.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <form onSubmit={submit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Issue category
                                </label>

                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">
                                        Choose a category
                                    </option>
                                    <option value="Roads & walkways">Roads & walkways</option>
                                    <option value="Drainage & flooding">Drainage & flooding</option>
                                    <option value="Waste & sanitation">Waste & sanitation</option>
                                    <option value="Street lighting">Street lighting</option>
                                    <option value="Water supply">Water supply</option>
                                    <option value="Public safety">Public safety</option>
                                    <option value="Other">Other</option>
                                </select>

                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                    Location
                                </label>

                                <input
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData('location', e.target.value)
                                    }
                                    placeholder="Street, landmark, or nearby address"
                                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                />

                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.location}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    What is the problem?
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
                                    placeholder="Describe what you noticed and when it started..."
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

                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                    Photo evidence <span className="font-normal text-gray-500">(optional, up to 5 MB)</span>
                                </label>
                                <input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('photo', e.target.files[0] ?? null)}
                                    className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-green-50 file:px-4 file:py-2 file:font-semibold file:text-green-800 hover:file:bg-green-100"
                                />
                                {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                                {photoPreview && (
                                    <img src={photoPreview} alt="Selected issue" className="mt-4 max-h-56 rounded-md border border-gray-200 object-cover" />
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
                                    {processing ? 'Sending report...' : 'Send report'}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}