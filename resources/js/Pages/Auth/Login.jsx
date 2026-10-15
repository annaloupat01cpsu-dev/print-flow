import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword, isStaffLogin = false }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route(isStaffLogin ? 'staff.login' : 'login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={isStaffLogin ? 'Staff sign in' : 'Log in'} />

            <div className="min-h-screen bg-[#fbfaf8] px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-md">

                    <div className="mb-8 text-center">
                        <Link
                            href="/"
                            className="text-2xl font-extrabold tracking-tight text-slate-900"
                        >
                            printflow<span className="text-orange-600">.</span>
                        </Link>

                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                            {isStaffLogin ? 'Studio team' : 'Your print projects'}
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                            {isStaffLogin ? 'Staff sign in' : 'Welcome back'}
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {isStaffLogin
                                ? 'Sign in to review and manage customer print orders.'
                                : 'Log in to place print orders and follow their progress.'}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">

                        {status && (
                            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
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
                                        className="rounded border-slate-300 text-orange-600 shadow-sm focus:ring-orange-500"
                                    />

                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-orange-700 hover:text-orange-800"
                                    >
                                        Forgot password?
                                    </Link>
                                )}

                            </div>

                            <div className="border-t border-slate-100 pt-5">
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={processing}
                                >
                                    {processing ? 'Signing in...' : 'Sign in'}
                                </button>

                                {!isStaffLogin && <p className="mt-5 text-center text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-semibold text-orange-700 hover:text-orange-800"
                                    >
                                        Create an Account
                                    </Link>
                                </p>}
                                <p className="mt-4 text-center text-sm text-gray-600">
                                    {isStaffLogin ? 'Customer?' : 'Studio staff?'}{' '}
                                    <Link
                                        href={route(isStaffLogin ? 'login' : 'staff.login')}
                                        className="font-semibold text-slate-700 hover:text-orange-700"
                                    >
                                        {isStaffLogin ? 'Customer sign in' : 'Staff sign in'}
                                    </Link>
                                </p>

                            </div>

                        </form>

                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-sm font-medium text-slate-500 hover:text-orange-700"
                        >
                            Back to Printflow
                        </Link>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}