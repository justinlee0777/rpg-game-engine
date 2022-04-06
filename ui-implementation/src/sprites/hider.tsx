import * as React from 'react';
import { Sprite } from './sprite';

export class HiderSprite extends Sprite {
    jsxElement: React.ReactElement;
    ref: React.RefObject<any>;

    constructor() {
        super();
        const src = 'https://th.bing.com/th/id/OIP.Tg20QY9WPX17amOdL1LMnAHaHa?pid=ImgDet&rs=1';

        this.ref = React.createRef();

        this.jsxElement = <img ref={this.ref} src={src} />;
    }
}