import {
  ArrowRight,
  Beef,
  Carrot,
  Check,
  Drumstick,
  Fish,
  LucideProps,
  PiggyBank,
  PlusCircle,
  Refrigerator,
  Search,
  Waves,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons: Record<string, Icon> = {
  logo: Refrigerator,
  close: X,
  veggie: Carrot,
  poultry: Drumstick,
  beef: Beef,
  porc: PiggyBank,
  seafood: Waves,
  fish: Fish,
  search: Search,
  add: PlusCircle,
  right: ArrowRight,
  check: Check,
}
