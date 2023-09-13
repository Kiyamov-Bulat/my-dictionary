import React, {FC, useState} from 'react';
import TooltipWrapper, {ETooltipPosition} from '../../components/tooltip/TooltipWrapper';
import styles from './styles.module.scss';
import Button from '../../components/button';
import HelpContent from './helpContent';
import useHotkey from '../../components/hotkeyManger/useHotkey';
import HOTKEYS from '../../utils/hotkeys';
import cx from 'classnames';
import useModalState from '../../hooks/useModalState';
import useCloseHotkey from '../../hooks/useCloseHotkey';

const Help: FC = () => {
    const { toggle: toggleOpen, isOpen } = useModalState(false);

    useHotkey(HOTKEYS.OPEN_HELP.key, toggleOpen);
    useCloseHotkey(toggleOpen, isOpen);
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