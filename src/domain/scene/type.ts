export type sceneOutput = {
    id: string;
    name: string;
    group: {
        name: string;
    };
};

export type sceneGroup = {
    name: string;
};

export type sceneGroups = {
    [key: number]: sceneGroup;
};
