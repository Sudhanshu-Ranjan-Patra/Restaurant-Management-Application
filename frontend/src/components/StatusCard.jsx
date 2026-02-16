function StatusCard({ title, value, growth }) {
    return(
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-gray-500">{title}</h4>
            <h2 className="text-2xl font-bold mt-2">{value}</h2>
            <p className="text-green-500 text-sm mt-1">{growth}</p>
        </div>
    )
}

export default StatusCard;