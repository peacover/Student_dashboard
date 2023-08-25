import SidebarLink from "./SidebarLink";


export interface ILink {
    label: string;
    icon: string;
    link: string;
};

const links : ILink[] = [
  { label: "Home", icon: "Grid", link: "/home" },
  { label: "Profile", icon: "User", link: "/profile" }
];

const Sidebar = () => {
  return (
    <>
      {links.map((link) => (
        <SidebarLink link={link} />
      ))}
    </>
  );
};

export default Sidebar;
