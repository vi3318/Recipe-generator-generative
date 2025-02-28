import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, Utensils, Heart } from "lucide-react"


interface RecipeCardProps {
  recipe: {
    title: string
    image: string
    description: string
    ingredients: string[]
    instructions: string[]
    nutritionalInfo: {
      calories: string
      protein: string
      carbs: string
      fat: string
    }
    prepTime: string
    cookTime: string
    servings: number
  }
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden border-2 shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in">
      <CardHeader className="bg-primary/10 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold md:text-3xl">{recipe.title}</CardTitle>
          <Heart className="h-6 w-6 cursor-pointer text-muted-foreground transition-colors hover:text-red-500" />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <Clock className="h-3.5 w-3.5" />
            Prep: {recipe.prepTime}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <Utensils className="h-3.5 w-3.5" />
            Cook: {recipe.cookTime}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <ChefHat className="h-3.5 w-3.5" />
            Servings: {recipe.servings}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
      {/* <div className="relative h-64 w-full">
  <Image 
    src={recipe.image || "/placeholder.svg"} 
    alt={recipe.title} 
    fill 
    className="object-cover" 
  />
</div> */}


        <Tabs defaultValue="description" className="p-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Overview</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4 space-y-4">
            <p className="text-muted-foreground">{recipe.description}</p>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-4">
            <ul className="ml-6 list-disc space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-base">
                  {ingredient}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="instructions" className="mt-4">
            <ol className="ml-6 list-decimal space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-base">
                  {instruction}
                </li>
              ))}
            </ol>
          </TabsContent>
          <TabsContent value="nutrition" className="mt-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-muted p-3 text-center">
                <p className="text-sm font-medium text-muted-foreground">Calories</p>
                <p className="text-xl font-bold">{recipe.nutritionalInfo.calories}</p>
              </div>
              <div className="rounded-lg bg-muted p-3 text-center">
                <p className="text-sm font-medium text-muted-foreground">Protein</p>
                <p className="text-xl font-bold">{recipe.nutritionalInfo.protein}</p>
              </div>
              <div className="rounded-lg bg-muted p-3 text-center">
                <p className="text-sm font-medium text-muted-foreground">Carbs</p>
                <p className="text-xl font-bold">{recipe.nutritionalInfo.carbs}</p>
              </div>
              <div className="rounded-lg bg-muted p-3 text-center">
                <p className="text-sm font-medium text-muted-foreground">Fat</p>
                <p className="text-xl font-bold">{recipe.nutritionalInfo.fat}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

