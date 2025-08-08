<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\Purchase;
use App\Models\Expense;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CoffeeShopController extends Controller
{
    /**
     * Display the coffee shop dashboard.
     */
    public function index()
    {
        $today = now()->toDateString();
        $thisMonth = now()->format('Y-m');

        // Get today's statistics
        $todayStats = [
            'sales' => Sale::whereDate('created_at', $today)->sum('total'),
            'sales_count' => Sale::whereDate('created_at', $today)->count(),
            'cash_sales' => Sale::where('payment_method', 'cash')
                ->whereDate('created_at', $today)
                ->sum('total'),
        ];

        // Get monthly statistics
        $monthlyStats = [
            'sales' => Sale::where('created_at', 'like', $thisMonth . '%')->sum('total'),
            'purchases' => Purchase::where('created_at', 'like', $thisMonth . '%')->sum('total'),
            'expenses' => Expense::where('expense_date', 'like', $thisMonth . '%')->sum('amount'),
        ];

        // Calculate profit
        $monthlyStats['profit'] = $monthlyStats['sales'] - $monthlyStats['purchases'] - $monthlyStats['expenses'];

        // Recent sales
        $recentSales = Sale::with(['user', 'items.product'])
            ->latest()
            ->take(5)
            ->get();

        // Top selling products
        $topProducts = Product::select('products.*', DB::raw('SUM(sale_items.quantity) as total_sold'))
            ->join('sale_items', 'products.id', '=', 'sale_items.product_id')
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->where('sales.created_at', '>=', now()->subDays(30))
            ->groupBy('products.id')
            ->orderBy('total_sold', 'desc')
            ->take(5)
            ->get();

        // Low stock products
        $lowStockProducts = Product::where('stock_quantity', '<=', 10)
            ->where('is_active', true)
            ->orderBy('stock_quantity', 'asc')
            ->take(5)
            ->get();

        return Inertia::render('welcome', [
            'todayStats' => $todayStats,
            'monthlyStats' => $monthlyStats,
            'recentSales' => $recentSales,
            'topProducts' => $topProducts,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}