import { CharacterType, Hider, SpriteHelper, Test } from 'engine';

export class SpriteHelperImpl implements SpriteHelper {
    get(type: CharacterType): HTMLElement {
        switch (type) {
            case Hider:
            case Test:
                const sprite = document.createElement('img');
                sprite.src = 'https://th.bing.com/th/id/OIP.Tg20QY9WPX17amOdL1LMnAHaHa?pid=ImgDet&rs=1';
                return sprite;
        }
    }
}
