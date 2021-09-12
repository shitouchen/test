import React from 'react';
import {Rate} from 'antd';

interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void
}

// export const Pin = (props: PinProps) => {
//     // const {checked, onCheckedChange, ...restProps} = props //可以将此行放在props内部
// }

export const Pin = ({checked, onCheckedChange, ...restProps}: PinProps) => {
    return <Rate 
        count={1}
        value={checked ? 1 : 0}
        onChange={num => onCheckedChange?. (!!num)} // !!num === Boolean(num)
        {...restProps }
    />
}