import React, { Component } from "react";

interface ISize {
    w: number;
    h: number;
}

export interface IWidgetProps {
    x: number;
    y: number;
    sizes: {
        large: ISize;
        medium: ISize;
        small: ISize;
    };
    i: string;
}

interface IState {
    currentLag?: number | null;
    currentTab?: number;
    currentHash?: number;
}

export class Widget extends Component<IWidgetProps, IState> {
    constructor(props: IWidgetProps) {
        super(props);
        this.state = {
            currentLag: null,
            currentTab: window.ClientServer.connection.getTabIdentifier,
            currentHash: window.ClientServer.connection.getConnectionFromCookie(),
        };
    }

    componentDidMount() {
        const eventEmitter = window.ClientServer.connection.getEmitter;

        eventEmitter?.on("lagChanged", () => {
            const lag = window.ClientServer.connection.getLag();
            this.setState({ currentLag: lag });
        });
    }

    render() {
        const { currentLag, currentTab, currentHash } = this.state;

        return (
            <div
                style={{
                    background: `#a8a8a8`,
                    height: "100%",
                }}
            >
                Current tab: {currentTab} Current hash: {currentHash} CurrentLag: {currentLag}
            </div>
        );
    }
}

export default Widget;
