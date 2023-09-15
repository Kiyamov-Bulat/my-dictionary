import React, {FC, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectGameType} from '../../../store/selectors/game';
import GameModel, {EGameType} from '../../../models/game';
import TranslationFromList from './translationFromList';
import Wordfall from './wordfall';
import TextFromList from './textFromList';
import BuildWord from './buildWord';

const GAMES = {
    [EGameType.TRANSLATION_FROM_LIST]: TranslationFromList,
    [EGameType.TEXT_FROM_LIST]: TextFromList,
    [EGameType.WORDFALL]: Wordfall,
    [EGameType.BUILD_WORD]: BuildWord,
};

const Middle: FC = () => {
    const Game = GAMES[useSelector(selectGameType)];
   
    return (<Game/>);
};

export default Middle;