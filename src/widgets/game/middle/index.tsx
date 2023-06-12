import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {selectGameType} from '../../../store/selectors/game';
import {EGameType} from '../../../models/game';
import TranslationFromList from './translationFromList';
import Wordfall from './wordfall';
import TextFromList from './textFromList';

const GAMES = {
    [EGameType.TRANSLATION_FROM_LIST]: TranslationFromList,
    [EGameType.TEXT_FROM_LIST]: TextFromList,
    [EGameType.WORDFALL]: Wordfall,
};

const Middle: FC = () => {
    const Game = GAMES[useSelector(selectGameType)];
   
    return (<Game/>);
};

export default Middle;