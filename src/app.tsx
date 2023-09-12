import React from 'react';
import 'src/styles/styles.scss';
import styles from './styles.module.scss';
import Settings from './widgets/settings';
import useDictionarySaver from './hooks/useDictionarySaver';
import SidePanel from './widgets/sidePanel';
import MainPanel from './widgets/mainPanel';

const App = () => {
    useDictionarySaver();
    // useDictionaryImagePreloader();

    return (
        <div className={styles.appContainer}>
            <div className={styles.widgetContainer}>
                <MainPanel/>
                <SidePanel/>
            </div>
            <Settings/>
            {/*<Help/>*/}
        </div>
    );
};

export default App;