import { Animation } from './animation.interface';

export interface SkillAnimation {
    beforeEffect: Animation;
    runEffect: Animation;
    afterEffect: Animation;
}