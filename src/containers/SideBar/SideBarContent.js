import React from "react";
import CustomScrollbars from "util/CustomScrollbars";
import Navigation from "../../components/Navigation";

const SideBarContent = () => {
  const navigationMenus = [
    {
      name: "sidebar.main",
      type: "section",
      children: [
        {
          name: "sidebar.dashboard",
          icon: "view-dashboard",
          type: "item",
          link: "/app/dashboard/home"
        },
        {
          name: "Contestant",
          icon: "view-web",
          type: "item",
          link: "/app/table/data"
        },
        {
          name: "Vote",
          icon: "view-web",
          type: "item",
          link: "/app/vote/data"
        },
        {
          name: "Payments",
          icon: "view-web",
          type: "item",
          link: "/app/payments/data"
        },
        {
          name: "Settings",
          icon: "settings",
          type: "item",
          link: "/app/pickers"
        }
      ]
    }
  ];

  return (
    <CustomScrollbars className=" scrollbar">
      <Navigation menuItems={navigationMenus} />
    </CustomScrollbars>
  );
};

export default SideBarContent;
