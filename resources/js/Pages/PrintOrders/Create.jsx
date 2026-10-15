import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const fieldClass = 'mt-2 block w-full rounded-xl border-slate-300 bg-white shadow-sm focus:border-orange-500 focus:ring-orange-500';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        product_type: 'document',
        size: '',
        quantity: 1,
        color_mode: 'color',
        width_cm: '',
        height_cm: '',
        notes: '',
        file: null,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('print-orders.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-semibold text-orange-700">Printflow</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900">Start a print order</h2>
                </div>
            }
        >
            <Head title="New print order" />

            <div className="min-h-screen bg-[#fbfaf8] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <Link href={route('dashboard')} className="text-sm font-semibold text-orange-700 hover:text-orange-800">
                        ← Back to dashboard
                    </Link>
                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                        <div className="mb-8">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">Order details</p>
                            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Tell us what to print.</h1>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Submit your project details and our print team will review your request.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="product_type" className="text-sm font-semibold text-slate-700">Print service</label>
                                    <select id="product_type" value={data.product_type} onChange={(event) => setData('product_type', event.target.value)} className={fieldClass}>
                                        <option value="document">Document printing</option>
                                        <option value="tarpaulin">Tarpaulin printing</option>
                                        <option value="sticker">Stickers &amp; labels</option>
                                        <option value="business_card">Business cards &amp; flyers</option>
                                    </select>
                                    {errors.product_type && <p className="mt-1 text-sm text-red-600">{errors.product_type}</p>}
                                </div>
                                <div>
                                    <label htmlFor="size" className="text-sm font-semibold text-slate-700">Paper or product size</label>
                                    <input id="size" value={data.size} onChange={(event) => setData('size', event.target.value)} placeholder="e.g. A4, Letter, custom" className={fieldClass} required />
                                    {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
                                </div>
                                {data.product_type === 'tarpaulin' && (
                                    <>
                                        <div>
                                            <label htmlFor="width_cm" className="text-sm font-semibold text-slate-700">Width (cm)</label>
                                            <input id="width_cm" type="number" min="1" step="0.01" value={data.width_cm} onChange={(event) => setData('width_cm', event.target.value)} className={fieldClass} required />
                                            {errors.width_cm && <p className="mt-1 text-sm text-red-600">{errors.width_cm}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="height_cm" className="text-sm font-semibold text-slate-700">Height (cm)</label>
                                            <input id="height_cm" type="number" min="1" step="0.01" value={data.height_cm} onChange={(event) => setData('height_cm', event.target.value)} className={fieldClass} required />
                                            {errors.height_cm && <p className="mt-1 text-sm text-red-600">{errors.height_cm}</p>}
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label htmlFor="quantity" className="text-sm font-semibold text-slate-700">Quantity</label>
                                    <input id="quantity" type="number" min="1" max="10000" value={data.quantity} onChange={(event) => setData('quantity', event.target.value)} className={fieldClass} required />
                                    {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                                </div>
                                <div>
                                    <label htmlFor="color_mode" className="text-sm font-semibold text-slate-700">Print color</label>
                                    <select id="color_mode" value={data.color_mode} onChange={(event) => setData('color_mode', event.target.value)} className={fieldClass}>
                                        <option value="color">Full color</option>
                                        <option value="grayscale">Black &amp; white</option>
                                    </select>
                                    {errors.color_mode && <p className="mt-1 text-sm text-red-600">{errors.color_mode}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="file" className="text-sm font-semibold text-slate-700">Upload your design or document <span className="font-normal text-slate-500">(optional)</span></label>
                                <input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setData('file', event.target.files[0] ?? null)} className={`${fieldClass} file:mr-4 file:rounded-lg file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:font-semibold file:text-orange-800`} />
                                <p className="mt-1 text-xs text-slate-500">PDF, JPG, or PNG · up to 20 MB</p>
                                {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                            </div>

                            <div>
                                <label htmlFor="notes" className="text-sm font-semibold text-slate-700">Additional instructions <span className="font-normal text-slate-500">(optional)</span></label>
                                <textarea id="notes" rows="4" value={data.notes} onChange={(event) => setData('notes', event.target.value)} placeholder="Tell us about finishing, layout, or anything else we should know." className={fieldClass} />
                                {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                                <Link href={route('dashboard')} className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50">Cancel</Link>
                                <button type="submit" disabled={processing} className="rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60">
                                    {processing ? 'Submitting…' : 'Submit print order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
