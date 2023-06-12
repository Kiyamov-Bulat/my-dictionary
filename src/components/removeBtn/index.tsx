import React, {FC} from 'react';
import Button, {IButtonProps} from '../button';
import {TrashIcon} from '../../icons';
import TooltipWrapper, {ETooltipPosition, ETooltipTrigger} from '../tooltip/TooltipWrapper';
import styles from './styles.module.scss';
import cx from 'classnames';

const RemoveBtn: FC<Omit<IButtonProps, 'variant'>> = ({ className, ...props}) => {

    return (
        <TooltipWrapper
            className={cx(styles.rmBtn, className)}
            tipContent={'Удалить'}
            delay={500}
        >
            <Button variant={'primary'} {...props}>
                <TrashIcon stroke={'white'}/>
            </Button>
        </TooltipWrapper>
    );
};

export default RemoveBtn;