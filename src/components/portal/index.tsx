import React, {FC, PropsWithChildren} from 'react';
import ReactDOM from 'react-dom';

export type PortalProps = {
    isOn: boolean;
    container?: Element;
    key?: string | null;
};

const Portal: FC<PropsWithChildren<PortalProps>> = ({ isOn, container = document.body, key, children }) => {
    return isOn ? ReactDOM.createPortal(children, container, key) : <>{children}</>;
};

export default Portal;
