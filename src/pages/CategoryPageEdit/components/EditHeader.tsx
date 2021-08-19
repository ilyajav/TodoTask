// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';

type EditHeaderPropsType = {
    todoTitle: string
}

// eslint-disable-next-line no-debugger
debugger;
export const EditHeader: FC<EditHeaderPropsType> = ({todoTitle}) => (
    <div>
        Edit
        {todoTitle}
    </div>
);
