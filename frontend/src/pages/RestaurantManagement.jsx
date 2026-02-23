import { useEffect, useState } from "react";
import { getAllResturants } from "../api/resturantApi";
import API from "../api/axios";

function RestaurantManagement() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    time: "",
    pickup: false,
    delivary: false,
    isOpen: true,
    logoUrl: "",
    rating: "",
    ratingCount: "",
    code: "",
    coords: "",
  });

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const { data } = await getAllResturants();
      setRestaurants(data.resturants || []);
    } catch (err) {
      setError("Failed to load restaurants");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const openCreateModal = () => {
    setSelectedRestaurant(null);
    setFormData({
      title: "",
      imageUrl: "",
      time: "",
      pickup: false,
      delivary: false,
      isOpen: true,
      logoUrl: "",
      rating: "",
      ratingCount: "",
      code: "",
      coords: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setFormData({
      title: restaurant.title || "",
      imageUrl: restaurant.imageUrl || "",
      time: restaurant.time || "",
      pickup: restaurant.pickup || false,
      delivary: restaurant.delivary || false,
      isOpen: restaurant.isOpen ?? true,
      logoUrl: restaurant.logoUrl || "",
      rating: restaurant.rating || "",
      ratingCount: restaurant.ratingCount || "",
      code: restaurant.code || "",
      coords: restaurant.coords || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.coords.trim()) {
      setError("Title and Address / Coords are required.");
      return;
    }

    try {
      if (selectedRestaurant) {
        // No explicit update endpoint in backend, so we can keep this to create-only for now
        // or later you can add an update route and wire it here.
        await API.post("/resturant/create", formData);
      } else {
        await API.post("/resturant/create", formData);
      }
      setIsModalOpen(false);
      setSelectedRestaurant(null);
      fetchRestaurants();
    } catch (err) {
      console.log(err);
      const msg =
        err.response?.data?.message ||
        "Failed to create restaurant. Please check required fields.";
      setError(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }
    try {
      await API.delete(`/resturant/delete/${id}`);
      fetchRestaurants();
    } catch (err) {
      alert("Delete failed");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading restaurants...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          🏬 Restaurant Management
        </h2>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Add Restaurant
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {restaurants.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No restaurants found 🏪 <br />
          Click "Add Restaurant" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((rest) => (
                <tr
                  key={rest._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{rest.title}</td>
                  <td className="p-4">{rest.code || "-"}</td>
                  <td className="p-4">{rest.rating ?? "-"}</td>
                  <td className="p-4 flex justify-center gap-4">
                    <button
                      onClick={() => openEditModal(rest)}
                      className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(rest._id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {selectedRestaurant ? "Edit Restaurant" : "Add Restaurant"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                type="text"
                placeholder="Image URL"
                className="w-full border p-2 rounded"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Logo URL"
                className="w-full border p-2 rounded"
                value={formData.logoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, logoUrl: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Approx. time (e.g. 30-40 min)"
                className="w-full border p-2 rounded"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address / Coords"
                className="w-full border p-2 rounded"
                value={formData.coords}
                onChange={(e) =>
                  setFormData({ ...formData, coords: e.target.value })
                }
                required
              />
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.pickup}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickup: e.target.checked,
                      })
                    }
                  />
                  Pickup Available
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.delivary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        delivary: e.target.checked,
                      })
                    }
                  />
                  Delivery Available
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.isOpen}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isOpen: e.target.checked,
                      })
                    }
                  />
                  Open
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  {selectedRestaurant ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantManagement;

