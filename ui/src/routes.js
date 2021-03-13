import PhotoDetailStrapi from "./PhotoDetailStrapi.jsx";
import LocationDetailStrapi from "./LocationDetailStrapi.jsx";
import PhotoAddStrapi from "./PhotoAddStrapi.jsx";
import PhotoAddToLocation from "./PhotoAddToLocation.jsx";
import Home from "./Home.jsx";
import NotFound from "./NotFound.jsx";
import BlogPost from "./BlogPost.jsx";
import RegisterForm from "./RegisterHooks.jsx";
import Login from "./LoginHooks.jsx";
import Logout from "./Logout.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import Profile from "./Profile.jsx";
import FBConnect from "./FBConnect.jsx";
import ProfileEdit from "./ProfileEdit.jsx";
import LocationsPerCategorie from "./components/CategorySearch/LocationsPerCategorie.jsx";
import Results from "./components/Results/Results.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Notifications from "./components/notificationCenter/notifications.jsx";

const routes = [
  { path: "/aanmelden", component: RegisterForm, exact: true },
  { path: "/berichten", component: Notifications, exact: true },
  { path: "/inloggen", component: Login, exact: true },
  { path: "/uitloggen", component: Logout, exact: true },
  { path: "/wachtwoord-vergeten", component: ForgotPassword, exact: true },
  { path: "/foto/toevoegen", component: PhotoAddStrapi, exact: true },
  { path: "/foto/toevoegen/:id", component: PhotoAddToLocation, exact: true },
  { path: "/fotograaf/:slug", component: Profile, exact: true },
  { path: "/foto/:id", component: PhotoDetailStrapi, exact: true },
  { path: "/fotolocatie/:id", component: LocationDetailStrapi, exact: true },
  {
    path: "/fotolocaties/categorie/:value",
    component: LocationsPerCategorie,
    exact: true,
  },
  {
    path: "/fotolocaties/resultaten",
    component: Results,
    exact: true,
  },
  //{ path: "/fotos", component: PhotoListStrapi },
  { path: "/connect/facebook", component: FBConnect },
  //{ path: "/bewerken/:id", component: PhotoEdit, exact: true },
  { path: "/profiel/bewerken/:slug", component: ProfileEdit },
  //{ path: "/report", component: PhotoReport },
  //{ path: "/about", component: About },
  { path: "/", component: Home, exact: true },
  { path: "/dashboard", component: Dashboard, exact: true },
  { path: "/niet-gevonden", component: NotFound, exact: true },
  { path: "/*", component: BlogPost },
];

export default routes;
