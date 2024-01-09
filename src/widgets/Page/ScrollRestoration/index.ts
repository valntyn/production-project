import {
    ScrollRestorationScheme,
} from 'widgets/Page/ScrollRestoration/model/types/ScrollRestorationScheme';
import {
    getScrollRestorationByPath,
} from 'widgets/Page/ScrollRestoration/model/selectors/scrollRestorationSelectors';
import {
    scrollRestorationActions,
    scrollRestorationReducer,
} from 'widgets/Page/ScrollRestoration/model/slices/ScrollRestorationSlice';

export {
    getScrollRestorationByPath,
    scrollRestorationReducer,
    scrollRestorationActions,
};
export type { ScrollRestorationScheme };
