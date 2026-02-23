import { useEffect, useMemo, useState } from "react";
import { getAllFoods } from "../api/foodApi";
import { placeOrder } from "../api/orderApi";

function PlaceOrder() {
  const [foods, setFoods] = useState([]);
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchFoods() {
      try {
        setLoading(true);
        const { data } = await getAllFoods();
        setFoods(data.foods || []);
      } catch (err) {
        setError("Failed to load foods");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  const handleSelect = (foodId) => {
    setSelectedFoodIds((prev) =>
      prev.includes(foodId)
        ? prev.filter((id) => id !== foodId)
        : [...prev, foodId]
    );
  };

  // Build the cart objects the backend expects (includes price)
  const selectedFoods = useMemo(
    () => foods.filter((f) => selectedFoodIds.includes(f._id)),
    [foods, selectedFoodIds]
  );

  const totalAmount = useMemo(
    () => selectedFoods.reduce((sum, item) => sum + (item.price || 0), 0),
    [selectedFoods]
  );

  const handleOrder = async () => {
    setError("");
    setSuccess("");
    if (selectedFoods.length === 0) {
      setError("Please select at least one food item.");
      return;
    }
    try {
      // Send full food objects so backend can calculate total from price
      await placeOrder(selectedFoods);
      setSuccess("Order placed successfully!");
      setSelectedFoodIds([]);
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Food</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}
      {loading ? (
        <div>Loading foods...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foods.map((food) => (
              <div
                key={food._id}
                className="border rounded p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">{food.title}</div>
                  <div className="text-gray-600">₹{food.price}</div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedFoodIds.includes(food._id)}
                  onChange={() => handleSelect(food._id)}
                  className="w-5 h-5"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-semibold">
              Total: <span className="text-green-700">₹{totalAmount}</span>
            </div>
            <button
              onClick={handleOrder}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading || foods.length === 0 || selectedFoods.length === 0}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PlaceOrder;
