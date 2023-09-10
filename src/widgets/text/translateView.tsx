import React, {FC} from 'react';
import Button from '../../components/button';
import styles from './styles.module.scss';

type TranslateViewProps = {
    text: string
    onBack: () => void
};

const TranslateView: FC<TranslateViewProps> = ({ text, onBack }) => {

    return (
        <div className={styles.container}>
            <Button variant={'primary'} onClick={onBack}>
                Вернутся
            </Button>
        </div>
    );
};

export default TranslateView;