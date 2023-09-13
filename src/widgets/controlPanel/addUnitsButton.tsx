import React, {FC, useContext, useEffect, useState} from 'react';
import Modal from '../../components/modal';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {PlusIcon} from '../../icons';
import useModalState from '../../hooks/useModalState';
import TextField from '../../components/textField';
import styles from './styles.module.scss';
import Button from '../../components/button';
import Notice from '../../components/notice';
import TranslationUnitModel from '../../models/translationUnit';
import {useDispatch} from 'react-redux';
import {addUnits} from '../../store/slices/dictionary';
import {HotkeyManagerContext} from '../../components/hotkeyManger';
import useCloseHotkey from '../../hooks/useCloseHotkey';

const ADD_UNITS_MODAL_CONTEXT = 'ADD_UNITS_MODAL_CONTEXT';

const AddUnitsButton: FC = () => {
    const dispatch = useDispatch();
    const { isOpen, open, close } = useModalState(true);
    const [rawUnits, setRawUnits] = useState('');
    const { setBlock } = useContext(HotkeyManagerContext);
    const handleAddUnits = async () => {
        if (!rawUnits) {
            Notice.warn('Пустая строка!');
            return;
        }

        dispatch(addUnits(await TranslationUnitModel.listFromRawString(rawUnits)));
        setRawUnits('');
    };

    useEffect(() => {
        if (isOpen) {
            setBlock({ block: true, excludeContext: ADD_UNITS_MODAL_CONTEXT });
        } else {
            setBlock(false);
        }
        setRawUnits('');
    }, [isOpen]);

    useCloseHotkey(close, isOpen, { context: ADD_UNITS_MODAL_CONTEXT });
    
    return (
        <>
            <ButtonWithTooltip Icon={PlusIcon} action={open} tipContent={'Добавить в группы'}/>
            <Modal className={styles.addUnitsModal} isOpen={isOpen} title={'Добавить слова'} onClose={close}>
                <TextField className={styles.addUnitsModalTextField} placeholder={'Напимер: кот - dog'} value={rawUnits} onChange={setRawUnits} multiline={true} maxLength={1000}/>
                <Button variant={'primary'} onClick={handleAddUnits}>Добавить</Button>
            </Modal>
        </>
    );
};

export default AddUnitsButton;