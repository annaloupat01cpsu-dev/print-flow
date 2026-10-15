<?php

namespace App\Http\Controllers;

use App\Models\PrintOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PrintOrderController extends Controller
{
    private const STATUSES = ['pending', 'processing', 'ready', 'completed', 'cancelled'];

    public function index(Request $request): Response
    {
        $orders = PrintOrder::query()
            ->with('user:id,name,email')
            ->when(! $request->user()->isStaff(), fn ($query) => $query->where('user_id', $request->user()->id))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('PrintOrders/Index', [
            'orders' => $orders,
            'isStaff' => $request->user()->isStaff(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('PrintOrders/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_type' => 'required|in:document,tarpaulin,sticker,business_card',
            'size' => 'required|string|max:100',
            'quantity' => 'required|integer|min:1|max:10000',
            'color_mode' => 'required|in:color,grayscale',
            'width_cm' => 'nullable|required_if:product_type,tarpaulin|numeric|min:1|max:10000',
            'height_cm' => 'nullable|required_if:product_type,tarpaulin|numeric|min:1|max:10000',
            'notes' => 'nullable|string|max:5000',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:20480',
        ]);

        $filePath = $request->file('file')?->store('print-orders', 'local');

        if ($request->hasFile('file') && ! $filePath) {
            throw new RuntimeException('Unable to store the uploaded print order file.');
        }

        PrintOrder::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'file_path' => $filePath,
            'status' => 'pending',
        ]);

        return redirect()
            ->route('dashboard')
            ->with('success', 'Your print order has been submitted.');
    }

    public function updateStatus(Request $request, PrintOrder $printOrder)
    {
        abort_unless($request->user()->isStaff(), 403);

        $validated = $request->validate([
            'status' => 'required|in:'.implode(',', self::STATUSES),
        ]);

        $printOrder->update(['status' => $validated['status']]);

        return back()->with('success', 'Print order status updated.');
    }

    public function downloadFile(Request $request, PrintOrder $printOrder): StreamedResponse
    {
        abort_unless(
            $request->user()->isStaff() || $printOrder->user_id === $request->user()->id,
            403
        );
        abort_unless($printOrder->file_path && Storage::disk('local')->exists($printOrder->file_path), 404);

        return Storage::disk('local')->download($printOrder->file_path);
    }
}
