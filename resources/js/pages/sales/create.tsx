import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import type { RequestPayload } from '@inertiajs/core';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { InputError } from '@/components/input-error';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock_quantity: number;
    unit: string;
}

interface SaleItem {
    product_id: number;
    quantity: number;
    unit_price: number;
}

interface Props {
    products: Product[];
    [key: string]: unknown;
}

export default function CreateSale({ products }: Props) {
    const [items, setItems] = useState<SaleItem[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [notes, setNotes] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const addItem = () => {
        setItems([...items, { product_id: 0, quantity: 1, unit_price: 0 }]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const updateItem = (index: number, field: keyof SaleItem, value: number) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        
        // Auto-fill unit price when product is selected
        if (field === 'product_id') {
            const product = products.find(p => p.id === value);
            if (product) {
                newItems[index].unit_price = product.price;
            }
        }
        
        setItems(newItems);
    };

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const data = {
            customer_name: customerName,
            payment_method: paymentMethod,
            items: items,
            notes: notes,
        };

        router.post('/sales', data as unknown as RequestPayload, {
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            onSuccess: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <AppShell>
            <Head title="Record New Sale" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Record New Sale</h1>
                    <p className="text-gray-600">Add items and process customer payment</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Customer Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Walk-in customer"
                                />
                                <InputError message={errors.customer_name} className="mt-1" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Method *
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="cash">💰 Cash</option>
                                    <option value="debit_card">💳 Debit Card</option>
                                    <option value="credit_card">💳 Credit Card</option>
                                </select>
                                <InputError message={errors.payment_method} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Items</h3>
                            <Button type="button" onClick={addItem} variant="outline">
                                ➕ Add Item
                            </Button>
                        </div>

                        {items.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No items added yet. Click "Add Item" to start.
                            </div>
                        )}

                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                                    <div className="col-span-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={item.product_id}
                                            onChange={(e) => updateItem(index, 'product_id', parseInt(e.target.value))}
                                        >
                                            <option value={0}>Select a product</option>
                                            {products.map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name} - ${product.price} ({product.stock_quantity} in stock)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                        />
                                    </div>
                                    
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Unit Price
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={item.unit_price}
                                            onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Total
                                        </label>
                                        <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700 font-medium">
                                            ${(item.quantity * item.unit_price).toFixed(2)}
                                        </div>
                                    </div>
                                    
                                    <div className="col-span-2">
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => removeItem(index)}
                                            className="w-full text-red-600 hover:text-red-700"
                                        >
                                            🗑️ Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <InputError message={errors.items} className="mt-2" />
                    </div>

                    {/* Order Summary */}
                    {items.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (10%):</span>
                                    <span>${calculateTax().toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-lg shadow">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes (Optional)
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Special instructions or notes..."
                        />
                        <InputError message={errors.notes} className="mt-1" />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => router.visit('/sales')}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing || items.length === 0}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {processing ? 'Processing...' : '💰 Process Sale'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}