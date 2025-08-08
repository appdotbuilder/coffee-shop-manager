import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Sale {
    id: number;
    customer_name: string | null;
    payment_method: string;
    subtotal: number;
    tax: number;
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
        unit_price: number;
        total_price: number;
    }>;
}

interface Props {
    sales: {
        data: Sale[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function SalesIndex({ sales }: Props) {
    return (
        <AppShell>
            <Head title="Sales" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Sales History</h1>
                        <p className="text-gray-600">Manage and track all sales transactions</p>
                    </div>
                    <Button asChild>
                        <Link href="/sales/create">➕ Record New Sale</Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sale ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cashier
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sales.data.length > 0 ? sales.data.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{sale.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {sale.customer_name || 'Walk-in'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="max-w-xs">
                                                {sale.items.map((item, index) => (
                                                    <div key={index} className="text-xs">
                                                        {item.quantity}x {item.product.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                                {sale.payment_method.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${sale.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {sale.user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(sale.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/sales/${sale.id}`}>View</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                                            No sales recorded yet. 
                                            <Link href="/sales/create" className="text-blue-600 hover:text-blue-800 ml-1">
                                                Record your first sale
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {sales.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Showing {((sales.current_page - 1) * sales.per_page) + 1} to{' '}
                                {Math.min(sales.current_page * sales.per_page, sales.total)} of{' '}
                                {sales.total} results
                            </div>
                            <div className="flex space-x-2">
                                {sales.current_page > 1 && (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/sales?page=${sales.current_page - 1}`}>
                                            Previous
                                        </Link>
                                    </Button>
                                )}
                                {sales.current_page < sales.last_page && (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/sales?page=${sales.current_page + 1}`}>
                                            Next
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}