<?php

namespace Tests\Feature;

use App\Models\PrintOrder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PrintOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_submit_an_order_with_a_private_design_file(): void
    {
        Storage::fake('local');
        $customer = User::factory()->create();

        $response = $this->actingAs($customer)->post(route('print-orders.store'), [
            'product_type' => 'document',
            'size' => 'A4',
            'quantity' => 3,
            'color_mode' => 'grayscale',
            'notes' => 'Print double-sided.',
            'file' => UploadedFile::fake()->create('report.pdf', 100, 'application/pdf'),
        ]);

        $response->assertRedirect(route('dashboard'));
        $order = PrintOrder::firstOrFail();
        $this->assertSame($customer->id, $order->user_id);
        $this->assertSame('pending', $order->status);
        Storage::disk('local')->assertExists($order->file_path);
    }

    public function test_tarpaulin_orders_require_dimensions(): void
    {
        $response = $this->actingAs(User::factory()->create())
            ->from(route('print-orders.create'))
            ->post(route('print-orders.store'), [
                'product_type' => 'tarpaulin',
                'size' => 'Custom',
                'quantity' => 1,
                'color_mode' => 'color',
            ]);

        $response->assertSessionHasErrors(['width_cm', 'height_cm']);
        $this->assertDatabaseCount('print_orders', 0);
    }

    public function test_customers_only_see_their_own_orders(): void
    {
        $customer = User::factory()->create();
        $otherCustomer = User::factory()->create();
        $this->createOrder($customer);
        $this->createOrder($otherCustomer);

        $this->actingAs($customer)
            ->get(route('print-orders.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('PrintOrders/Index')
                ->where('isStaff', false)
                ->has('orders.data', 1));
    }

    public function test_only_staff_can_update_order_status(): void
    {
        $order = $this->createOrder(User::factory()->create());

        $this->actingAs(User::factory()->create())
            ->patch(route('print-orders.status', $order), ['status' => 'processing'])
            ->assertForbidden();

        $this->actingAs(User::factory()->create(['role' => 'staff']))
            ->patch(route('print-orders.status', $order), ['status' => 'processing'])
            ->assertRedirect();

        $this->assertSame('processing', $order->fresh()->status);
    }

    public function test_customers_cannot_download_another_customers_design_file(): void
    {
        Storage::fake('local');
        $owner = User::factory()->create();
        $order = $this->createOrder($owner, 'print-orders/design.pdf');
        Storage::disk('local')->put($order->file_path, 'private design');

        $this->actingAs(User::factory()->create())
            ->get(route('print-orders.download', $order))
            ->assertForbidden();
    }

    private function createOrder(User $customer, ?string $filePath = null): PrintOrder
    {
        return PrintOrder::create([
            'user_id' => $customer->id,
            'product_type' => 'document',
            'size' => 'A4',
            'quantity' => 1,
            'color_mode' => 'color',
            'file_path' => $filePath,
            'status' => 'pending',
        ]);
    }
}
