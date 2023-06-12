import React, { FC, memo, ReactNode, useMemo } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type DataBoxProps = {
    // eslint-disable-next-line
    data: any;
    // eslint-disable-next-line
    dataMapper: (data: any) => ReactNode;
    noDataMsg?: ReactNode;
    className?: string;
};

const DataBox: FC<DataBoxProps> = ({ data, dataMapper, noDataMsg = 'Нет доступной информации', className }) => {
    const hasData = Array.isArray(data) ? data.length > 0 : !!data;

    const RenderData = useMemo(() => <>{data && dataMapper(data)}</>, [data, dataMapper]);

    const RenderEmpty = (
        <div className={cx(className, styles.container)}>
            <div>{noDataMsg}</div>
        </div>
    );

    return hasData ? RenderData : RenderEmpty;
};

export default memo(DataBox);
