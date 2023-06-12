import {v4 as uuidv4} from 'uuid';
import React, {FC, HTMLProps, useRef} from 'react';
import cx from 'classnames';


type BaseSelectableProps = Omit<HTMLProps<HTMLDivElement>, 'onSelect' | 'onMouseUp' | 'onMouseDown'>;

export interface SelectableProps extends BaseSelectableProps {
    selected: boolean
    onSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => void
    name?: string
    downDuration?: number
    selectedClassName?: string
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, selected: boolean, name: string) => void
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => void
}

const Selectable: FC<SelectableProps> = (
    {
        onSelect,
        selected,
        name = uuidv4(),
        downDuration = 500,
        selectedClassName,
        ...props
    }) => {
    const holdTimeoutId = useRef<null | number>(null);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.onMouseDown?.(e, name);

        holdTimeoutId.current = window.setTimeout(() => {
            onSelect(e, name);
            holdTimeoutId.current = null;
        }, downDuration);
    };
    const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.onMouseUp?.(e, !holdTimeoutId.current, name);

        if (holdTimeoutId.current) {
            window.clearTimeout(holdTimeoutId.current);
        }
    };
    
    return (
        <div {...props}
             className={cx(props.className, selectedClassName && {[selectedClassName]: selected })}
             onMouseDown={onMouseDown}
             onMouseUp={onMouseUp}>
        </div>
    );
};

export default Selectable;