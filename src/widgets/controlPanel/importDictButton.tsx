import React, {FC, useState} from 'react';
import ButtonWithTooltip from '../../components/button/ButtonWithTooltip';
import {DownloadIcon} from '../../icons';
import useModalState from '../../hooks/useModalState';
import Modal from '../../components/modal';

const ImportDictButton: FC = () => {
    const { isOpen, open, close } = useModalState(false);

    return (
        <>
            <ButtonWithTooltip Icon={DownloadIcon} action={open} tipContent={'Импортировать словарь'}/>
            <Modal isOpen={isOpen} title={'Импорт словаря'} onClose={close}>

            </Modal>
        </>
    );
};

export default ImportDictButton;