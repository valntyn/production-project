import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>
export const HStack = ((props: HStackProps) => {
    const { align = 'start', justify = 'start' } = props;
    return (
        <Flex direction="row" align={align} justify={justify} {...props} />
    );
});
