import React, {FC} from 'react';
import Modal from '../../components/modal';
import TranslationUnitCard from '../translationUnitCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectOpenedUnit} from '../../store/selectors/dictionary';
import {TranslationUnit} from '../../models/types';
import {closeUnit} from '../../store/slices/dictionary';
import styles from './styles.module.scss';
import {formatTimestamp} from '../../utils/formatDate';

const TranslationUnitModal: FC = () => {
    const dispatch = useDispatch();
    const openedUnit = useSelector(selectOpenedUnit) as TranslationUnit;
    const close = () => dispatch(closeUnit());

    return (
        <Modal isOpen={!!openedUnit} title={'Карточка'} onClose={close} className={styles.modalWrapper}>
            <TranslationUnitCard className={styles.unitCard} unit={openedUnit}>
                <p className={styles.dates}>
                    <span>
                        <span className={styles.dateLabel}>createdAt: </span>
                        {formatTimestamp(openedUnit?.createdAt || 0)}
                    </span>
                    <span>
                        <span className={styles.dateLabel}>updatedAt: </span>
                        {formatTimestamp(openedUnit?.updatedAt || 0)}
                    </span>
                </p>
            </TranslationUnitCard>
        </Modal>
    );
};

export default TranslationUnitModal;