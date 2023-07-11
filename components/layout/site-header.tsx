import { Suspense } from "react"
import Link from "next/link"

import { supabase } from "@/lib/supabase"
import { MainNav } from "@/components/main-nav"

import { Fridge } from "../fridge/fridge"
import { StoreSelectorDialog } from "./store-selector"
import { UserNav } from "./user-nav"

export async function SiteHeader() {
  const { data, error } = await supabase
    .from("market_chain")
    .select("*,market_salepoint(*)")

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/60 shadow-sm backdrop-blur">
      <div className="container flex h-16 items-center">
        <nav className="flex items-center space-x-6 w-full">
          <Link href="/">
            <svg
              width="74"
              height="28"
              viewBox="0 0 74 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.1 22H1.68333V10.7667H0.0666667V8.55L1.75 7.83333V6.38333C1.75 5.26111 1.90556 4.28889 2.21667 3.46667C2.52778 2.64445 2.96111 2.00556 3.51667 1.55C4.08333 1.09444 4.70556 0.766667 5.38333 0.566667C6.07222 0.355556 6.83889 0.25 7.68333 0.25C8.43889 0.25 9.15 0.35 9.81667 0.55C10.4833 0.75 10.9 0.933333 11.0667 1.1L10.4333 3.63333C9.9 3.36667 9.35 3.23333 8.78333 3.23333C8.63889 3.23333 8.50556 3.24444 8.38333 3.26667C7.52778 3.4 7.1 4.12778 7.1 5.45V7.83333H9.25V10.7667H7.1V22ZM16.0583 22H10.675V11.2167L9.675 10.6V8.71667L13.2583 7.83333H14.6083L15.0917 11.8C15.5472 9.07778 17.0083 7.71667 19.475 7.71667C19.7528 7.71667 20.0417 7.76667 20.3417 7.86667L19.775 13.8C19.5417 13.5889 19.0306 13.4833 18.2417 13.4833C17.1083 13.4833 16.3806 13.7833 16.0583 14.3833V22ZM21.6613 22V11.2167L20.6613 10.6V8.81667L24.2447 7.83333H27.028V22H21.6613ZM24.078 6.3L21.3447 3.55V2.96667L24.078 0.233333H24.7113L27.5613 2.96667V3.55L24.7113 6.3H24.078ZM38.644 22L37.994 19.85C37.9051 20.0056 37.7996 20.1611 37.6773 20.3167C37.5662 20.4722 37.3829 20.6722 37.1273 20.9167C36.8718 21.15 36.5996 21.3556 36.3107 21.5333C36.0218 21.7111 35.6607 21.8667 35.2273 22C34.794 22.1333 34.3385 22.2 33.8607 22.2C32.0273 22.2 30.6829 21.5722 29.8273 20.3167C28.9718 19.0611 28.544 17.3167 28.544 15.0833C28.544 13.6833 28.744 12.4389 29.144 11.35C29.544 10.25 30.1718 9.36667 31.0273 8.7C31.8829 8.03333 32.9162 7.7 34.1273 7.7C34.8496 7.7 35.494 7.77778 36.0607 7.93333C36.6273 8.08889 37.1162 8.27778 37.5273 8.5V3.45L35.694 2.83333V1L41.594 0.166667H42.894V22H38.644ZM36.294 18.9333C36.494 18.9333 36.6996 18.9 36.9107 18.8333C37.1218 18.7556 37.3273 18.65 37.5273 18.5167V10.1333C37.1829 10.0556 36.8662 10.0167 36.5773 10.0167C35.0996 10.0278 34.3551 11.1667 34.344 13.4333V15.7667C34.344 16.8111 34.5273 17.6 34.894 18.1333C35.2607 18.6667 35.7273 18.9333 36.294 18.9333ZM51.5643 27.8833C50.6977 27.8833 49.7199 27.6833 48.631 27.2833C47.5421 26.8944 46.8365 26.5222 46.5143 26.1667L47.5643 23.8833C47.8421 24.0944 48.2921 24.2889 48.9143 24.4667C49.5365 24.6444 50.0699 24.7333 50.5143 24.7333C50.9588 24.7333 51.3421 24.6722 51.6643 24.55C51.9977 24.4389 52.2532 24.2944 52.431 24.1167C52.6088 23.95 52.7532 23.7389 52.8643 23.4833C52.9754 23.2389 53.0421 23.0167 53.0643 22.8167C53.0977 22.6167 53.1199 22.3944 53.131 22.15V20.7333C52.1865 21.7111 51.0365 22.2 49.681 22.2C47.8477 22.2 46.5032 21.5722 45.6477 20.3167C44.7921 19.0611 44.3643 17.3167 44.3643 15.0833C44.3643 14.0389 44.481 13.0778 44.7143 12.2C44.9477 11.3111 45.2865 10.5333 45.731 9.86667C46.1865 9.18889 46.7754 8.66111 47.4977 8.28333C48.2199 7.89445 49.0365 7.7 49.9477 7.7C51.3254 7.7 52.5199 8.00556 53.531 8.61667L53.8143 7.83333H56.3643L59.4977 7.98333V9.55L58.4977 10.25V21.3833C58.4977 25.7167 56.1865 27.8833 51.5643 27.8833ZM52.0977 19.1667C52.431 19.1667 52.7754 19.0722 53.131 18.8833V10.1C52.8643 10.0444 52.6199 10.0167 52.3977 10.0167C50.9199 10.0278 50.1754 11.1667 50.1643 13.4333V16.0167C50.1643 16.7278 50.2588 17.3389 50.4477 17.85C50.781 18.7278 51.331 19.1667 52.0977 19.1667ZM68.3048 13.3833C68.3048 11.9722 68.2326 10.9722 68.0882 10.3833C67.9437 9.79444 67.677 9.5 67.2882 9.5C66.9548 9.5 66.6826 9.56111 66.4715 9.68333C66.2604 9.79444 66.1048 9.97778 66.0048 10.2333C65.9048 10.4778 65.8382 10.7333 65.8048 11C65.7826 11.2556 65.7715 11.5833 65.7715 11.9833V13.3833H68.3048ZM66.9715 22.35C65.727 22.35 64.6437 22.1611 63.7215 21.7833C62.8104 21.4056 62.0882 20.8778 61.5548 20.2C61.0326 19.5222 60.6493 18.7611 60.4048 17.9167C60.1604 17.0611 60.0382 16.1111 60.0382 15.0667C60.0382 12.5778 60.6715 10.6944 61.9382 9.41667C63.2048 8.13889 64.977 7.5 67.2548 7.5C69.4437 7.5 71.0104 8.01667 71.9548 9.05C72.8993 10.0722 73.3715 11.7222 73.3715 14V15.85H65.7548V16.1667C65.7548 16.8222 65.8215 17.3611 65.9548 17.7833C66.0993 18.2056 66.3048 18.5167 66.5715 18.7167C66.8382 18.9167 67.1104 19.05 67.3882 19.1167C67.6659 19.1833 68.0048 19.2167 68.4048 19.2167C68.7937 19.2167 69.2104 19.1667 69.6548 19.0667C70.1104 18.9667 70.5659 18.8111 71.0215 18.6C71.4882 18.3889 71.877 18.1389 72.1882 17.85L73.1715 19.5333C72.7604 20.2 72.1548 20.7611 71.3548 21.2167C70.5659 21.6611 69.8048 21.9611 69.0715 22.1167C68.3382 22.2722 67.6382 22.35 66.9715 22.35Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          {data && <StoreSelectorDialog market_chains={data} />}
          <MainNav />
        </nav>

        <UserNav
          Buttons={
            <Suspense>
              <Fridge />
            </Suspense>
          }
        />
      </div>
    </header>
  )
}