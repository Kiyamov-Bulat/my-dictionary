import React, {FC} from 'react';
import TooltipWrapper, {ETooltipPosition, TooltipWrapperProps} from '../tooltip/TooltipWrapper';
import Button from './index';
import {IconProps} from '../../icons';
import {useDispatch} from 'react-redux';

interface ButtonWithTooltipProps extends Omit<TooltipWrapperProps, 'action'> {
    action: () => any
    Icon?: FC<IconProps>
    disp?: boolean
    children?: React.ReactNode
}

const ButtonWithTooltip: FC<ButtonWithTooltipProps> = (
    {
        tipContent,
        action,
        Icon,
        disp = false,
        children,
        ...props
    }) => {
    const dispatch = useDispatch();
    const onClick = disp ? () => dispatch(action()) : action;

    return (
        <TooltipWrapper tipContent={tipContent} position={ETooltipPosition.NE} delay={500} {...props}>
            <Button onClick={onClick} variant={'primary'}>
                {Icon && <Icon width={20} height={20} stroke={'white'} fill={'white'}/>}
                {children}
            </Button>
        </TooltipWrapper>
    );
};

export default ButtonWithTooltip;