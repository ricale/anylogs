import React, { useEffect, useState } from 'react';

import styled, { ThemeProvider, normal } from 'themes';
import Database from 'database';

import AppBody from './AppBody';

const SafeAreaViewContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${p => p.theme.colors.colorBackground};
`;

const App = () => {
    const [databaseLoaded, setDatabaseLoaded] = useState(false);
    useEffect(() => {
        setDatabaseLoaded(false);
        Database.init().then(() => setDatabaseLoaded(true));
    }, []);

    return (
        <ThemeProvider theme={normal}>
            {databaseLoaded &&
                <SafeAreaViewContainer>
                    <AppBody />
                </SafeAreaViewContainer>
            }
        </ThemeProvider>
    );
};

export default App;
