import React, {FC} from 'react';
import ControlPanel from '../controlPanel';
import Dictionary from '../dictionary';
import styles from './styles.module.scss';
import Adder from './adder';

const SidePanel: FC = () => {

    return (
        <div className={styles.sidePanel}>
            <Adder/>
            <ControlPanel/>
            <Dictionary/>
        </div>
    );
};

export default SidePanel;