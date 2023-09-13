import React from 'react';
import 'src/styles/styles.scss';
import styles from './styles.module.scss';
import Settings from './widgets/settings';
import useDictionarySaver from './hooks/useDictionarySaver';
import SidePanel from './widgets/sidePanel';
import MainPanel from './widgets/mainPanel';
import HotkeyManager from './components/hotkeyManger';

const App = () => {
    useDictionarySaver();
    // useDictionaryImagePreloader();

    return (
        <HotkeyManager block={false}>
            <div className={styles.appContainer}>
                <div className={styles.widgetContainer}>
                    <MainPanel/>
                    <SidePanel/>
                </div>
                <Settings/>
                {/*<Help/>*/}
            </div>
        </HotkeyManager>
    );
};

export default App;