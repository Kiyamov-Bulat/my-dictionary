import React, {FC, useEffect, useRef, useState} from 'react';
import TextField, {ITextField} from '../textField';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import useHotkey from '../hotkeyManger/useHotkey';
import cx from 'classnames';
import styles from './styles.module.scss';
import HOTKEYS from '../../utils/hotkeys';

export type EditableLabelProps = {
    value: string
    onSetActive?: () => void
    onSetInactive?: (text: string) => boolean
} & Omit<ITextField, 'value' | 'disabled' | 'label' | 'onClick' | 'ref'>

const EditableLabel: FC<EditableLabelProps> = (
    {
        value,
        onChange,
        onSetActive,
        onSetInactive,
        className,
        ...rest
    }
) => {
    const [text, setText] = useState(value);
    const [editable, setEditable] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const handleChange = (txt: string) => {
        setText(txt);
        onChange?.(txt);
    };

    const makeActive = () => {
        if (editable) {
            return;
        }
        setEditable(true);
        onSetActive?.();
        setTimeout(() => inputRef.current?.focus());
    };
    const makeInactive = () => {
        if (!editable) {
            return;
        }
        setEditable(false);

        if (onSetInactive?.(text)) {
            setText(value);
        }
    };
    
    const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
        if (editable && document.activeElement === e.target && (e.key === 'Enter' || e.key === 'Escape')) {
            makeInactive();
        }
    };

    useEffect(() => {
        setText(value);
    }, [value]);

    useOutsideAlerter(makeInactive, inputRef);
    useHotkey(HOTKEYS.FOCUS_LANG.key, makeActive, { block: editable });

    return (
        <TextField
            onKeyDown={handleKeyDown}
            className={cx(styles.editableLabelContainer, className, { [styles.editable]: editable })}
            ref={inputRef}
            value={text}
            onChange={handleChange}
            disabled={!editable}
            onClick={makeActive}
            {...rest}
        />
    );
};

export default EditableLabel;