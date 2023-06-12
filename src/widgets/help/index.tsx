import React, {FC} from 'react';
import TooltipWrapper, {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import styles from './styles.module.scss';
import Button from '../../components/button';

const Help: FC = () => {

    return (
        <TooltipWrapper
            className={styles.helpContainer}
            position={ETooltipPosition.W}
            tipContent={'Помощь'}>
            <Button className={styles.helpBtn} variant={'primary'}>!</Button>
        </TooltipWrapper>
    );
};

export default Help;