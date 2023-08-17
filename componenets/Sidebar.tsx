import Card from "./Card";
import Image from "next/image";
import SidebarLink from "./SidebarLink";


export interface ILink {
    label: string;
    icon: string;
    link: string;
};

const links : ILink[] = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", icon: "User", link: "/profile" }
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {/* <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div> */}
      {links.map((link) => (
        <SidebarLink link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
