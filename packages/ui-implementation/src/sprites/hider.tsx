import { Character } from 'engine';
import * as React from 'react';

import { Sprite } from './sprite';

export class HiderSprite implements Sprite {
    jsxElement: React.ReactElement;
    avatar: React.RefObject<HTMLImageElement>;
    hitpoints: React.RefObject<HTMLElement>;

    constructor(character: Character) {
        const src = 'https://th.bing.com/th/id/OIP.Tg20QY9WPX17amOdL1LMnAHaHa?pid=ImgDet&rs=1';

        this.avatar = React.createRef();
        this.hitpoints = React.createRef();

        this.jsxElement = <div className='character'>
            <img className="avatar" ref={this.avatar} src={src} />
            <span ref={this.hitpoints}>{character.current.health}</span>
        </div>;
    }
}