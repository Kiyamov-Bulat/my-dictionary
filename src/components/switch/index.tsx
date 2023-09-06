import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

type SwitchProps = {
    onChange?: ChangeEventHandler<HTMLElement>
    value?: boolean,
    className?: string,
}

const Switch: FC<SwitchProps> = ({ value, className, onChange}) => {
    const [state, setState] = useState(value);

    useEffect(() => setState(value), [value]);

    return (
        <label className={cx(styles.switch, className)}>
            <input onChange={onChange} checked={state} type="checkbox"/>
            <span className={styles.slider}/>
        </label>
    );
};

export default Switch;