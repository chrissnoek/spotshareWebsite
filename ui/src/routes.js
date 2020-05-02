import PhotoList from './PhotoList.jsx';
import PhotoReport from './PhotoReport.jsx';
import PhotoEdit from './PhotoEdit.jsx';
import PhotoDetail from './PhotoDetail.jsx';
import PhotoAdd from './PhotoAdd.jsx';
import About from './About.jsx';
import NotFound from "./NotFound.jsx";

const routes = [
    { path: '/photos/add', component: PhotoAdd, exact: true },
    { path: '/photos/:id', component: PhotoDetail },
    { path: '/photos', component: PhotoList },
    { path: '/edit/:id', component: PhotoEdit },
    { path: '/report', component: PhotoReport },
    { path: '/about', component: About },
    { path: '*', component: NotFound }
]

export default routes;