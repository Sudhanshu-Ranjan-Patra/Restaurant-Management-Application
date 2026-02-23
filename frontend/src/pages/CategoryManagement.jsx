import { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await getAllCategories();
      setCategories(data.categories || []);
    } catch (err) {
      setError("Failed to load categories");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setSelectedCategory(null);
    setFormData({ title: "", imageUrl: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      title: category.title || "",
      imageUrl: category.imageUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory._id, formData);
      } else {
        await createCategory(formData);
      }
      setIsModalOpen(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      alert("Delete failed");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          🏷️ Category Management
        </h2>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Add Category
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {categories.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No categories found 🏷️ <br />
          Click "Add Category" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{cat.title}</td>
                  <td className="p-4">
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-4 flex justify-center gap-4">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
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
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {selectedCategory ? "Edit Category" : "Add Category"}
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

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  {selectedCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement;

