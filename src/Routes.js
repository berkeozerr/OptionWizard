import CreateOption from "./Views/CreateOption";
import ListOptions  from "./Views/ListOptions";

var routes = [
  


  {
    path: "/createoption",
    name: "Create Option",
    icon: "ni ni-key-25 text-info",
    component: CreateOption,
    layout: "/admin",
    visible: true,
    children: [],
  },
  {
    path: "/listoptions",
    name: "List Options",
    icon: "ni ni-key-25 text-info",
    component: ListOptions,
    layout: "/admin",
    visible: true,
    children: [],
  },
  {
    path: "/createoption",
    name: "My Options",
    icon: "ni ni-key-25 text-info",
    component: CreateOption,
    layout: "/admin",
    visible: true,
    children: [],
  }
  
];
export default routes;
