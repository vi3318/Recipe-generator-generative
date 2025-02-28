"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ChefHat, Utensils } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import RecipeCard from "@/components/recipe-card"
import RecipeSkeleton from "@/components/recipe-skeleton"

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("")
  const [recipe, setRecipe] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setTheme, theme } = useTheme()

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate recipe")
      }

      const data = await response.json()
      setRecipe(data)
    } catch (err) {
      setError("Failed to generate recipe. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateRecipe()
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="overflow-hidden border-2 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">What's in your kitchen?</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme-mode" className="text-sm">
                {theme === "dark" ? "Dark" : "Light"} Mode
              </Label>
              <Switch
                id="theme-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="ingredients" className="text-base font-medium">
                Enter your ingredients (separated by commas)
              </Label>
              <Textarea
                id="ingredients"
                placeholder="e.g., chicken, rice, onions, garlic, olive oil"
                className="mt-1.5 min-h-[100px] text-base transition-all duration-200 focus-visible:ring-primary"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
            </div>

            <Button
              onClick={generateRecipe}
              className="w-full gap-2 text-base font-medium transition-all duration-300 hover:scale-[1.02]"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Recipe...
                </>
              ) : (
                <>
                  <Utensils className="h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? <RecipeSkeleton /> : recipe ? <RecipeCard recipe={recipe} /> : null}
    </div>
  )
}

