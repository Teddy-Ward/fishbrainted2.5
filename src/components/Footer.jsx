import ThemeSwitch from "./ThemeSwitch";

export default function Footer() {
  return (
    <>
    <div className="fixed r-0">
      <ThemeSwitch />
    </div>
    
    <div className="footer w-full flex mx-auto">

      <div className="mr-auto text-xs pb-2">
      &copy; TEDWARD.NET 2023
      </div>
     
    </div>

    </>
    
  )
}