import React, {FC, useState} from 'react';
import TooltipWrapper, {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import styles from './styles.module.scss';
import Button from '../../components/button';
import HelpContent from './helpContent';
import useHotkey from '../../components/hotkeyManger/useHotkey';
import HOTKEYS from '../../utils/hotkeys';

const Help: FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => setIsOpen((prevState) => !prevState);
    
    useHotkey(HOTKEYS.OPEN_HELP.key, toggleOpen);

    return (
        <div className={styles.helpContainer}>
            <TooltipWrapper
                position={ETooltipPosition.S}
                tipContent={'Помощь'}>
                <Button className={styles.helpBtn} variant={'primary'}>?</Button>
            </TooltipWrapper>
            {isOpen && <HelpContent/>}
        </div>
    );
};

export default Help;