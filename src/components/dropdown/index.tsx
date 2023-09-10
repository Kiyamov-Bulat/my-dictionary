import cx from 'classnames';
import React, {memo, useCallback} from 'react';
import DropdownList, {DropdownOption} from './dropdownList';
import styles from './styles.module.scss';
import {ArrowDownIcon} from '../../icons';

export type DropdownProps = {
    selectedOption: string;
    options: DropdownOption[];
    onClick?: () => void;
    onSelect?: (option: DropdownOption, name?: string) => void;
    name?: string;
    className?: string;
    btnSize?: number;
    btnColor?: string;
    isOpen?: boolean;
    children?: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({
    onSelect,
    selectedOption,
    options,
    name,
    className,
    btnSize = 32,
    btnColor = 'black',
    isOpen = false,
    onClick,
    children
}) => {
    const handleSelect = useCallback(
        (option: DropdownOption, selectedName?: string) => {
            onSelect?.(option, selectedName);
        },
        [onSelect]
    );
    
    return (
        <div className={cx(className, styles.dropdown, { [styles.open]: isOpen })}>
            <div onClick={onClick} className={styles.topField}>
                {children}
                <button className={styles.btn}>
                    <ArrowDownIcon width={btnSize} height={btnSize} color={btnColor} />
                </button>
            </div>
            <DropdownList
                isOpen={isOpen}
                name={name}
                selectedOption={selectedOption}
                options={options}
                onSelect={handleSelect}
            />
        </div>
    );
};

export default memo(Dropdown);
