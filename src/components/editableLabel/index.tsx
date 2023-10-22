import React, {FC, useEffect, useRef, useState} from 'react';
import TextField, {ITextField} from '../textField';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import useHotkey from '../hotkeyManger/useHotkey';
import cx from 'classnames';
import styles from './styles.module.scss';
import HOTKEYS from '../../utils/hotkeys';

export type EditableLabelProps = {
    value: string
    onSetActive?: (inputRef: HTMLElement | null) => void
    onSetInactive?: (text: string) => boolean
} & Omit<ITextField, 'value' | 'label' | 'onClick' | 'ref'>

const EditableLabel: FC<EditableLabelProps> = (
    {
        value,
        onChange,
        onSetActive,
        onSetInactive,
        className,
        disabled,
        ...rest
    }
) => {
    const [text, setText] = useState(value);
    const [editable, setEditable] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const $labelWidth = useRef(0);

    const handleChange = (txt: string) => {
        setText(txt);
        onChange?.(txt);
    };

    const makeActive = () => {
        if (editable || disabled) {
            return;
        }
        setEditable(true);
        setTimeout(() => {
            onSetActive?.(inputRef.current);
            inputRef.current?.focus();
        });
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
    const initRef = (element: HTMLInputElement | HTMLTextAreaElement) => {
        inputRef.current = element;
        
        if (element?.parentElement) {
            element.parentElement.style.setProperty('width', `${$labelWidth.current}px`);
        }
    };
    
    const initWidth = (element: HTMLParagraphElement) => {
        if (element) {
            $labelWidth.current = element.offsetWidth;
        }
    };

    useEffect(() => {
        setText(value);
    }, [value]);

    useOutsideAlerter(makeInactive, inputRef);
    useHotkey(HOTKEYS.FOCUS_LANG.key, makeActive, { block: editable });

    return (
        <div className={cx(styles.editableLabelWrapper, className, { [styles.editable]: editable })}>
            {editable
                ? <TextField
                    onKeyDown={handleKeyDown}
                    className={styles.editableLabelContainer}
                    ref={initRef}
                    value={text}
                    onChange={handleChange}
                    {...rest}
                />
                : <p onClick={makeActive} ref={initWidth}>{text}</p>
            }
        </div>
    );
};

export default EditableLabel;