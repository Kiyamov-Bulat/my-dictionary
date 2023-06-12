import React, {FC} from 'react';
import styles from './styles.module.scss';
import TooltipWrapper, {TooltipWrapperProps} from '../../components/tooltip/TooltipWrapper';

type MemoryChartProps = {
    current: number
    total: number
    lineWidth?: number
    size?: number
    bgColor?: string
} & Pick<TooltipWrapperProps, 'position'>;

const COLORS = {
    zero: 'red',
    inProgress: '#1bde1b',
    memorized: '#006fff',
} as const;

type Color = typeof COLORS[keyof typeof COLORS];

const getColor = (percentage: number): Color => {
    switch (percentage) {
        case 0:
            return COLORS.zero;
        case 100:
            return COLORS.memorized;
        default:
            return COLORS.inProgress;
    }
};

const MemoryChart: FC<MemoryChartProps> = (
    {
        current,
        total,
        size = 20,
        lineWidth = 4,
        bgColor = 'white',
        position,
    }) => {
    const percentage = total === 0 ? 100 : Math.round(current / total * 100);//@TODO
    const color = getColor(percentage);

    return (
        <TooltipWrapper
            position={position}
            tipContent={`Запомнено ${percentage}%`}
            style={
            {
                width: `${size}px`,
                height: `${size}px`,
                background: `
                    radial-gradient(farthest-side, ${color} 98%,#0000) top/${lineWidth}px ${lineWidth}px no-repeat,
                    conic-gradient(${color} ${percentage || 100}%,#0000 0)
                `
            }}
            className={styles.memoryChart}>
            <div
                style={
                    {
                        width: `${size - lineWidth * 2}px`,
                        height: `${size - lineWidth * 2}px`,
                        background: bgColor,
                    }
                }
                className={styles.inner}>
            </div>
            <div
                style={
                    {
                        width: `${lineWidth}px`,
                        height: `${lineWidth}px`,
                        background: color,
                        transform: `rotate(calc(${percentage} * 3.6deg)) translateY(calc(50% - ${size / 2}px))`,
                    }
                }
                className={styles.after}></div>
        </TooltipWrapper>
    );
};

export default MemoryChart;