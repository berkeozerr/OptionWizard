import CreateOption from "./Views/CreateOption";
import ListOptions  from "./Views/ListOptions";
import MyOptions from "./Views/MyOptions"
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
    path: "/myOptions",
    name: "My Options",
    icon: "ni ni-key-25 text-info",
    component: MyOptions,
    layout: "/admin",
    visible: true,
    children: [],
  }
  
];
export default routes;
