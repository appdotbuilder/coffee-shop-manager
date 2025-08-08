import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description: string | null;
    category: string;
    price: number;
    stock_quantity: number;
    unit: string;
    is_active: boolean;
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products }: Props) {
    const getStockStatus = (quantity: number) => {
        if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
        if (quantity <= 10) return { text: 'Low Stock', color: 'text-orange-600 bg-orange-100' };
        return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
    };

    return (
        <AppShell>
            <Head title="Products" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Product Catalog</h1>
                        <p className="text-gray-600">Manage your coffee shop menu and inventory</p>
                    </div>
                    <Button asChild>
                        <Link href="/products/create">➕ Add New Product</Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.data.length > 0 ? products.data.map((product) => {
                                    const stockStatus = getStockStatus(product.stock_quantity);
                                    return (
                                        <tr key={product.id} className={`hover:bg-gray-50 ${!product.is_active ? 'opacity-60' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                    {product.description && (
                                                        <div className="text-sm text-gray-500">{product.description}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ${product.price.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {product.stock_quantity} {product.unit}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                                                    {stockStatus.text}
                                                </span>
                                                {!product.is_active && (
                                                    <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={`/products/${product.id}`}>View</Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={`/products/${product.id}/edit`}>Edit</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            No products found. 
                                            <Link href="/products/create" className="text-blue-600 hover:text-blue-800 ml-1">
                                                Add your first product
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {products.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Showing {((products.current_page - 1) * products.per_page) + 1} to{' '}
                                {Math.min(products.current_page * products.per_page, products.total)} of{' '}
                                {products.total} results
                            </div>
                            <div className="flex space-x-2">
                                {products.current_page > 1 && (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/products?page=${products.current_page - 1}`}>
                                            Previous
                                        </Link>
                                    </Button>
                                )}
                                {products.current_page < products.last_page && (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/products?page=${products.current_page + 1}`}>
                                            Next
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-blue-600 font-medium">Total Products</div>
                        <div className="text-2xl font-bold text-blue-700">{products.total}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-green-600 font-medium">Active Products</div>
                        <div className="text-2xl font-bold text-green-700">
                            {products.data.filter(p => p.is_active).length}
                        </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="text-orange-600 font-medium">Low Stock Items</div>
                        <div className="text-2xl font-bold text-orange-700">
                            {products.data.filter(p => p.stock_quantity <= 10 && p.stock_quantity > 0).length}
                        </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="text-red-600 font-medium">Out of Stock</div>
                        <div className="text-2xl font-bold text-red-700">
                            {products.data.filter(p => p.stock_quantity === 0).length}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}