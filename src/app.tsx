import React, {useEffect, useRef} from 'react';
import 'src/styles/styles.scss';
import styles from './styles.module.scss';
import Settings from './widgets/settings';
import useDictionaryManager from './hooks/useDictionaryManager';
import SidePanel from './widgets/sidePanel';
import MainPanel from './widgets/mainPanel';
import HotkeyManager from './components/hotkeyManger';
import {useSelector} from 'react-redux';
import {selectGameIsStarted} from './store/selectors/game';
import useNoteManager from './hooks/useNoteManager';
import TranslationUnitModal from './widgets/translationUnitModal';

const App = () => {
    useDictionaryManager();
    useNoteManager();
    const gameIsStarted = useSelector(selectGameIsStarted);
    const $container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if ($container.current && gameIsStarted) {
            $container.current.scrollTo({ top: 0, behavior: 'smooth'});
        }
    }, [gameIsStarted]);

    return (
        <HotkeyManager block={false}>
            <div className={styles.appContainer}>
                <div className={styles.widgetContainer} ref={$container}>
                    <MainPanel/>
                    <SidePanel/>
                </div>
                <Settings/>
                {/*<Help/>*/}
                <TranslationUnitModal/>
            </div>
        </HotkeyManager>
    );
};

export default App;