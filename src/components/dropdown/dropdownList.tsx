import cx from 'classnames';
import React, {ReactNode} from 'react';
import {CheckIcon} from '../../icons';
import Portal from '../portal';
import styles from './styles.module.scss';

export type DropdownOption = {
    key: string;
    value: ReactNode;
};

export type DropdownProps = {
    isOpen: boolean;
    selectedOption: string;
    options: DropdownOption[];
    onSelect?: (option: DropdownOption, name?: string) => void;
    name?: string;
    className?: string;
    isIconRight?: boolean;
    isUnder?: boolean;
    usePortal?: boolean;
	container?: HTMLElement;
	id?: string;
};
// eslint-disable-next-line
const DropdownList = React.forwardRef<HTMLUListElement, DropdownProps>(
    (
        {
            isOpen,
            onSelect,
            selectedOption,
            options,
            name,
            isIconRight = true,
            isUnder = true,
            className = '',
            usePortal = false,
            container = document.body,
            id
        },
        ref
    ) => {
        if (!isOpen) {
            return null;
        }

        return (
            <Portal isOn={usePortal} container={container}>
                <ul ref={ref} className={cx(styles.dropdownList, className, { [styles.under]: isUnder })} id={id}>
                    {options.map((option) => (
                        <li
                            className={cx(styles.option, {
                                [styles.selected]: selectedOption === option.key,
                                [styles.isIconRightContainer]: isIconRight
                            })}
                            key={option.key}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect?.(option, name);
                            }}
                        >
                            {selectedOption === option.key && (
                                <CheckIcon
                                    className={cx({
                                        [styles.isIconRight]: isIconRight,
                                        [styles.isIconLeft]: !isIconRight
                                    })}
                                />
                            )}
                            {option.value}
                        </li>
                    ))}
                </ul>
            </Portal>
        );
    }
);

export default DropdownList;
