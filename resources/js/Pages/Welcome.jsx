import { Head, Link } from '@inertiajs/react';

const services = [
    {
        number: '01',
        title: 'Document printing',
        description:
            'Clear, reliable prints for school, work, forms, reports, and everyday essentials.',
        details: 'A4 · Letter · Legal',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
                <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M7 14h10v7H7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 11h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
        ),
        style: 'bg-orange-100 text-orange-700',
    },
    {
        number: '02',
        title: 'Tarpaulin printing',
        description:
            'Make your event, promotion, or celebration stand out with bold, large-format prints.',
        details: 'Events · Banners · Signage',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
                <path d="M4 5h16v14H4zM8 5v2m8-2v2M8 17v2m8-2v2M4 9h2m12 0h2M4 15h2m12 0h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m8 14 2.5-2.5 2 2L16 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        style: 'bg-sky-100 text-sky-700',
    },
    {
        number: '03',
        title: 'Stickers & labels',
        description:
            'Give products and packaging a polished finish with custom stickers and labels.',
        details: 'Custom sizes · Full color',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
                <path d="M5 4h14v11l-5 5H5V4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 9h6m-6 4h4m1 7v-5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        style: 'bg-emerald-100 text-emerald-700',
    },
    {
        number: '04',
        title: 'Business essentials',
        description:
            'Bring your brand together with business cards, flyers, and other everyday marketing prints.',
        details: 'Cards · Flyers · More',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3 10h18m-13 4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
        ),
        style: 'bg-violet-100 text-violet-700',
    },
];

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Printflow — Prints for every idea" />

            <div className="min-h-screen bg-[#fbfaf8] text-slate-900">
                <nav className="border-b border-slate-200/80 bg-[#fbfaf8]">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
                        <Link href="/" className="flex items-center gap-3" aria-label="Printflow home">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-orange-300">
                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
                                    <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M7 14h10v7H7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="text-xl font-extrabold tracking-tight">printflow<span className="text-orange-600">.</span></span>
                        </Link>

                        <div className="flex items-center gap-3 sm:gap-6">
                            <a href="#services" className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-900 sm:inline">
                                Our services
                            </a>
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
                                    My account
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-semibold text-slate-600 transition hover:text-slate-900">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
                                        Get started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <main>
                    <section className="relative overflow-hidden">
                        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-orange-200/40 blur-3xl" />
                        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-32">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-800">
                                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                                    Your local print partner
                                </p>
                                <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
                                    Big ideas.
                                    <span className="block text-orange-600">Beautifully</span>
                                    printed.
                                </h1>
                                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                                    From everyday documents to event-ready tarpaulins, get the prints you need to make your next idea real.
                                </p>
                                <div className="mt-9 flex flex-wrap items-center gap-4">
                                    <Link href={auth?.user ? route('print-orders.create') : route('login')} className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700">
                                        Start a print order
                                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                            <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                    {auth?.user && (
                                        <Link href={route('dashboard')} className="rounded-full border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-500 hover:bg-white">
                                            Visit your account
                                        </Link>
                                    )}
                                </div>
                                <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
                                    <div className="flex -space-x-2">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fbfaf8] bg-orange-200 text-xs font-bold text-orange-900">P</span>
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fbfaf8] bg-sky-200 text-xs font-bold text-sky-900">F</span>
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fbfaf8] bg-emerald-200 text-xs font-bold text-emerald-900">!</span>
                                    </div>
                                    <span>For projects big, small, and everything in between</span>
                                </div>
                            </div>

                            <div className="relative mx-auto w-full max-w-xl">
                                <div className="absolute -inset-5 rotate-3 rounded-[2rem] bg-orange-200/60" />
                                <div className="relative overflow-hidden rounded-[1.65rem] bg-slate-900 p-6 shadow-2xl shadow-slate-900/15 sm:p-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Print studio</span>
                                        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Made for you</span>
                                    </div>
                                    <div className="relative mt-7 flex min-h-[19rem] items-center justify-center overflow-hidden rounded-2xl bg-[#f2e9dc] p-6">
                                        <div aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-orange-300/70" />
                                        <div aria-hidden="true" className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-sky-300/70" />
                                        <div className="relative w-full max-w-xs -rotate-3 rounded-lg bg-white p-4 shadow-xl shadow-slate-900/15">
                                            <div className="flex aspect-[1.35] flex-col justify-between overflow-hidden rounded bg-orange-500 p-5 text-white">
                                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                                                    <span>Make it</span><span>Happen</span>
                                                </div>
                                                <div>
                                                    <p className="text-4xl font-black leading-[0.9] tracking-tight">YOUR<br />BIG DAY</p>
                                                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-100">A moment worth celebrating</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between px-1 pt-3">
                                                <span className="text-xs font-bold text-slate-800">EVENT BANNER</span>
                                                <span className="h-2 w-2 rounded-full bg-orange-500" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-5 right-5 rotate-6 rounded-md bg-white p-3 shadow-lg">
                                            <div className="h-14 w-12 rounded-sm border border-slate-200 bg-slate-50 p-2">
                                                <div className="h-1 w-6 rounded bg-slate-300" />
                                                <div className="mt-2 h-1 w-8 rounded bg-orange-400" />
                                                <div className="mt-1 h-1 w-6 rounded bg-slate-200" />
                                                <div className="mt-1 h-1 w-7 rounded bg-slate-200" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-white">From paper to standout</p>
                                            <p className="mt-1 text-sm text-slate-400">Prints that feel like you</p>
                                        </div>
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white">
                                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                                                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="services" className="scroll-mt-8 border-y border-slate-200 bg-white py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-5 sm:px-8">
                            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                                <div className="max-w-2xl">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">What we print</p>
                                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">The right print for every plan.</h2>
                                </div>
                                <p className="max-w-md text-base leading-7 text-slate-600">
                                    Get your documents ready, promote your business, or make a celebration memorable.
                                </p>
                            </div>

                            <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {services.map((service) => (
                                    <article key={service.number} className="group rounded-2xl border border-slate-200 bg-[#fbfaf8] p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5">
                                        <div className="flex items-center justify-between">
                                            <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.style}`}>
                                                {service.icon}
                                            </span>
                                            <span className="text-xs font-bold tracking-widest text-slate-400">{service.number}</span>
                                        </div>
                                        <h3 className="mt-6 text-lg font-extrabold text-slate-900">{service.title}</h3>
                                        <p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-slate-600">{service.description}</p>
                                        <p className="mt-5 border-t border-slate-200 pt-4 text-xs font-bold uppercase tracking-wider text-slate-500">{service.details}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="py-20 sm:py-24">
                        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">Easy as 1, 2, print</p>
                                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">A smoother way to get it printed.</h2>
                                <p className="mt-5 max-w-md leading-7 text-slate-600">
                                    Bring your files and ideas together. We’ll help you get from “what if?” to ready-to-share prints.
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                {[
                                    ['01', 'Choose your print', 'Pick the service that fits your project.'],
                                    ['02', 'Share your design', 'Bring your ready-to-print file or idea.'],
                                    ['03', 'Make it real', 'Get your prints ready to use and share.'],
                                ].map(([number, title, description]) => (
                                    <div key={number} className="rounded-2xl border border-slate-200 bg-white p-5">
                                        <span className="text-sm font-black text-orange-600">{number}</span>
                                        <h3 className="mt-5 font-extrabold text-slate-900">{title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="px-5 pb-20 sm:px-8 sm:pb-24">
                        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-12 sm:px-12 sm:py-16">
                            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                                <div className="max-w-2xl">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Ready when you are</p>
                                    <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Let’s get your next idea in print.</h2>
                                    <p className="mt-4 leading-7 text-slate-300">Create an account to get started and keep your print projects together.</p>
                                </div>
                                <Link href={auth?.user ? route('dashboard') : route('register')} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-400">
                                    {auth?.user ? 'Go to your account' : 'Create an account'}
                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                        <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900">printflow<span className="text-orange-600">.</span></Link>
                        <p className="text-sm text-slate-500">Prints for every idea, big or small.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
