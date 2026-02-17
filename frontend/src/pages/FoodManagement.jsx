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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    const fetchFoods = async () => {
        const { data } = await getAllFoods();
        setFoods(data.foods);
    };
    
    useEffect(() => {
        fetchFoods();
    }, []);



    const handleSubmit = async (formData) => {
        if (selectedFood) {
            await updateFood(selectedFood._id, formData);
        } else {
            await createFood(formData);
        }

        setIsModalOpen(false);
        setSelectedFood(null);
        fetchFoods();
    };

    const handleDelete = async () => {
        await deleteFood(selectedFood._id);
        setIsDeleteOpen(false);
        setSelectedFood(null);
        fetchFoods();
    };

    return (
        <div className="p-6">

            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Food Management</h2>
                <button
                    onClick={() => {
                        setSelectedFood(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Food
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {foods.map((food) => (
                            <tr key={food._id} className="border-t">
                                <td className="p-4">{food.title}</td>
                                <td className="p-4">₹{food.price}</td>
                                <td className="p-4 space-x-4">
                                    <button
                                        onClick={() => {
                                            setSelectedFood(food);
                                            setIsModalOpen(true);
                                        }}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedFood(food);
                                            setIsDeleteOpen(true);
                                        }}
                                        className="text-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
