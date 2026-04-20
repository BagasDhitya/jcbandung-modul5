import { useProducts, type Product } from "../../hooks/useProducts";

export default function Dashboard() {
    const { products } = useProducts();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Product Dashboard
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="text-left px-4 py-3">Title</th>
                                <th className="text-left px-4 py-3">Description</th>
                                <th className="text-left px-4 py-3">Price</th>
                                <th className="text-left px-4 py-3">Stock</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products?.map((item: Product, key) => (
                                <tr
                                    key={key}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {item.title}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {item.description}
                                    </td>
                                    <td className="px-4 py-3 text-green-600 font-semibold">
                                        ${item.price}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-medium ${item.stock > 0
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {item.stock > 0 ? item.stock : "Out of stock"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!products?.length && (
                        <p className="text-center text-gray-500 py-6">
                            No products available
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}