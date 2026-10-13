import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log In" />

            <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-md">

                    <div className="mb-8 text-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-indigo-600"
                        >
                            IT Support Desk
                        </Link>

                        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                            Computer Lab Diagnostics
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Log in to access the equipment issue management system.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                        {status && (
                            <div className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email Address"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between">

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked
                                            )
                                        }
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />

                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                    >
                                        Forgot password?
                                    </Link>
                                )}

                            </div>

                            <div className="border-t border-gray-200 pt-5">

                                <PrimaryButton
                                    className="w-full py-3"
                                    disabled={processing}
                                >
                                    {processing ? 'Logging In...' : 'Log In'}
                                </PrimaryButton>

                                <p className="mt-5 text-center text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-semibold text-indigo-600 hover:text-indigo-800"
                                    >
                                        Create an Account
                                    </Link>
                                </p>

                            </div>

                        </form>

                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-500 hover:text-indigo-600"
                        >
                            Back to IT Support Desk
                        </Link>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}