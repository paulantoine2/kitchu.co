import CategoryNav from "@/components/category-nav"
import Search from "@/components/layout/search"

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container pt-4">
      <Search />
      <CategoryNav />
      {children}
    </div>
  )
}
