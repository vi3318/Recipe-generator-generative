import RecipeGenerator from "@/components/recipe-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 px-4 py-8 md:px-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Vidarsh <span className="text-primary">Recipe</span><span className="mb-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">Generator</span>
          </h1>
          <p className="text-muted-foreground md:text-lg">
            Enter your ingredients and let AI create the perfect recipe for you
          </p>
        </div>
        <RecipeGenerator />
      </div>
    </main>
  )
}

