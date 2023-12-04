import React, { ReactNode } from 'react';

type MainProps = {
    children?: ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => <main>{children}</main>;

export default Main;
