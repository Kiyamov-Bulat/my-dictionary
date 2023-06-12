import React from 'react';
import 'src/styles/styles.scss';
import Games from './widgets/game';
import styles from './styles.module.scss';
import Settings from './widgets/settings';
import useDictionarySaver from './hooks/useDictionarySaver';
import SidePanel from './widgets/sidePanel';

const App = () => {
    useDictionarySaver();

    return (
        <div className={styles.appContainer}>
            <div className={styles.widgetContainer}>
                <Games/>
                <SidePanel/>
            </div>
            <Settings/>
        </div>
    );
};

export default App;