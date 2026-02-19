import { useEffect, useState } from "react";
import {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
} from "../api/foodApi";
import FoodFormModal from "../components/FoodFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function FoodManagement() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const { data } = await getAllFoods();
      setFoods(data.foods || []);
    } catch (err) {
      setError("Failed to load foods" + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (selectedFood) {
        await updateFood(selectedFood._id, formData);
      } else {
        await createFood(formData);
      }
      setIsModalOpen(false);
      setSelectedFood(null);
      fetchFoods();
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFood(selectedFood._id);
      setIsDeleteOpen(false);
      setSelectedFood(null);
      fetchFoods();
    } catch (err) {
      alert("Delete failed");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading foods...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          🍔 Food Management
        </h2>
        <button
          onClick={() => {
            setSelectedFood(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Add Food
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {foods.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No food items found 🍽️ <br />
          Click "Add Food" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr
                  key={food._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{food.title}</td>
                  <td className="p-4">₹{food.price}</td>
                  <td className="p-4 flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedFood(food);
                        setIsModalOpen(true);
                      }}
                      className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFood(food);
                        setIsDeleteOpen(true);
                      }}
                      className="px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FoodFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedFood}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default FoodManagement;
