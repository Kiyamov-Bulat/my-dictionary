import React, {FC} from 'react';
import TooltipWrapper, {ETooltipPosition, TooltipWrapperProps} from '../tooltip/TooltipWrapper';
import Button, {IButtonProps} from './index';
import {IconProps} from '../../icons';
import {useDispatch} from 'react-redux';

interface ButtonWithTooltipProps extends Omit<TooltipWrapperProps, 'action'> {
    action: (e?: React.MouseEvent) => any
    Icon?: FC<IconProps>
    disp?: boolean
    variant?: IButtonProps['variant'],
    children?: React.ReactNode
}

const ButtonWithTooltip: FC<ButtonWithTooltipProps> = (
    {
        tipContent,
        action,
        Icon,
        disp = false,
        variant,
        children,
        ...props
    }) => {
    const dispatch = useDispatch();
    const onClick = disp ? () => dispatch(action()) : action;

    return (
        <TooltipWrapper tipContent={tipContent} position={ETooltipPosition.NE} delay={500} {...props}>
            <Button onClick={onClick} variant={variant}>
                {Icon && <Icon width={20} height={20} stroke={'white'} fill={'white'}/>}
                {children}
            </Button>
        </TooltipWrapper>
    );
};

export default ButtonWithTooltip;