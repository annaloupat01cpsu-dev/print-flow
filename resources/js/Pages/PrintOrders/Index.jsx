import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

const statuses = {
    pending: ['Pending', 'bg-amber-100 text-amber-800'],
    processing: ['In progress', 'bg-sky-100 text-sky-800'],
    ready: ['Ready for pickup', 'bg-emerald-100 text-emerald-800'],
    completed: ['Completed', 'bg-slate-100 text-slate-700'],
    cancelled: ['Cancelled', 'bg-rose-100 text-rose-800'],
};

const products = {
    document: 'Document printing',
    tarpaulin: 'Tarpaulin',
    sticker: 'Stickers & labels',
    business_card: 'Business cards & flyers',
};

export default function Index({ orders, isStaff }) {
    const updateStatus = (orderId, status) => {
        router.patch(route('print-orders.status', orderId), { status }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-semibold text-orange-700">Printflow</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900">{isStaff ? 'All print orders' : 'My print orders'}</h2>
                </div>
            }
        >
            <Head title="Print orders" />
            <div className="min-h-screen bg-[#fbfaf8] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <Link href={route('dashboard')} className="text-sm font-semibold text-orange-700 hover:text-orange-800">← Back to dashboard</Link>
                            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">{isStaff ? 'All customer orders' : 'Your print orders'}</h1>
                            <p className="mt-2 text-sm text-slate-600">{isStaff ? 'Review customer files and update order progress.' : 'Check the details and status of each project.'}</p>
                        </div>
                        {!isStaff && <Link href={route('print-orders.create')} className="w-fit rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700">Start a print order</Link>}
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {orders.data.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <h2 className="text-lg font-bold text-slate-900">No orders to show</h2>
                                <p className="mt-2 text-sm text-slate-500">New print requests will appear here.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px] text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            {['Order', ...(isStaff ? ['Customer'] : []), 'Quantity', 'File', 'Status', 'Submitted'].map((heading) => (
                                                <th key={heading} className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{heading}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.data.map((order) => (
                                            <tr key={order.id} className="border-t border-slate-100">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-900">#{order.id} · {products[order.product_type] ?? order.product_type}</p>
                                                    <p className="mt-1 text-sm text-slate-500">{order.size}{order.product_type === 'tarpaulin' ? ` · ${order.width_cm} × ${order.height_cm} cm` : ''}</p>
                                                    {order.notes && <p className="mt-1 max-w-sm truncate text-xs text-slate-500">{order.notes}</p>}
                                                </td>
                                                {isStaff && (
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-semibold text-slate-800">{order.user?.name}</p>
                                                        <p className="text-xs text-slate-500">{order.user?.email}</p>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 text-sm text-slate-700">{order.quantity} · {order.color_mode === 'color' ? 'Color' : 'B&W'}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {order.file_path ? <a href={route('print-orders.download', order.id)} className="font-semibold text-orange-700 hover:text-orange-800">Download file</a> : <span className="text-slate-400">None</span>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {isStaff ? (
                                                        <select aria-label={`Status for order ${order.id}`} value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} className="rounded-lg border-slate-300 py-2 text-sm font-semibold text-slate-700 focus:border-orange-500 focus:ring-orange-500">
                                                            {Object.entries(statuses).map(([value, [label]]) => <option key={value} value={value}>{label}</option>)}
                                                        </select>
                                                    ) : (
                                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statuses[order.status]?.[1] ?? 'bg-slate-100 text-slate-700'}`}>
                                                            {statuses[order.status]?.[0] ?? order.status}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {orders.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                                <span className="text-sm text-slate-500">Page {orders.current_page} of {orders.last_page}</span>
                                <div className="flex gap-2">
                                    {orders.links.filter((link) => ['Previous', 'Next'].includes(link.label.replace(/&laquo;|&raquo;/g, '').trim())).map((link) => (
                                        <Link key={link.label} href={link.url ?? '#'} preserveScroll className={`rounded-lg border px-3 py-2 text-sm font-semibold ${link.url ? 'border-slate-300 text-slate-700 hover:bg-slate-50' : 'pointer-events-none border-slate-200 text-slate-400'}`}>
                                            {link.label.replace(/&laquo;|&raquo;/g, '').trim()}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
