import React, {FC, useRef} from 'react';
import TextField, {ITextField} from '../textField';
import TooltipWrapper, {ETooltipPosition} from '../tooltip/TooltipWrapper';
import Button, {IButtonProps} from '../button';
import {PlusIcon} from '../../icons';
import styles from './styles.module.scss';
import useHotkey from '../hotkeyManger/useHotkey';
import cx from 'classnames';
import useEnterHandler from '../../hooks/useEnterHandler';

export type AddFieldProps = {
    onAdd: () => void
    hotkey?: string
    textFieldProps?: Partial<ITextField>
    buttonProps?: Partial<Omit<IButtonProps, 'onClick'>>
}

const AddField: FC<AddFieldProps> = ({ onAdd, textFieldProps, buttonProps, hotkey = '' }) => {
    const textFieldRef = useRef<HTMLInputElement | null>(null);
    const onKeyDown = useEnterHandler(onAdd);

    useHotkey(hotkey, () => textFieldRef.current?.focus(), { keyup: true, block: !hotkey });

    const { className: textFieldClassName, ...restTextFieldProps } = textFieldProps || {};
    const { className: buttonClassName, ...restButtonProps } = buttonProps || {};

    return (
        <div className={styles.addGroupContainer}>
            <TextField
                onKeyDown={onKeyDown}
                ref={textFieldRef}
                className={cx(styles.textField, textFieldClassName)}
                placeholder={'Введите текст'}
                maxLength={1000}
                {...restTextFieldProps}
            />
            <TooltipWrapper tipContent={'Добавить'} position={ETooltipPosition.N} delay={500}>
                <Button
                    className={cx(styles.btn, buttonClassName)}
                    variant={'primary'}
                    onClick={onAdd}
                    {...restButtonProps}
                >
                    <PlusIcon stroke={'white'} width={18} height={18}/>
                </Button>
            </TooltipWrapper>
        </div>
    );
};

export default AddField;