import React, {FC} from 'react';
import Modal from '../../components/modal';
import TranslationUnitCard from '../translationUnitCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectOpenedUnit, selectUnitIsOpen} from '../../store/selectors/dictionary';
import {TranslationUnit} from '../../models/types';
import styles from './styles.module.scss';
import {formatTimestamp} from '../../utils/formatDate';
import ChangeImageSrcField from './ChangeImageSrcField';
import {closeTranslationUnit, updateTranslationUnit} from '../../store/slices/dictionary';

const TranslationUnitModal: FC = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectUnitIsOpen);
    const openedUnit = useSelector(selectOpenedUnit);
    const close = () => dispatch(closeTranslationUnit());
    const update = (updateUnit: Partial<TranslationUnit>) =>
        dispatch(updateTranslationUnit({ ...openedUnit, ...updateUnit }));

    return (
        <Modal isOpen={isOpen} onClose={close} className={styles.modalWrapper}>
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
                <ChangeImageSrcField
                    src={openedUnit.imageSrc}
                    onSaveSrc={(src) => {
                        if (!src) {
                            return false;
                        }
                        update({ imageSrc: src });
                        return true;
                    }}/>
            </TranslationUnitCard>
        </Modal>
    );
};

export default TranslationUnitModal;