import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

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
                            Your print projects
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-slate-600">
                            Sign up to place print orders and follow their progress.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">

                        <form onSubmit={submit} className="space-y-5">

                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-2 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

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
                                    className="mt-2 block w-full"
                                    autoComplete="username"
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
                                    className="mt-2 block w-full"
                                    autoComplete="new-password"
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

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="border-t border-gray-200 pt-5">

                                <PrimaryButton
                                    className="w-full justify-center bg-indigo-600 py-3 text-sm font-semibold hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Creating Account...'
                                        : 'Create Account'}
                                </PrimaryButton>

                                <p className="mt-5 text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-indigo-600 hover:text-indigo-800"
                                    >
                                        Log In
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
                            Back to Printflow
                        </Link>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}