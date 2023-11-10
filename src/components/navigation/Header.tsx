import Logo from "@/assets/snel.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 h-20  backdrop-blur-lg z-10 shadow">
      <nav className="flex justify-between items-center p-4">
        <div></div>
        <Link to={"/"}>
          <img src={Logo} alt="" className="w-40 object-contain" />
        </Link>
        <div>
          <Button variant={"secondary"}>Se connecter</Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
