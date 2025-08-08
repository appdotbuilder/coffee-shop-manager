import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Sale {
    id: number;
    customer_name: string | null;
    payment_method: string;
    total: number;
    created_at: string;
    user: {
        name: string;
    };
    items: Array<{
        product: {
            name: string;
        };
        quantity: number;
    }>;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock_quantity: number;
    unit?: string;
    total_sold?: number;
}

interface Props {
    todayStats?: {
        sales: number;
        sales_count: number;
        cash_sales: number;
    };
    monthlyStats?: {
        sales: number;
        purchases: number;
        expenses: number;
        profit: number;
    };
    recentSales?: Sale[];
    topProducts?: Product[];
    lowStockProducts?: Product[];
    [key: string]: unknown;
}

export default function Welcome({ 
    todayStats, 
    monthlyStats, 
    recentSales, 
    topProducts, 
    lowStockProducts 
}: Props) {
    const isAuthenticated = todayStats !== undefined;

    if (!isAuthenticated) {
        return (
            <>
                <Head title="Coffee Shop Management System" />
                <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
                    <div className="container mx-auto px-4 py-16">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <div className="text-6xl mb-4">☕</div>
                            <h1 className="text-5xl font-bold text-amber-900 mb-6">
                                Coffee Shop Pro
                            </h1>
                            <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto">
                                Complete management system for your coffee shop. Track sales, manage inventory, monitor cash flow, and grow your business with powerful analytics.
                            </p>
                            
                            <div className="flex justify-center space-x-4">
                                <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                                    <Link href="/login">Login to Dashboard</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                                    <Link href="/register">Create Account</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Sales Management</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✓ Record sales with customer details</li>
                                    <li>✓ Multiple payment methods support</li>
                                    <li>✓ Real-time inventory updates</li>
                                    <li>✓ Daily sales reporting</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Inventory Control</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✓ Product catalog management</li>
                                    <li>✓ Stock level monitoring</li>
                                    <li>✓ Low stock alerts</li>
                                    <li>✓ Purchase order tracking</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                <div className="text-4xl mb-4">💰</div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Cash Flow Tracking</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✓ Daily cash receipts</li>
                                    <li>✓ Expense management</li>
                                    <li>✓ Profit/loss analysis</li>
                                    <li>✓ Financial reporting</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">User Roles</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✓ Owner: Full access</li>
                                    <li>✓ Manager: Operations control</li>
                                    <li>✓ Cashier: Sales processing</li>
                                    <li>✓ Role-based permissions</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Analytics & Reports</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✓ Top selling products</li>
                                    <li>✓ Sales trends analysis</li>
                                    <li>✓ Customer insights</li>
                                    <li>✓ Performance metrics</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                <div className="text-4xl mb-4">🏪</div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Supplier Management</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>✓ Supplier database</li>
                                    <li>✓ Purchase tracking</li>
                                    <li>✓ Invoice management</li>
                                    <li>✓ Vendor performance</li>
                                </ul>
                            </div>
                        </div>

                        {/* Demo Preview */}
                        <div className="bg-white rounded-lg shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Dashboard Preview</h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                    <div className="text-green-600 font-medium">Today's Sales</div>
                                    <div className="text-2xl font-bold text-green-700">$1,247.50</div>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                    <div className="text-blue-600 font-medium">Orders</div>
                                    <div className="text-2xl font-bold text-blue-700">87</div>
                                </div>
                                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                                    <div className="text-orange-600 font-medium">Low Stock Items</div>
                                    <div className="text-2xl font-bold text-orange-700">5</div>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                    <div className="text-purple-600 font-medium">Monthly Profit</div>
                                    <div className="text-2xl font-bold text-purple-700">$12,340</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="text-center mt-16">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to streamline your coffee shop?</h2>
                            <p className="text-lg text-gray-600 mb-8">Join hundreds of coffee shop owners who trust Coffee Shop Pro</p>
                            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-3">
                                <Link href="/register">Start Your Free Trial</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Coffee Shop Dashboard" />
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white shadow">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="text-3xl">☕</div>
                                <h1 className="text-2xl font-bold text-gray-900">Coffee Shop Dashboard</h1>
                            </div>
                            <div className="flex space-x-4">
                                <Button asChild>
                                    <Link href="/sales/create">🛒 New Sale</Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/products">📦 Products</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Today's Stats */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-green-600 font-medium">Today's Sales</div>
                            <div className="text-3xl font-bold text-green-700">
                                ${todayStats?.sales.toFixed(2) || '0.00'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {todayStats?.sales_count || 0} orders
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-blue-600 font-medium">Cash Sales</div>
                            <div className="text-3xl font-bold text-blue-700">
                                ${todayStats?.cash_sales.toFixed(2) || '0.00'}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-orange-600 font-medium">Monthly Sales</div>
                            <div className="text-3xl font-bold text-orange-700">
                                ${monthlyStats?.sales.toFixed(2) || '0.00'}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-purple-600 font-medium">Monthly Profit</div>
                            <div className="text-3xl font-bold text-purple-700">
                                ${monthlyStats?.profit.toFixed(2) || '0.00'}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Recent Sales */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
                            <div className="space-y-4">
                                {recentSales && recentSales.length > 0 ? recentSales.map((sale) => (
                                    <div key={sale.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                        <div>
                                            <div className="font-medium">
                                                {sale.customer_name || 'Walk-in Customer'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {sale.items.map(item => 
                                                    `${item.quantity}x ${item.product.name}`
                                                ).join(', ')}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">${sale.total}</div>
                                            <div className="text-sm text-gray-500 capitalize">
                                                {sale.payment_method.replace('_', ' ')}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500 py-8">
                                        No sales recorded yet
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Top Products */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
                            <div className="space-y-4">
                                {topProducts && topProducts.length > 0 ? topProducts.map((product) => (
                                    <div key={product.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                        <div>
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-sm text-gray-500">{product.category}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">{product.total_sold} sold</div>
                                            <div className="text-sm text-gray-500">${product.price}</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500 py-8">
                                        No sales data available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Low Stock Alert */}
                        {lowStockProducts && lowStockProducts.length > 0 && (
                            <div className="bg-red-50 p-6 rounded-lg border border-red-200 lg:col-span-2">
                                <h3 className="text-lg font-semibold mb-4 text-red-800">⚠️ Low Stock Alert</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {lowStockProducts.map((product) => (
                                        <div key={product.id} className="flex justify-between items-center py-2">
                                            <div>
                                                <div className="font-medium text-red-800">{product.name}</div>
                                                <div className="text-sm text-red-600">{product.category}</div>
                                            </div>
                                            <div className="text-red-700 font-bold">
                                                {product.stock_quantity} {product.unit || 'units'} left
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}