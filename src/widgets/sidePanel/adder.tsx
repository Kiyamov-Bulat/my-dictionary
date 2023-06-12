import React, {FC, useState} from 'react';
import TooltipWrapper, {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import Button from '../../components/button';
import Translate from '../translate';
import {SwapIcon} from '../../icons';
import AddGroup from '../addGroup';
import styles from './styles.module.scss';

const Adder: FC = () => {
    const [showTranslateWidget, setShowTranslateWidget] = useState(true);

    return (
        <div className={styles.adderContainer}>
            <TooltipWrapper
                className={styles.changeAdder}
                position={ETooltipPosition.SE}
                tipContent={showTranslateWidget ? 'Виджет группы' : 'Перевод'}
            >
                <Button
                    variant='ghost'
                    onClick={() => setShowTranslateWidget((prev) => !prev)}
                >
                    <SwapIcon width={12} height={12}/>
                </Button>
            </TooltipWrapper>
            {showTranslateWidget ? <Translate/> : <AddGroup/>}
        </div>
    );
};

export default Adder;