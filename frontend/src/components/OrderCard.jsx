function OrderCard({ id, name, time, status }) {
    return (
        <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition">
            <div className="flex justify-between text-sm text-gray-500">
                <span>Order {id}</span>
                <span className={`px-2 py-1 rounded text-xs ${status === "Completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                    {status}
                </span>
            </div>
            <h4 className="font-semibold mt-2">{name}</h4>
            <p className="text-sm text-gray-400">{time}</p>
        </div>
    );
}

export default OrderCard;