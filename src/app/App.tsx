import './styles/index.scss';
import {classNames} from 'shared/lib/classNames/classNames';
import {AppRouter} from './providers/ThemeProvider/routes';
import {Navbar} from 'widgets/Navbar';
import {useTheme} from './providers/ThemeProvider';
import {Sidebar} from 'widgets/Navbar/Sidebar';

const App = () => {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <div className='content-page'>
                <Sidebar />
                <AppRouter />
            </div>
        </div>
    );
};

export default App;
