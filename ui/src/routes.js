import PhotoListStrapi from './PhotoListStrapi.jsx';
import PhotoReport from './PhotoReport.jsx';
import PhotoEdit from './PhotoEdit.jsx';
import PhotoDetailStrapi from './PhotoDetailStrapi.jsx';
import LocationDetailStrapi from './LocationDetailStrapi.jsx';
import PhotoAddStrapi from './PhotoAddStrapi.jsx';
import PhotoAddToLocation from './PhotoAddToLocation.jsx';
import About from './About.jsx';
import NotFound from "./NotFound.jsx";
import BlogPost from "./BlogPost.jsx";
import RegisterForm from './Register.jsx';
import LoginForm from './Login.jsx';

const routes = [
    { path: '/aanmelden', component: RegisterForm, exact: true },
    { path: '/inloggen', component: LoginForm, exact: true },
    { path: '/foto/toevoegen', component: PhotoAddStrapi, exact: true },
    { path: '/foto/toevoegen/:id', component: PhotoAddToLocation, exact: true },
    { path: '/foto/:id', component: PhotoDetailStrapi, strict: true },
    { path: '/fotolocatie/:id', component: LocationDetailStrapi, strict: true },
    { path: '/fotos', component: PhotoListStrapi },
    { path: '/bewerken/:id', component: PhotoEdit },
    { path: '/report', component: PhotoReport },
    { path: '/about', component: About },
    { path: '/niet-gevonden', component: NotFound, exact: true },
    { path: '/*', component: BlogPost },
]

export default routes;