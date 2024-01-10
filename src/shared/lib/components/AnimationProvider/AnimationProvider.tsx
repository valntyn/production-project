import {
    createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

type SpringT = typeof import('@react-spring/web');
type GetsureT = typeof import('@use-gesture/react');

interface AnimationContextInterface {
    Gesture?: GetsureT;
    Spring?: SpringT;
    isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextInterface>({});

const getAsyncAnimationModule = async () => {
    return Promise.all([
        import('@use-gesture/react'),
        import('@react-spring/web'),
    ]);
};

export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextInterface>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringT>();
    const GestsureRef = useRef<GetsureT>();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModule().then(([Gestsure, Spring]) => {
            GestsureRef.current = Gestsure;
            SpringRef.current = Spring;
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(() => ({
        Gesture: GestsureRef.current,
        Spring: SpringRef.current,
        isLoaded,
    }), [isLoaded]);

    return (
        <AnimationContext.Provider
            value={value}
        >
            {children}
        </AnimationContext.Provider>
    );
};
