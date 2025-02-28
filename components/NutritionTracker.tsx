import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Meal {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface NutritionTrackerProps {
  mealName?: string;
  calories?: string;
}

const NutritionTracker: React.FC<NutritionTrackerProps> = ({ mealName = "", calories = "" }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState<Meal>({ name: mealName, calories, protein: "", carbs: "", fat: "" });

  useEffect(() => {
    // Update the meal form when props change
    setNewMeal({ name: mealName, calories, protein: "", carbs: "", fat: "" });
  }, [mealName, calories]);

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) return;
    setMeals([...meals, newMeal]);
    setNewMeal({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  };

  const data = {
    labels: meals.map((meal) => meal.name),
    datasets: [
      {
        label: "Calories",
        data: meals.map((meal) => parseInt(meal.calories, 10) || 0),
        backgroundColor: "#ff6384",
      },
      {
        label: "Protein (g)",
        data: meals.map((meal) => parseInt(meal.protein, 10) || 0),
        backgroundColor: "#36a2eb",
      },
      {
        label: "Carbs (g)",
        data: meals.map((meal) => parseInt(meal.carbs, 10) || 0),
        backgroundColor: "#ffce56",
      },
      {
        label: "Fat (g)",
        data: meals.map((meal) => parseInt(meal.fat, 10) || 0),
        backgroundColor: "#4bc0c0",
      },
    ],
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Nutritional Tracker</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input
              type="text"
              placeholder="Meal Name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Calories"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Protein (g)"
              value={newMeal.protein}
              onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={newMeal.carbs}
              onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Fat (g)"
              value={newMeal.fat}
              onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
              className="border p-2"
            />
          </div>
          <Button onClick={handleAddMeal}>Add Meal</Button>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default NutritionTracker;
