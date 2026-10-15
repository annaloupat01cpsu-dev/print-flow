import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

const statusStyles = {
    pending: 'bg-amber-100 text-amber-800',
    processing: 'bg-sky-100 text-sky-800',
    ready: 'bg-emerald-100 text-emerald-800',
    completed: 'bg-slate-100 text-slate-700',
    cancelled: 'bg-rose-100 text-rose-800',
};

const statusLabels = {
    pending: 'Pending',
    processing: 'In progress',
    ready: 'Ready for pickup',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

const productLabels = {
    document: 'Document printing',
    tarpaulin: 'Tarpaulin',
    sticker: 'Stickers & labels',
    business_card: 'Business cards & flyers',
};

export default function Dashboard({ orders, statusCounts = {}, isStaff = false }) {
    const totalOrders = Object.values(statusCounts).reduce((total, count) => total + Number(count), 0);
    const pendingOrders = Number(statusCounts.pending ?? 0);
    const activeOrders = Number(statusCounts.processing ?? 0);
    const readyOrders = Number(statusCounts.ready ?? 0);

    const updateStatus = (orderId, status) => {
        router.patch(route('print-orders.status', orderId), { status }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-semibold text-orange-700">Printflow</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900">{isStaff ? 'Order dashboard' : 'My print orders'}</h2>
                </div>
            }
        >
            <Head title="Print dashboard" />

            <div className="min-h-screen bg-[#fbfaf8] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">{isStaff ? 'Studio overview' : 'Your account'}</p>
                            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                                {isStaff ? 'Print order dashboard' : 'Your print projects'}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                {isStaff
                                    ? 'Review incoming print requests and keep customers up to date.'
                                    : 'Track the progress of your print requests and start a new project anytime.'}
                            </p>
                        </div>
                        {!isStaff && (
                            <Link href={route('print-orders.create')} className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700">
                                <span className="text-lg leading-none">+</span> Start a print order
                            </Link>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ['Total orders', totalOrders, 'All print requests', 'text-slate-950'],
                            ['Pending', pendingOrders, 'Awaiting studio review', 'text-amber-700'],
                            ['In progress', activeOrders, 'Currently being prepared', 'text-sky-700'],
                            ['Ready for pickup', readyOrders, 'Ready for the next step', 'text-emerald-700'],
                        ].map(([label, count, description, color]) => (
                            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-sm font-semibold text-slate-500">{label}</p>
                                <p className={`mt-3 text-3xl font-black ${color}`}>{count}</p>
                                <p className="mt-2 text-xs text-slate-500">{description}</p>
                            </div>
                        ))}
                    </div>

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-950">{isStaff ? 'Latest print requests' : 'Recent orders'}</h2>
                                <p className="mt-1 text-sm text-slate-500">{isStaff ? 'Manage the latest customer submissions.' : 'Your most recent print projects.'}</p>
                            </div>
                            <Link href={route('print-orders.index')} className="text-sm font-bold text-orange-700 hover:text-orange-800">
                                View all orders
                            </Link>
                        </div>

                        {orders.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-600">+</div>
                                <h3 className="mt-4 text-lg font-bold text-slate-900">No print orders yet</h3>
                                <p className="mt-2 text-sm text-slate-500">Your print projects and their status will show up here.</p>
                                {!isStaff && (
                                    <Link href={route('print-orders.create')} className="mt-5 inline-flex rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700">
                                        Create your first order
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            {['Order', ...(isStaff ? ['Customer'] : []), 'Quantity', 'Design file', 'Status'].map((heading) => (
                                                <th key={heading} className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{heading}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id} className="border-t border-slate-100">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-900">#{order.id} · {productLabels[order.product_type] ?? order.product_type}</p>
                                                    <p className="mt-1 text-sm text-slate-500">{order.size}{order.product_type === 'tarpaulin' ? ` · ${order.width_cm} × ${order.height_cm} cm` : ''}</p>
                                                </td>
                                                {isStaff && (
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-semibold text-slate-800">{order.user?.name}</p>
                                                        <p className="text-xs text-slate-500">{order.user?.email}</p>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 text-sm text-slate-700">{order.quantity} · {order.color_mode === 'color' ? 'Color' : 'B&W'}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {order.file_path ? (
                                                        <a href={route('print-orders.download', order.id)} className="font-semibold text-orange-700 hover:text-orange-800">Download file</a>
                                                    ) : <span className="text-slate-400">Not attached</span>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {isStaff ? (
                                                        <select aria-label={`Status for order ${order.id}`} value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} className="rounded-lg border-slate-300 py-2 text-sm font-semibold text-slate-700 focus:border-orange-500 focus:ring-orange-500">
                                                            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                                                        </select>
                                                    ) : (
                                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[order.status] ?? 'bg-slate-100 text-slate-700'}`}>
                                                            {statusLabels[order.status] ?? order.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
