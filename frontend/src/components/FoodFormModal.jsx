import { useEffect, useState } from "react";

function FoodFormModal({ isOpen, onClose, onSubmit, initialData, restaurants = [] }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    restaurant: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        restaurant: initialData.restaurant || "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl">

        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Food" : "Add Food"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />


          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-2 rounded"
            value={formData.restaurant}
            onChange={(e) =>
              setFormData({ ...formData, restaurant: e.target.value })
            }
            required
          >
            <option value="">Select Restaurant</option>
            {restaurants.length === 0 && (
              <>
                <option value="65d4c7f1e1a1a1a1a1a1a1a1">RedX 1</option>
                <option value="65d4c7f1e1a1a1a1a1a1a1a2">RedX 2</option>
                <option value="65d4c7f1e1a1a1a1a1a1a1a3">RedX 3</option>
              </>
            )}
            {restaurants.map((rest) => (
              <option key={rest._id} value={rest._id}>
                {rest.title}
              </option>
            ))}
          </select>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FoodFormModal;
