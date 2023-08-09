import './styles/index.scss';
import {classNames} from 'shared/lib/classNames/classNames';
import {AppRouter} from './providers/ThemeProvider/routes';
import {Navbar} from 'widgets/Navbar';
import {useTheme} from './providers/ThemeProvider';

const App = () => {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <AppRouter />
        </div>
    );
};

export default App;
