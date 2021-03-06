import { Character } from 'engine';
import * as React from 'react';

import { Sprite } from './sprite';

export class HiderSprite extends React.Component<Sprite> implements Sprite {
    character: Character;

    doneDrawing: Promise<void>;

    avatar: React.RefObject<HTMLElement>;

    hitpoints: React.RefObject<HTMLElement>;

    resolve: () => void;

    constructor(props: Sprite) {
        super(props);

        this.character = props.character;
        this.doneDrawing = props.doneDrawing;
        this.avatar = props.avatar;
        this.hitpoints = props.hitpoints
        this.resolve = props.resolve;
    }

    componentDidMount() {
        this.resolve();
    }

    render() {
        const src = 'https://th.bing.com/th/id/OIP.Tg20QY9WPX17amOdL1LMnAHaHa?pid=ImgDet&rs=1';

        return <div className='character'>
            <img className="avatar" ref={this.avatar as any} src={src} />
            <span ref={this.hitpoints}>{this.character.current.health}</span>
        </div>;
    }
}