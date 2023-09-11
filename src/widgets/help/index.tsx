import React, {FC, useState} from 'react';
import TooltipWrapper, {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import styles from './styles.module.scss';
import Button from '../../components/button';
import HelpContent from './helpContent';
import useHotkey from '../../components/hotkeyManger/useHotkey';
import HOTKEYS from '../../utils/hotkeys';
import cx from 'classnames';

const Help: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen((prevState) => !prevState);

    useHotkey(HOTKEYS.OPEN_HELP.key, toggleOpen);
    useHotkey(HOTKEYS.CLOSE.key, toggleOpen, { block: !isOpen });
    return (
        <div className={styles.helpContainer}>
            <TooltipWrapper
                position={ETooltipPosition.S}
                tipContent={'Помощь'}>
                <Button
                    onClick={toggleOpen}
                    className={cx(styles.helpBtn, {[styles.active]: isOpen})}
                    variant={'primary'}>?</Button>
            </TooltipWrapper>
            {isOpen && <HelpContent onClose={toggleOpen}/>}
        </div>
    );
};

export default Help;