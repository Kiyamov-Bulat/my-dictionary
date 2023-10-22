import React, {FC, useState} from 'react';
import EditableLabel from '../../components/editableLabel';
import styles from './styles.module.scss';

type ChangeImageSrcFieldProps = {
    src: string
    onSaveSrc: (src: string) => boolean
};

const PLACEHOLDER = 'Поменять изображение';
const ChangeImageSrcField: FC<ChangeImageSrcFieldProps> = ({ src, onSaveSrc }) => {
    const [state, setState] = useState(PLACEHOLDER);
    const onSetLabelActive = () => {
        setState(src);
    };
    const onSetLabelInActive = (src: string) => {
        setState(PLACEHOLDER);
        return onSaveSrc(src);
    };

    return (
        <EditableLabel
            onSetActive={onSetLabelActive}
            onSetInactive={onSetLabelInActive}
            className={styles.changeImageInput}
            value={state}/>
    );
};

export default ChangeImageSrcField;