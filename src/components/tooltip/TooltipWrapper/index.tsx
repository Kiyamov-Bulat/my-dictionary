import cx from 'classnames';
import React, { FC, HTMLProps, ReactNode, useRef, useState } from 'react';
import styles from './styles.module.scss';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';

export enum ETooltipPosition {
    S = '@tooltip-position/south',
    W = '@tooltip-position/west',
    N = '@tooltip-position/north',
    E = '@tooltip-position/east',
    SE = '@tooltip-position/south-east',
    SW = '@tooltip-position/south-west',
    NE = '@tooltip-position/north-east',
    NW = '@tooltip-position/north-west'
}

const POSITION_CLASSNAMES = {
    [ETooltipPosition.S]: styles.S,
    [ETooltipPosition.N]: styles.N,
    [ETooltipPosition.E]: styles.E,
    [ETooltipPosition.W]: styles.W,
    [ETooltipPosition.SE]: styles.SE,
    [ETooltipPosition.SW]: styles.SW,
    [ETooltipPosition.NE]: styles.NE,
    [ETooltipPosition.NW]: styles.NW
};

export enum ETooltipTrigger {
    HOVER = '@tooltip-trigger/hover',
    CLICK = '@tooltip-trigger/click'
}

export interface TooltipWrapperProps extends HTMLProps<HTMLDivElement> {
    tipContent: ReactNode;
    position?: ETooltipPosition;
    trigger?: ETooltipTrigger;
    tipClassName?: string;
    onClose?: () => void;
    delay?: number;
    closeOnClick?: boolean;
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({
    position = ETooltipPosition.N,
    tipContent,
    tipClassName,
    className,
    children,
    onClose,
    onClick,
    trigger = ETooltipTrigger.HOVER,
    delay = 0,
    closeOnClick = true,
    ...restProps
}) => {
    const enterTimeout = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const triggerIsClick = trigger === ETooltipTrigger.CLICK;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);

        if (triggerIsClick) {
            setIsOpen((prevState) => !prevState);
            return;
        }

        if (closeOnClick) {
            handleMouseLeave();
        }
    };

    const close = () => {
        if (!triggerIsClick) {
            return;
        }
        onClose?.();
        setIsOpen(false);
    };

    const handleMouseEnter = () => {
        enterTimeout.current = window.setTimeout(() => {
            enterTimeout.current = null;
            setIsOpen(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (enterTimeout.current !== null) {
            window.clearTimeout(enterTimeout.current);
        }
        setIsOpen(false);
    };

    useOutsideAlerter(close, containerRef);

    const tipClass = cx(styles.dropdown, tipClassName, POSITION_CLASSNAMES[position], {
        [styles.isOpen]: isOpen,
        [styles.hoverable]: !triggerIsClick
    });

    return (
        <div
            {...restProps}
            onClick={handleClick}
            ref={containerRef}
            className={cx(className, styles.tooltip)}
            onMouseEnter={triggerIsClick ? undefined : handleMouseEnter}
            onMouseLeave={triggerIsClick ? undefined : handleMouseLeave}
        >
            {children}
            <div onMouseEnter={triggerIsClick ? undefined : handleMouseLeave} className={tipClass}>
                {tipContent}
            </div>
        </div>
    );
};

export default TooltipWrapper;
