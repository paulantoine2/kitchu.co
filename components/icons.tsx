import {
  Apple,
  ArrowLeftRight,
  ArrowRight,
  Beef,
  Carrot,
  Check,
  CheckCircle2,
  ChevronDown,
  Delete,
  Drumstick,
  Facebook,
  Fish,
  Info,
  Loader2,
  LucideProps,
  Minus,
  PiggyBank,
  Plus,
  PlusCircle,
  Refrigerator,
  Search,
  ShoppingCart,
  Trash,
  User,
  Waves,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons: Record<string, Icon> = {
  fridge: Refrigerator,
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
  switch: ArrowLeftRight,
  chedown: ChevronDown,
  user: User,
  spinner: Loader2,
  cart: ShoppingCart,
  plus: Plus,
  minus: Minus,
  trash: Trash,
  info: Info,
  apple: (props: LucideProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18.5209 8.13681C18.4141 8.21782 16.5273 9.25653 16.5273 11.5662C16.5273 14.2376 18.9281 15.1827 19 15.2061C18.9889 15.2637 18.6186 16.5004 17.7342 17.7606C16.9456 18.8695 16.122 19.9766 14.8691 19.9766C13.6161 19.9766 13.2937 19.2655 11.8473 19.2655C10.4378 19.2655 9.93662 20 8.79057 20C7.64452 20 6.84486 18.9739 5.92544 17.7138C4.86046 16.234 4 13.9352 4 11.7534C4 8.25383 6.32895 6.39784 8.62105 6.39784C9.83896 6.39784 10.8542 7.17912 11.6188 7.17912C12.3466 7.17912 13.4816 6.35103 14.8672 6.35103C15.3923 6.35103 17.2791 6.39784 18.5209 8.13681ZM14.2094 4.86949C14.7825 4.20522 15.1878 3.28353 15.1878 2.36184C15.1878 2.23402 15.1768 2.10441 15.1528 2C14.2205 2.0342 13.1113 2.60666 12.4425 3.36454C11.9173 3.94779 11.4272 4.86949 11.4272 5.80378C11.4272 5.94419 11.4512 6.08461 11.4622 6.12961C11.5212 6.14041 11.617 6.15302 11.7128 6.15302C12.5493 6.15302 13.6014 5.60576 14.2094 4.86949Z"
        fill="black"
      />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12.1836 10.3636V13.8491H17.1261C16.9091 14.97 16.2578 15.9192 15.281 16.5573L18.2615 18.8237C19.9981 17.2529 21 14.9455 21 12.2046C21 11.5664 20.9416 10.9527 20.833 10.3637L12.1836 10.3636Z"
        fill="#4285F4"
      />
      <path
        d="M7.03675 13.713L6.36452 14.2173L3.98505 16.0337C5.49619 18.971 8.59341 21.0001 12.1834 21.0001C14.663 21.0001 16.7418 20.1983 18.2613 18.8237L15.2808 16.5573C14.4626 17.0973 13.419 17.4246 12.1834 17.4246C9.79563 17.4246 7.76691 15.8455 7.0405 13.7182L7.03675 13.713Z"
        fill="#34A853"
      />
      <path
        d="M3.9851 7.96632C3.35897 9.17719 3 10.5436 3 11.9999C3 13.4563 3.35897 14.8227 3.9851 16.0336C3.9851 16.0417 7.04085 13.7099 7.04085 13.7099C6.85717 13.1699 6.74861 12.5972 6.74861 11.9999C6.74861 11.4025 6.85717 10.8298 7.04085 10.2898L3.9851 7.96632Z"
        fill="#FBBC05"
      />
      <path
        d="M12.1836 6.58356C13.5361 6.58356 14.7384 7.04174 15.6985 7.9254L18.3283 5.34813C16.7337 3.89177 14.6632 2.99989 12.1836 2.99989C8.59359 2.99989 5.49619 5.02082 3.98505 7.96632L7.0407 10.29C7.76701 8.16266 9.79582 6.58356 12.1836 6.58356Z"
        fill="#EA4335"
      />
    </svg>
  ),
  facebook: (props: LucideProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20.0081 21C20.56 21 21 20.553 21 20.0082V3.99185C21 3.44005 20.553 3 20.0081 3H3.99185C3.44703 3 3 3.44703 3 3.99185V20.0082C3 20.56 3.44703 21 3.99185 21H20.0081Z"
        fill="#157DC3"
      />
      <path
        d="M15.1901 21V14.1581H17.5493L17.9014 11.4913H15.1901V9.79113C15.1901 9.01645 15.4085 8.49543 16.5493 8.49543H18V6.10283C17.7465 6.06856 16.8873 6 15.8873 6C13.7958 6 12.3662 7.24086 12.3662 9.52377V11.4913H10V14.1581H12.3662V21H15.1901Z"
        fill="white"
      />
    </svg>
  ),
  carrefour: (props: LucideProps) => (
    <svg width="101" height="100" viewBox="0 0 101 100" {...props}>
      <path
        d="M29.5893 19.0847L2.23843 45.5446C0.87241 46.7045 0 48.0666 0 50.0155C0 51.9556 0.873391 53.3226 2.23843 54.4914L29.5893 80.9424C29.765 81.122 29.9347 81.1936 30.079 81.1936C30.3381 81.1936 30.5167 80.9581 30.5088 80.6814C30.501 80.5185 30.4303 80.331 30.2684 80.1691C23.8485 72.1928 19.1773 63.0448 19.1773 50.1117C19.1773 37.1708 23.8485 27.8432 30.2684 19.861C30.4303 19.701 30.501 19.5165 30.5088 19.3497C30.5177 19.0671 30.3381 18.8384 30.079 18.8384C29.9347 18.8355 29.765 18.9061 29.5893 19.0847Z"
        fill="#ED1C24"
      />
      <path
        d="M50.6164 16.8443C39.9071 16.8443 35.7227 32.0207 35.7227 50.1098C35.7227 68.2046 39.9071 83.1789 50.6164 83.1789C57.0432 83.1789 62.521 79.4154 62.5387 76.3223C62.5416 75.6451 62.2806 74.9965 61.7124 74.4303C58.6663 71.4872 57.475 68.5462 57.4662 65.9505C57.4465 60.9957 61.7448 57.3049 65.7074 57.3049C71.1548 57.3049 74.3678 61.5865 74.3678 67.1311C74.3678 72.3851 72.1293 76.7609 69.6936 80.2653C69.5975 80.4086 69.5543 80.5685 69.5543 80.7089C69.5562 80.9836 69.7182 81.2093 69.9606 81.2093C70.1078 81.2093 70.2805 81.1308 70.4689 80.9414L97.8266 54.4904C99.1927 53.3227 100.065 51.9547 100.065 50.0146C100.065 48.0666 99.1917 46.7035 97.8266 45.5436L70.4689 19.0838C70.2815 18.8963 70.1087 18.8168 69.9606 18.8168C69.7162 18.8168 69.5563 19.0445 69.5543 19.3203C69.5543 19.4616 69.5975 19.6196 69.6936 19.7648C72.1283 23.2643 74.3678 27.645 74.3678 32.8951C74.3678 38.4358 71.1548 42.7213 65.7074 42.7213C61.7448 42.7213 57.4465 39.0334 57.4662 34.0776C57.475 31.482 58.6663 28.538 61.7124 25.5979C62.2806 25.0287 62.5416 24.3859 62.5387 23.7078C62.521 20.6097 57.0432 16.8443 50.6164 16.8443Z"
        fill="#005BAB"
      />
    </svg>
  ),
  mockmarket: (props: LucideProps) => <Carrot color="orange" {...props} />,
}

export const MarketChainIcons: Record<number, Icon> = {
  1: Icons.carrefour,
  2: Icons.carrefour,
}
